const getUser = req => {
  return req.user || null
}

const onAuthenticated = req => {
  return req.isAuthenticated()
}

module.exports = { getUser, onAuthenticated }
