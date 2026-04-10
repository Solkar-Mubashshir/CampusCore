require('express-async-errors')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/error.middleware')

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/student', require('./routes/student.routes'))
app.use('/api/teacher', require('./routes/teacher.routes'))
app.use('/api/hr', require('./routes/hrteacher.routes'))
app.use('/api/hod', require('./routes/hod.routes'))

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'CampusCore API Running ✅',
    version: '1.0.0',
    team: 'Byteriot'
  })
})

// Error handler (must be last)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🌐 http://localhost:${PORT}`)
})