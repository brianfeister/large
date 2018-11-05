const AuthController = require('./controllers/Auth')
const AuthMiddleware = require('./middleware/Auth')

module.exports = app => {
  app.post('/register',
    AuthMiddleware.register,
    AuthController.register)

  app.post('/login',
    AuthController.login)
}
