const success = (res, data, status = 200) => {
  res.status(status).json({
    success: true,
    timestamp: new Date().toISOString(),
    data
  })
}

const error = (res, message, status = 400) => {
  res.status(status).json({
    success: false,
    timestamp: new Date().toISOString(),
    error: message
  })
}

module.exports = { success, error }
