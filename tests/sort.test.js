/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../api/sort-characters')

describe('POST /api/sort-characters', () => {
  it('✅ should sort characters alphabetically', async () => {
    const res = await request(app).post('/api/sort-characters').send({ data: 'hello' })

    expect(res.statusCode).toBe(200)
    expect(res.body.data.sorted).toBe('ehllo')
    expect(res.body.data.original).toBe('hello')
    expect(res.body.data.length).toBe(5)
    expect(res.body.data.processingTime).toMatch(/ns/)
  })

  it('❌ should reject empty string', async () => {
    const res = await request(app).post('/api/sort-characters').send({ data: '' })
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toMatch(/Input cannot be empty/)
  })

  it('❌ should reject non-string input', async () => {
    const res = await request(app).post('/api/sort-characters').send({ data: 123 })
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toMatch(/Validation failed/)
  })

  it('❌ should reject input longer than 1000 characters', async () => {
    const longInput = 'a'.repeat(1001)
    const res = await request(app).post('/api/sort-characters').send({ data: longInput })
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toMatch(/Input too long/)
  })
})

describe('GET /api/health', () => {
  it('✅ should confirm the API is operational', async () => {
    const res = await request(app).get('/api/health')
    expect(res.statusCode).toBe(200)
    expect(res.body.data.status).toBe('operational')
  })
})

describe('GET /unknown', () => {
  it('❌ should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown-route')
    expect(res.statusCode).toBe(404)
    expect(res.body.error).toBe('Endpoint not found')
  })
})
