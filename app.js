const express = require('express')
const cors = require("cors")
const morgan = require('morgan')
require('dotenv').config()

// create express app
const app = express()

// logging
app.use(morgan("dev"))

// use cors
let corsOptions = {
  origin: "http://localhost:8081",
}
app.use(cors(corsOptions))

// parse requests content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse requests of content-type: application/json
app.use(express.json())

// mongodb connection
const db = require("./app/models")
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!")
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err)
    process.exit()
  })

// routes
require('./app/user/user.routes')(app)

const AuthController = require('./app/auth/AuthController')
app.use('/api/auth', AuthController)

// initial route
app.get('/api', (req, res) => {
  res.status(200).send("welcome to the princeb Express MongoDB + User Auth app")
})


module.exports = app