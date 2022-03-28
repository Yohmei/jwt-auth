require('dotenv').config()
const express = require('express')
const passport = require('passport')
const crypto = require('crypto')
const cors = require('cors')

const User = require('./schemas/User')

const PORT = process.env.PORT || 3001
const app = express()

require('./config/db')
require('./schemas/User')
require('./config/passport')(passport)

// This will initialize the passport object on every request
app.use(passport.initialize())

// Client body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Headers setup for local development
app.use(cors())

app.use(require('./routes/api'))

app.listen(PORT, (err) => {
  if (err) console.error(err)
  else console.log(`> App is listening on port ${PORT}`)
})
