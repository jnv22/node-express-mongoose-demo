var express = require('express')
var app = express()
var chai = require('chai')
var assert = chai.assert;
var wagner = require('wagner-core')
var superagent = require('superagent')
var mongoose = require('mongoose')
var Model = require('./model')

mongoose.connect('mongodb://localhost/jvTest')

describe('server and db tests', function() {
  var server;
  var URL_ROOT = 'http://localhost:3000/api/'

  before(function() {
    app.use('/api/', require('./api')(Model));
    server = app.listen(3000);
  })

  after(function() {
    // Shut the server and db connection down when we're done
    server.close();
    mongoose.connection.close()
  });

  it('server returns valid 200', function(done) {
    superagent
    .get(URL_ROOT)
    .end(function(err, res) {
      assert.ifError(err)
      assert.ok(res)
      assert.equal(res.statusCode, 200)
      done();
    });
  })

  it('POST to db', function(done) {
    var newModel = new Model({name: "Jordan"})
    newModel.save(function(err, res) {
      assert.ifError(err)
      assert.ok(res)
      done()
    })
  })

  it('PUT to db using API', function(done) {
    superagent
    .put(URL_ROOT)
    .send({name: "Mike"})
    .end(function(err, res) {
      assert.ifError(err)
      assert.ok(res)
      done()
    })
  })

  it('GET to db using API', function(done) {
    superagent
    .get(URL_ROOT)
    .end(function(err, res) {
      assert.ifError(err)
      assert.ok(res)
      assert.equal(res.body.results[0].name, "Mike")
      done()
    })
  })

  it('POST to db using API', function(done) {
    superagent
    .post(URL_ROOT)
    .send({name: "Cory"})
    .end(function(err, res) {
      assert.ifError(err)
      assert.ok(res)
      done()
    })
  })

  it('DELETE to db using API', function(done) {
    superagent
    .delete(URL_ROOT)
    .send({name: "Mike"})
    .end(function(error, results) {
      assert.ifError(error)
      assert.ok(results)
      Model.find({}, function(err, res) {
        assert.ifError(err)
        assert.ok(res)
        assert.isAtMost(res.length, 1, "Delete succeeded")
        done()
      })
    })
  })

  it('query db', function(done) {
    Model.find({}, function(err, res) {
      assert.ifError(err)
      assert.ok(res)
      assert.equal(res[0].name, "Cory")
      done()
    })
  })

  it('update db', function(done) {
    Model.update({name: "Andrea"}, function(error) {
      assert.ifError(error)
      Model.find({}, function(err, res) {
        assert.ifError(err)
        assert.ok(res)
        assert.equal(res[0].name, "Andrea")
        done()
      })
    })
  })

  it('delete db entry', function(done) {
    Model.find({}).remove(function(err, res) {
      assert.ifError(err)
      assert.ok(res)
      done()
    })
  })
})
