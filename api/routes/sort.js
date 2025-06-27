const express = require('express')
const { z } = require('zod')
const { success, error } = require('../_utils/response')

const router = express.Router()

const sortSchema = z.object({
  data: z.string().min(1, 'Input cannot be empty').max(1000, 'Input too long'),
})

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

router.post('/sort-characters', (req, res) => {
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

module.exports = router
