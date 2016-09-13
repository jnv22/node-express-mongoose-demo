var express = require('express')
var bodyparser = require('body-parser');

module.exports = function(model) {
  var router = express.Router()
  router.use(bodyparser.json());

  router.get('/', function(req, res) {
    //only show name field, while ignori ng id
    model.find({}, 'name -_id', function(err, mod) {
      res.json({results: mod})
    })
  })

  router.post('/', function(req, res) {
    var newModel = new model(req.body)
    newModel.save(function(err, mod) {
      if(err) res.json({status: false, message: "something went wrong"})
      else res.json({status: true, message: "saved!"})
    })
  })

  router.put('/', function(req, res) {
    var newModel = new model(req.body)
    model.update(req.body, function(err, mod) {
      if(err) res.json({status: false, message: "something went wrong"})
      else res.json({status: true, message: "updated!"})
    })
  })

  router.delete('/', function(req, res) {
    model.find(req.body).remove(function(err) {
      if(err) res.json({status: false, message: "something went wrong"})
      else res.json({status: true, message: "deleted!"})
    })
  })

  return router
}
