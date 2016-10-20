/* eslint-env mocha */

var request = require('supertest')
var assert = require('assert')
var path = require('path')
var fs = require('fs')

/**
 * Basic sanity checks on the dev server
 */
describe('The prototype kit', function () {
  var app
  var server

  before(function () {
    app = require('../../server')
    server = app.listen(3000)
  })

  after(function () {
    server.close()
  })

  it('should generate assets into the /public folder', function () {
    assert.doesNotThrow(function () {
      fs.accessSync(path.resolve(__dirname, '../../public/javascripts/application.js'))
      fs.accessSync(path.resolve(__dirname, '../../public/images/favicon.ico'))
      fs.accessSync(path.resolve(__dirname, '../../public/stylesheets/application.css'))
    })
  })

  it('should send with a well formed response for the index page', function (done) {
    request(app)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200, done)
  })
})
