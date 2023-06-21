const { onAuthenticated, getUser } = require('../helpers/auth-helpers')

const authenticated = (req, res, next) => {
  if (onAuthenticated(req)) {
    return next()
  }
  res.redirect('/signin')
}

const authenticatedUser = (req, res, next) => {
  if (onAuthenticated(req)) {
    if (getUser(req)) return next()
    res.redirect('/')
  } else {
    res.redirect('/signin')
  }
}

module.exports = {
  authenticated,
  authenticatedUser
}
