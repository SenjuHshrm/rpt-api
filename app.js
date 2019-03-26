const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bluebird = require('bluebird')
const app = express()
dotenv.config()

mongoose.Promise = bluebird
mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true})
mongoose.connection
  .on('connected', () => {
    console.log('Connected to Database')
  })
  .on('error', () => {
    console.log('Error occured')
  })

app.listen(process.env.PORT, () => {
  console.log('App running')
})
