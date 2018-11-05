const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-z0-9]{8,32}$')
      )
    }

    const { error, value } = Joi.validate(req.body, schema)
    console.log('value', value)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Not a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Password failed to match the following rules:
              <br>
              1. It must contain ONLY the following characters: lowercase, uppercase, and numbers
              <br>
              2. It must be between 8 and 32 characters in length`
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid request, reason unkown'
          })
      }
    } else {
      next()
    }
  }
}
