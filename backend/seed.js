const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('./models/User.model')

dotenv.config()

const seedUsers = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('✅ Connected')

  await User.deleteMany({})

  const users = [
    { firstName: 'Student', lastName: 'Demo', email: 'student@cc.com', password: 'password123', role: 'student', batch: 'SE-A', department: 'Computer Engineering', enrollmentNumber: 'SE001' },
    { firstName: 'Teacher', lastName: 'Demo', email: 'teacher@cc.com', password: 'password123', role: 'teacher', department: 'Computer Engineering' },
    { firstName: 'HR', lastName: 'Teacher', email: 'hr@cc.com', password: 'password123', role: 'hrteacher', department: 'Computer Engineering' },
    { firstName: 'HOD', lastName: 'Demo', email: 'hod@cc.com', password: 'password123', role: 'hod', department: 'Computer Engineering' },
  ]

  for (const userData of users) {
    const user = new User(userData)
    await user.save()
    console.log(`✅ Created: ${userData.email}`)
  }

  console.log('🎉 All demo users seeded!')
  console.log('📧 Password for all: password123')
  process.exit()
}

seedUsers().catch(err => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})