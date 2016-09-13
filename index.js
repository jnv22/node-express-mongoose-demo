var express = require('express')
var app = express()
var Model = require('./model')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/jvTest')

app.use('/api/', require('./api')(Model))

app.listen(3000, function() {
  console.log('listening on port 3000')
})
