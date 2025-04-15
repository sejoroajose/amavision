require('dotenv').config()
const express = require('express')
const cors = require('cors')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequelize = require('./config/database')
const Job = require('./models/job')
const Journal = require('./models/journal')
const Requirement = require('./models/requirements')
const Admin = require('./models/admin')
const User = require('./models/user')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const compression = require('compression')
const { body, validationResult } = require('express-validator')
const multer = require('multer')
const ScholarshipApplication = require('./models/scholarshipApplication')
const Tribute = require('./models/tribute')
const News = require('./models/news')
const Mailjet = require('node-mailjet')
const fs = require('fs')
const path = require('path')
const notificationapi = require('notificationapi-node-server-sdk').default
const { Op } = require('sequelize')
const cloudinary = require('cloudinary').v2
const { unlink } = require('fs/promises')
const session = require('express-session')

const app = express()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const sessionSecret =
  process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex')
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || '*'
app.use(cors({ origin: allowedOrigins }))

app.use(
  '/api/',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message:
      'Too many requests from this IP, please try again after 15 minutes',
  })
)

app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
)

const storage = multer.memoryStorage()
const upload = multer({ storage })

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
})

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  console.error('Missing JWT_SECRET environment variable.')
  process.exit(1)
}

sequelize
  .sync({ force: false })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => {
    console.error('Database connection error:', err)
    process.exit(1)
  })
 
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (error) {
    console.error('JWT verification failed:', error)
    return res.status(403).json({ error: 'Invalid or expired token' })
  }
}


const validateLogin = [
  body('emailOrUsername').notEmpty().trim(),
  body('password').notEmpty(),
]

const validateScholarshipApplication = [
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('dateOfBirth').isISO8601().toDate(),
  body('occupation').notEmpty().trim(),
  body('localGovernment').notEmpty().trim(),
  body('preferredProgram').notEmpty().trim(),
  body('hasLaptop').notEmpty().trim(),
]

const validateSignup = [
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
]

app.post('/api/signup', validateSignup, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const userData = {
      ...req.body,
      password: hashedPassword,
      birthday: new Date(),
      address: 'Not Provided',
      localGovernment: 'Not Specified',
      role: 'user',
    }

    const user = await User.create(userData)
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET)

    res.json({ message: 'User created successfully', token })
  } catch (error) {
    console.error('Error creating user:', error)
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        errors: error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        })),
      })
    }
    res.status(500).json({ error: 'Failed to create user' })
  }
})

app.post('/api/login', validateLogin, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { emailOrUsername, password } = req.body

    const user = await User.findOne({ where: { email: emailOrUsername } })
    const admin = await Admin.findOne({
      where: { username: emailOrUsername },
    })

    let validUser = user || admin
    if (!validUser) {
      console.log('User not found for:', emailOrUsername)
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    console.log('User found:', validUser)

    const validPassword = await bcrypt.compare(password, validUser.password)
    if (!validPassword) {
      console.log('Invalid password for:', emailOrUsername)
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    const userId = validUser.id
    const tokenPayload = user
      ? { id: userId, email: validUser.email }
      : { id: userId, username: validUser.username }

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' })

    res.json({
      token,
      user: {
        id: userId,
        email: validUser.email || validUser.username,
      },
    })
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.findAll({
      include: [{ model: Requirement, attributes: ['requirement'] }],
    })
    res.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    res.status(500).json({ error: 'Failed to fetch jobs' })
  }
})

app.post('/api/logout', (req, res) => {
  res.setHeader('Cache-Control', 'no-store')
  res.json({ message: 'Logged out successfully' })
})

app.post(
  '/api/scholarship-application',
  validateScholarshipApplication,
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const existingApplication = await ScholarshipApplication.findOne({
        where: { email: req.body.email },
      })

      if (existingApplication) {
        return res.status(409).json({
          error: 'An application with this email already exists',
        })
      }

      const applicationData = {
        ...req.body,
        score: req.body.score || 0,
        quizAnswers: req.body.quizAnswers || [],
      }

      const application = await ScholarshipApplication.create(applicationData)

      await sendEmailToUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        score: applicationData.score,
      })

      res.status(201).json({
        message: 'Application submitted successfully',
        applicationId: application.id,
      })
    } catch (error) {
      console.error('Error submitting application:', error)
      res.status(500).json({ error: 'Failed to submit application' })
    }
  }
)

async function sendEmailToUser(user) {
  try {
    const result = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: '1000ttp@sesi-whingan.com',
            Name: 'Hon. Sesi Whingan: 1000TTP',
          },
          To: [
            {
              Email: user.email,
              Name: `${user.firstName} ${user.lastName}`,
            },
          ],
          Subject: 'Successful Application',
          HTMLPart: getHtmlContent(user),
        },
      ],
    })

    console.log('Email sent:', result.body)
    return result.body
  } catch (error) {
    console.error('Error sending email:', error.statusCode)
    throw error
  }
}

function getHtmlContent(user) {
  let template = fs.readFileSync(path.join(__dirname, './regMail.html'), 'utf8')
  template = template.replace('{{name}}', `${user.firstName} ${user.lastName}`)
  template = template.replace(/{{company}}/g, 'Codeverse Africa')
  return template
}

notificationapi.init(
  'v0l2ftzgbri9gexxf6b7i66ibu',
  's2kvd3kxsrpqx6iidwo0qkehslxjbtdylxjfz4kqnz95gahi0n0v5h07av'
)

async function sendPasswordResetEmail(email, resetLink) {
  try {
    await notificationapi.send({
      notificationId: 'whingan_portal_password_reset',
      user: {
        id: email,
        email: email,
      },
      mergeTags: {
        resetLink,
      },
    })
    console.log('Password reset notification sent successfully')
  } catch (error) {
    console.error('Error sending password reset notification:', error)
    throw error
  }
}

app.post('/api/request-password-reset', async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.json({
        message: 'If an account exists, a password reset email will be sent.',
      })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiration = new Date(Date.now() + 30 * 60 * 1000)

    await user.update({
      passwordResetToken: resetToken,
      passwordResetTokenExpiration: resetTokenExpiration,
    })

    const resetLink = `${process.env.FRONTEND_URL}/career/password-reset?token=${resetToken}`

    await sendPasswordResetEmail(email, resetLink)

    res.json({
      message: 'If an account exists, a password reset email will be sent.',
    })
  } catch (error) {
    console.error('Password reset request error:', error)
    res.status(500).json({ error: 'Failed to process password reset request' })
  }
})

app.post('/api/verify-reset-token', async (req, res) => {
  const { token } = req.body

  if (!token) {
    return res.status(400).json({ error: 'Token is required' })
  }

  try {
    const user = await User.findOne({
      where: {
        passwordResetToken: token,
        passwordResetTokenExpiration: {
          [Op.gt]: new Date(),
        },
      },
    })

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' })
    }

    res.json({ valid: true })
  } catch (error) {
    console.error('Token verification error:', error)
    res.status(500).json({ error: 'Failed to verify token' })
  }
})

app.post('/api/reset-password', async (req, res) => {
  const { token, newPassword } = req.body

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ error: 'Token and new password are required' })
  }

  try {
    const user = await User.findOne({
      where: {
        passwordResetToken: token,
        passwordResetTokenExpiration: {
          [Op.gt]: new Date(),
        },
      },
    })

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await user.update({
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetTokenExpiration: null,
    })

    res.json({ message: 'Password reset successful' })
  } catch (error) {
    console.error('Password reset error:', error)
    res.status(500).json({ error: 'Failed to reset password' })
  }
})


app.get('/api/user', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        'firstName',
        'lastName',
        'email',
        'phone',
        'dateOfBirth',
        'stateOfOrigin',
        'professionalSummary',
        'preferredRole',
        'yearsOfExperience',
        'employmentStatus',
        'currentCompany',
        'currentRole',
        'noticePeriod',
        'expectedSalary',
        'location',
        'willingToRelocate',
        'workPreference',
        'skills',
        'education',
        'certifications',
        'linkedInProfile',
        'avatar',
        'cv',
        'avatarMimeType',
        'cvMimeType',
        'avatar_url',
        'cv_url',
      ],
    })
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({
      ...user.toJSON(),
      hasAvatar: !!user.avatar,
      hasCv: !!user.cv,
    })
  } catch (error) {
    console.error('Error fetching user details:', error)
    res.status(500).json({ error: 'Failed to fetch user details' })
  }
})

app.post('/api/profile', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      stateOfOrigin,
      professionalSummary,
      preferredRole,
      yearsOfExperience,
      employmentStatus,
      expectedSalary,
      location,
      willingToRelocate,
      workPreference,
      skills,
      education,
      certifications,
      linkedInProfile,
    } = req.body

    await updateUserProfile(
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      stateOfOrigin,
      professionalSummary,
      preferredRole,
      yearsOfExperience,
      employmentStatus,
      expectedSalary,
      location,
      willingToRelocate,
      workPreference,
      skills,
      education,
      certifications,
      linkedInProfile
    )

    res.status(200).json({ message: 'Profile updated successfully' })
  } catch (error) {
    console.error('Error updating user profile:', error)
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

async function updateUserProfile(
  firstName,
  lastName,
  email,
  phone,
  dateOfBirth,
  stateOfOrigin,
  professionalSummary,
  preferredRole,
  yearsOfExperience,
  employmentStatus,
  expectedSalary,
  location,
  willingToRelocate,
  workPreference,
  skills,
  education,
  certifications,
  linkedInProfile
) {
  const user = await User.findOne({ where: { email } })

  if (user) {
    await user.update({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      stateOfOrigin,
      professionalSummary,
      preferredRole,
      yearsOfExperience,
      employmentStatus,
      expectedSalary,
      location,
      willingToRelocate,
      workPreference,
      skills,
      education,
      certifications,
      linkedInProfile,
    })
  } else {
    await User.create({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      stateOfOrigin,
      professionalSummary,
      preferredRole,
      yearsOfExperience,
      employmentStatus,
      expectedSalary,
      location,
      willingToRelocate,
      workPreference,
      skills,
      education,
      certifications,
      linkedInProfile,
    })
  }
}

app.post('/update-file-url', authenticateJWT, async (req, res) => {
  const { type, url } = req.body
  const userId = req.user.id

  if (!['avatar', 'cv'].includes(type) || !url) {
    return res.status(400).json({ error: 'Invalid type or URL' })
  }

  try {
    const column = type === 'avatar' ? 'avatar_url' : 'cv_url'
    const updateQuery = `UPDATE users SET ${column} = $1 WHERE id = $2 RETURNING ${column}`
    const dbResult = await pool.query(updateQuery, [url, userId])

    res.json({ url: dbResult.rows[0][column] })
  } catch (error) {
    console.error('Error updating URL:', error)
    res.status(500).json({ error: 'Failed to update file URL' })
  }
})

app.put('/api/user', authenticateJWT, async (req, res) => {
  const { avatar_url, cv_url } = req.body
  const userId = req.user.id

  try {
    const user = await User.findByPk(userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const updateData = {}
    if (avatar_url !== undefined) updateData.avatar_url = avatar_url
    if (cv_url !== undefined) updateData.cv_url = cv_url

    await user.update(updateData)

    const updatedUser = await User.findByPk(userId)

    res.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ error: 'Failed to update user' })
  }
})

app.get('/api/user/cv', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findByPk(userId)

    if (!user || !user.cv_url) {
      return res.status(404).json({ error: 'CV not found' })
    }

    const filename = user.cv_url.split('/').pop()

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)

    res.redirect(user.cv_url)
  } catch (error) {
    console.error('Error downloading CV:', error)
    res.status(500).json({ error: 'Failed to download CV' })
  }
})

app.get('/api/tributes', async (req, res) => {
  try {
    const tributes = await Tribute.findAll({
      order: [
        ['isPinned', 'DESC'],
        ['createdAt', 'DESC'],
      ],
    })
    res.json(tributes)
  } catch (error) {
    console.error('Error fetching tributes:', error)
    res.status(500).json({ error: 'Failed to fetch tributes' })
  }
})

app.post('/api/tributes', async (req, res) => {
  try {
    const { content, firstName, lastName } = req.body 
    if (!content || !firstName || !lastName) {
      return res
        .status(400)
        .json({ error: 'Content, first name, and last name are required.' })
    }

    const tribute = await Tribute.create({
      content,
      author: `${firstName} ${lastName}`, 
    })

    res.json(tribute)
  } catch (error) {
    console.error('Error creating tribute:', error)
    res.status(500).json({ error: 'Failed to create tribute' })
  }
})

app.patch('/api/tributes/:id/pin',  async (req, res) => {
  try {
    const tribute = await Tribute.findByPk(req.params.id)
    if (!tribute) {
      return res.status(404).json({ error: 'Tribute not found' })
    }

    tribute.isPinned = !tribute.isPinned
    await tribute.save()

    res.json(tribute)
  } catch (error) {
    console.error('Error updating tribute:', error)
    res.status(500).json({ error: 'Failed to update tribute' })
  }
})

app.post('/api/tributes/:id/like', async (req, res) => {
  try {
    const tribute = await Tribute.findByPk(req.params.id)
    if (!tribute) {
      return res.status(404).json({ error: 'Tribute not found' })
    }

    if (!req.session.likedTributes) {
      req.session.likedTributes = []
    }

    if (req.session.likedTributes.includes(req.params.id)) {
      return res
        .status(400)
        .json({ error: 'You have already liked this tribute' })
    }

    await tribute.increment('likes', { by: 1 })

    req.session.likedTributes.push(req.params.id)

    res.json(tribute)
  } catch (error) {
    console.error('Error liking tribute:', error)
    res.status(500).json({ error: 'Failed to like tribute' })
  }
})



app.post('/api/admin/tributes',  async (req, res) => {
  try {
    const tribute = await Tribute.create(req.body)
    res.json(tribute)
  } catch (error) {
    console.error('Error creating tribute:', error)
    res.status(500).json({ error: 'Failed to create tribute' })
  }
})

app.put(
  '/api/admin/tributes/:id',
  
  async (req, res) => {
    try {
      const tribute = await Tribute.findByPk(req.params.id)
      if (!tribute) {
        return res.status(404).json({ error: 'Tribute not found' })
      }

      await tribute.update(req.body)
      res.json(tribute)
    } catch (error) {
      console.error('Error updating tribute:', error)
      res.status(500).json({ error: 'Failed to update tribute' })
    }
  }
)

app.delete(
  '/api/admin/tributes/:id',
  
  async (req, res) => {
    try {
      const tribute = await Tribute.findByPk(req.params.id)
      if (!tribute) {
        return res.status(404).json({ error: 'Tribute not found' })
      }

      await tribute.destroy()
      res.json({ message: 'Tribute deleted successfully' })
    } catch (error) {
      console.error('Error deleting tribute:', error)
      res.status(500).json({ error: 'Failed to delete tribute' })
    }
  }
)

app.patch(
  '/api/admin/tributes/:id/pin',

  async (req, res) => {
    try {
      const tribute = await Tribute.findByPk(req.params.id)
      if (!tribute) {
        return res.status(404).json({ error: 'Tribute not found' })
      }

      tribute.isPinned = !tribute.isPinned
      await tribute.save()

      res.json(tribute)
    } catch (error) {
      console.error('Error updating tribute:', error)
      res.status(500).json({ error: 'Failed to update tribute' })
    }
  }
)

const validateNews = [
  body('title').notEmpty().trim(),
  body('content').notEmpty(),
  body('fullContent').notEmpty(),
  body('tags').isArray(),
  body('image').optional().isString(),
]

app.get('/api/news', async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, search } = req.query
    const offset = (page - 1) * limit

    const where = {}
    if (tag) {
      where.tags = { [Op.contains]: [tag] }
    }
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
      ]
    }

    const news = await News.findAndCountAll({
      where,
      order: [
        ['isPinned', 'DESC'],
        ['date', 'DESC'],
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    })

    res.json({
      news: news.rows,
      total: news.count,
      totalPages: Math.ceil(news.count / limit),
      currentPage: parseInt(page),
    })
  } catch (error) {
    console.error('Error fetching news:', error)
    res.status(500).json({ error: 'Failed to fetch news' })
  }
})

app.get('/api/news/:slug', async (req, res) => {
  try {
    const news = await News.findOne({
      where: { slug: req.params.slug },
    })

    if (!news) {
      return res.status(404).json({ error: 'News not found' })
    }

    res.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    res.status(500).json({ error: 'Failed to fetch news' })
  }
})

app.post('/api/news', authenticateJWT, validateNews, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const news = await News.create(req.body)
    res.status(201).json(news)
  } catch (error) {
    console.error('Error creating news:', error)
    res.status(500).json({ error: 'Failed to create news' })
  }
})

app.put('/api/news/:slug', authenticateJWT, validateNews, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const news = await News.findOne({
      where: { slug: req.params.slug },
    })

    if (!news) {
      return res.status(404).json({ error: 'News not found' })
    }

    await news.update(req.body)
    res.json(news)
  } catch (error) {
    console.error('Error updating news:', error)
    res.status(500).json({ error: 'Failed to update news' })
  }
})

app.delete('/api/news/:slug', authenticateJWT, async (req, res) => {
  try {
    const news = await News.findOne({
      where: { slug: req.params.slug },
    })

    if (!news) {
      return res.status(404).json({ error: 'News not found' })
    }

    await news.destroy()
    res.json({ message: 'News deleted successfully' })
  } catch (error) {
    console.error('Error deleting news:', error)
    res.status(500).json({ error: 'Failed to delete news' })
  }
})

// Journal Routes
const validateJournal = [
  body('title').notEmpty().trim(),
  body('description').notEmpty(),
  body('date').isDate(),
  body('media').optional().isArray(),
]

// Get all journals
app.get('/api/journals', async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate } = req.query
    const offset = (page - 1) * limit

    const where = {}
    if (startDate && endDate) {
      where.date = {
        [Op.between]: [startDate, endDate]
      }
    }

    const journals = await Journal.findAndCountAll({
      where,
      order: [['date', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    })

    res.json({
      journals: journals.rows,
      total: journals.count,
      totalPages: Math.ceil(journals.count / limit),
      currentPage: parseInt(page),
    })
  } catch (error) {
    console.error('Error fetching journals:', error)
    res.status(500).json({ error: 'Failed to fetch journals' })
  }
})

// Get single journal by ID
app.get('/api/journals/:id', async (req, res) => {
  try {
    const journal = await Journal.findByPk(req.params.id)

    if (!journal) {
      return res.status(404).json({ error: 'Journal not found' })
    }

    res.json(journal)
  } catch (error) {
    console.error('Error fetching journal:', error)
    res.status(500).json({ error: 'Failed to fetch journal' })
  }
})

// Create journal (protected route)
app.post('/api/journals', authenticateJWT, validateJournal, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const journal = await Journal.create(req.body)
    res.status(201).json(journal)
  } catch (error) {
    console.error('Error creating journal:', error)
    res.status(500).json({ error: 'Failed to create journal' })
  }
})

// Update journal (protected route)
app.put('/api/journals/:id', authenticateJWT, validateJournal, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const journal = await Journal.findByPk(req.params.id)

    if (!journal) {
      return res.status(404).json({ error: 'Journal not found' })
    }

    await journal.update(req.body)
    res.json(journal)
  } catch (error) {
    console.error('Error updating journal:', error)
    res.status(500).json({ error: 'Failed to update journal' })
  }
})

// Delete journal (protected route)
app.delete('/api/journals/:id', authenticateJWT, async (req, res) => {
  try {
    const journal = await Journal.findByPk(req.params.id)

    if (!journal) {
      return res.status(404).json({ error: 'Journal not found' })
    }

    await journal.destroy()
    res.json({ message: 'Journal deleted successfully' })
  } catch (error) {
    console.error('Error deleting journal:', error)
    res.status(500).json({ error: 'Failed to delete journal' })
  }
})




app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

module.exports = app