const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bluebird = require('bluebird')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')

const app = express()
dotenv.config()

mongoose.Promise = bluebird
mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true, useCreateIndex: true})
mongoose.connection
  .on('connected', () => {
    console.log('Connected to Database %s', process.env.MONGODB_URL)
  })
  .on('error', () => {
    console.log('Error occured')
  })

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin','*')
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const loginCtrl = require('./controllers/login')
const regCtrl = require('./controllers/register')

app
  .get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
  })
  .post('/login', loginCtrl.authUser)
  .post('/register', regCtrl.regUser)

app.listen(process.env.PORT, () => {
  console.log('RPT API running at http://localhost:%d', process.env.PORT)
})


module.exports = app
