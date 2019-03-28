const User = require('../models/User')
const errorParser = require('../utils/errorParser')
exports.regUser = (req,res) => {
  const data = req.body
  const user = new User({
    username: data.username,
    name:{
      fName: data.name.fName,
      mName: data.name.mName,
      lName: data.name.lName
    },
    address: data.address,
    contact: data.contact
  })
  user.setPassword(data.password)
  user.save()
    .then((userRec) => {
      res.json({ username: userRec.username, errors: null })
    })
    .catch((err) => {
      res.json({ username: null, errors: errorParser(err.errors) })
    })
}
