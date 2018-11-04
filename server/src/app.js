const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/register', (req, res) => {
  console.log('req.body!', req.body)
  res.send({
    message: `user with email '${req.body.email}' registered with password '${req.body.password}'`
  })
})

app.listen(process.env.port || 8081)
