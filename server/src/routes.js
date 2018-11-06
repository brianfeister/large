const AuthController = require('./controllers/Auth')
const AuthMiddleware = require('./middleware/Auth')
const PostsController = require('./controllers/Post')

module.exports = app => {
  app.post('/register',
    AuthMiddleware.register,
    AuthController.register)

  app.post('/login',
    AuthController.login)

  app.get('/posts',
    PostsController.getAll)

  app.get('/posts/:uuid',
    PostsController.getOne)

  app.patch('/posts/:uuid',
    PostsController.update)

  app.post('/posts',
    PostsController.create)

  app.delete('/posts/:uuid',
    PostsController.delete)
}
