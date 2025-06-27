require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet') // <-- NEW
const rateLimit = require('express-rate-limit')
const { z } = require('zod')
const { success, error } = require('./_utils/response')

const app = express()

// 🔒 Security Headers
app.use(helmet())

// 🌍 CORS Configuration
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    optionsSuccessStatus: 200,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 🚦 Rate Limiting (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

// 🛂 Zod Schema for Validation
const sortSchema = z.object({
  data: z.string().min(1, 'Input cannot be empty').max(1000, 'Input too long'),
})

// 🔤 Sorting Function
const sortString = (str) => {
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

// 🚀 POST Endpoint
app.post('/api/sort-characters', (req, res) => {
  try {
    const parsed = sortSchema.safeParse(req.body)

    if (!parsed.success) {
      const issues = parsed.error.errors.map((e) => e.message).join(', ')
      return error(res, `Validation failed: ${issues}`, 400)
    }

    const { data } = parsed.data

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
    console.error(`[${new Date().toISOString()}] Error:`, err)
    error(res, 'Internal server error', 500)
  }
})

// ✅ Health Check
app.get('/api/health', (req, res) => {
  success(res, { status: 'operational' })
})

// ❌ 404 Handler
app.use((req, res) => {
  error(res, 'Endpoint not found', 404)
})

// 🔥 Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  error(res, 'Unexpected server error', 500)
})

module.exports = app

// 🛠️ Development Server
if (require.main === module) {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`)
    console.log(`🖥️  API endpoint: http://localhost:${PORT}/api/sort-characters`)
  })
}
