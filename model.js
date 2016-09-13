var mongoose = require('mongoose');

var testModel= new mongoose.Schema({
    name: String
})

var Test = mongoose.model('Test', testModel);

module.exports = Test
