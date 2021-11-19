// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")
const db = require("../models")
const User = db.User

exports.createOne = (req, res) => {
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }, 
    function (err, user) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.")
        res.status(200).send(user)
    })
}

exports.findAll = (req, res) => {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.")
        res.status(200).send(users)
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    User.findById({_id: id}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.")
        if (!user) return res.status(404).send("No user found.")
        res.status(200).send(user)
    })
}

exports.updateOne = (req, res) => {
    const id = req.params.id
    User.findByIdAndUpdate({_id: id}, req.body, {runValidators: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.")
        res.status(200).send(user)
    })
}

exports.deleteOne = (req, res) => {
    const id = req.params.id
    User.findByIdAndRemove({_id: id}, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.")
        res.status(200).send("User: "+ user.name +" was deleted.")
    })
}

exports.deleteAll = (req, res) => {
    User.deleteMany({}, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting users.")
        res.status(200).send("All Users deleted.")
    })
}
