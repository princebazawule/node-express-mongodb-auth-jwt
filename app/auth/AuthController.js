const express = require('express')
const router = express.Router()

const VerifyToken = require('./VerifyToken')

router.use(express.urlencoded({ extended: false }))
router.use(express.json())
const User = require('../user/User')

/**
 * Configure JWT
 */
const jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
const bcrypt = require('bcryptjs')
const secret = process.env.SECRET // get our secret

router.post('/login', function(req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.')
    if (!user) return res.status(404).send('No user found.')
    
    // check if the password is valid
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })

    // if user is found and password is valid
    // create a token
    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: 86400 // expires in 24 hours
    })

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token })
  })

})

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null })
})

router.post('/register', function(req, res) {

  const hashedPassword = bcrypt.hashSync(req.body.password, 8)

  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  }, 
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user`.")

    // if user is registered without errors
    // create a token
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 86400 // expires in 24 hours
    })

    res.status(200).send({ auth: true, token: token })
  })

})

router.get('/me', VerifyToken, function(req, res, next) {

  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.")
    if (!user) return res.status(404).send("No user found.")
    res.status(200).send(user)
  })

})

module.exports = router