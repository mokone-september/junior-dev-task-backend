require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const { success, error } = require('./_utils/response')

const app = express()

// Security Middleware
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rate Limiting (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

// Enhanced Sorting Logic
const sortString = (str) => {
  if (!str) return ''
  return str
    .split('')
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        sensitivity: 'base',
        numeric: true,
      })
    )
    .join('')
}

// API Endpoint
app.post('/api/sort-characters', (req, res) => {
  try {
    const { data } = req.body

    if (typeof data !== 'string') {
      return error(res, 'Input must be a string under "data" field', 400)
    }

    if (data.length > 1000) {
      return error(res, 'Input too long (max 1000 characters)', 413)
    }

    const start = process.hrtime.bigint()
    const sorted = sortString(data)
    const end = process.hrtime.bigint()

    success(res, {
      original: data,
      sorted,
      length: data.length,
      processingTime: `${end - start}ns`,
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`[${new Date().toISOString()}] Error:`, err)
    error(res, 'Internal server error', 500)
  }
})

// Health Check
app.get('/api/health', (req, res) => {
  success(res, { status: 'operational' })
})

// 404 Handler
app.use((req, res) => {
  error(res, 'Endpoint not found', 404)
})

// Error Handler
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled error:', err)
  error(res, 'Unexpected server error', 500)
})

module.exports = app

// Local Dev Server
if (require.main === module) {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`)
    // eslint-disable-next-line no-console
    console.log(`API endpoint: http://localhost:${PORT}/api/sort-characters`)
  })
}
