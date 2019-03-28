const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password:{
    type: String,
    required: true
  },
  name: {
    fName: String,
    mName: String,
    lName: String
  },
  address: String,
  contact: String
}, { timestamps: true })

schema.methods.isValidPassword = function isValidPassword(password){
  return bcrypt.compareSync(password, this.password)
}

schema.methods.generateToken = function generateToken(){
  var fullName = this.name.fName + ' ' + this.name.mName.charAt(0) + '. ' + this.name.lName
  return jwt.sign({
    name: fullName
  },
  process.env.JWT_SECRET)
}

schema.methods.setPassword = function setPassword(password){
  this.password = bcrypt.hashSync(password, 10)
}

schema.plugin(uniqueValidator, { message: 'Username already taken' })

module.exports = mongoose.model('User', schema)
