const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const router = express.Router()

router.post('/register', async (req, res) => {
  const { email, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await User.create({
      email,
      password: hashedPassword,
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ message: 'Error registering user' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })
  if (!user) return res.status(404).json({ message: 'User not found' })

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid)
    return res.status(401).json({ message: 'Invalid password' })

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
  res.json({ token })
})

module.exports = router
