require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const app = express()

// Middlewares
app.use(helmet())
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    optionsSuccessStatus: 200,
    preflightContinue: false,
    maxAge: 86400,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})
app.use(limiter)

// ✅ Routes
const sortRoutes = require('./routes/sort')
app.use('/api', sortRoutes)

// Health Check
const { success, error } = require('./_utils/response')
app.get('/api/health', (req, res) => success(res, { status: 'operational' }))

// 404 and Error Handlers
app.use((req, res) => error(res, 'Endpoint not found', 404))
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  error(res, 'Unexpected server error', 500)
})

module.exports = app

// Dev server
if (require.main === module) {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`)
    console.log(`📮 POST http://localhost:${PORT}/api/sort-characters`)
  })
}
