const User = require('../models/User')

exports.authUser = (req,res) => {
  var cred = req.body
  User.findOne({username: cred.username}).then((user) => {
    if(user){
      if(user.isValidPassword(cred.password)){
        res.json({
          success: true,
          status: 'Valid credentials',
          token: user.generateToken()
        })
      } else {
        res.json({success: false, status: 'Wrong password', token: null })
      }
    } else {
      res.json({success: false, status: 'No Username', token: null })
    }
  })
}
