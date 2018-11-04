const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/register', (req, res) => {
  if (req.body.email && !req.body.email.match('@gmail.com')) {
    res.status(400)
    res.send({
      message: `We only allow gmail users around here, friend. But this is all fake so try again without that janky '${req.body.email}' email.`
    })
  } else {
    res.send({
      message: `user with email '${req.body.email}' registered with password '${req.body.password}'`
    })
  }
})

app.listen(process.env.port || 8081)
