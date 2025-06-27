/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../api')

describe('Character Sorting API', () => {
  it('should sort characters alphabetically', async () => {
    const res = await request(app)
      .post('/api/sort-characters')
      .send({ text: 'hello' })

    expect(res.statusCode).toEqual(200)
    expect(res.body.data.sorted).toBe('ehllo')
    expect(res.body.data.original).toBe('hello')
    expect(typeof res.body.data.length).toBe('number')
    expect(res.body.data.length).toBe(5)
  })

  it('should handle empty string', async () => {
    const res = await request(app)
      .post('/api/sort-characters')
      .send({ text: '' })

    expect(res.statusCode).toEqual(200)
    expect(res.body.data.sorted).toBe('')
    expect(res.body.data.original).toBe('')
    expect(res.body.data.length).toBe(0)
  })

  it('should reject non-string input', async () => {
    const res = await request(app)
      .post('/api/sort-characters')
      .send({ text: 123 })

    expect(res.statusCode).toEqual(400)
    expect(res.body.error).toBe('Input must be a string under "text" field')
  })

  it('should reject too long input', async () => {
    const longText = 'a'.repeat(1001)
    const res = await request(app)
      .post('/api/sort-characters')
      .send({ text: longText })

    expect(res.statusCode).toEqual(413)
    expect(res.body.error).toBe('Input too long (max 1000 characters)')
  })
})
