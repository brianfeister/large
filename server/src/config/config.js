module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'large',
    user: process.env.DB_USER || 'large',
    password: process.env.DB_PASS || 'large',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './large.sqlite',
    }
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
  }
}
