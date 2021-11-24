module.exports = (mongoose, mongoosePaginate) => {
  const UserSchema = mongoose.Schema(
    {
      name: String,
      email: String,
      password: String,
    },
    { timestamps: true }
  )

  UserSchema.plugin(mongoosePaginate)

  const User = mongoose.model('user', UserSchema)

  return User
}




// var mongoose = require('mongoose')  
// var UserSchema = new mongoose.Schema({  
//   name: String,
//   email: String,
//   password: String
// })
// mongoose.model('User', UserSchema)

// module.exports = mongoose.model('User')
