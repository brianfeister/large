const jwt = require('jsonwebtoken')
const { User } = require('../models')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.auth.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    if (req.body.email && !req.body.email.match('@gmail.com')) {
      res.status(400).send({
        message: `We only allow gmail users around here, friend. But this is all fake so try again without that janky '${req.body.email}' email.`
      })
    } else {
      try {
        const user = await User.create(req.body)
        const userJson = user.toJSON()
        res.send({
          user: userJson,
          token: jwtSignUser(userJson)
        })
      } catch (e) {
        console.log('e!', e)
        res.status(400).send({
          error: 'This email account is already in use.'
        })
      }
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (!user) throw new Error(`Can't find that user.`)

      const isPasswordValid = await user.comparePassword(password)
      console.log('isPasswordValid', isPasswordValid)
      console.log('user', user)
      if (!isPasswordValid) throw new Error(`Invalid password.`)

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (e) {
      res.status(400).send({
        error: `${e.message || 'Unknown login error'}`
      })
    }
  }
}
