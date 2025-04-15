const sequelize = require('./config/database')
const bcrypt = require('bcrypt')
const Admin = require('./models/admin')
const fs = require('fs')

async function seedDatabase() {
  await sequelize.sync()

  const existingAdmin = await Admin.findOne({
    where: { username: 'SesiAdmin' },
  })

  if (!existingAdmin) {
    const admin = await Admin.create({
      username: 'SesiAdmin',
      password: await bcrypt.hash('!!Sesi-Whingan/2030', 10),
    })
    console.log('Database Admin created successfully')
  } else {
    console.log('Admin user already exists, skipping creation')
  }
}

seedDatabase().catch(console.error)
