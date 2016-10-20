var utils = require('./lib/utils.js')
var app = require('./server.js')
var browserSync = require('browser-sync')
var packageJson = require('./package.json')

// Grab environment variables specified in Procfile or as Heroku config vars
var releaseVersion = packageJson.version
var env = process.env.NODE_ENV || 'development'

console.log('\nGOV.UK Prototype kit v' + releaseVersion)
// Display warning not to use kit for production services.
console.log('\nNOTICE: the kit is for building prototypes, do not use it for production services.')

// start the app
utils.findAvailablePort(app, function (port) {
  console.log('Listening on port ' + port + '   url: http://localhost:' + port)
  if (env === 'production') {
    app.listen(port)
  } else {
    app.listen(port - 50, function () {
      browserSync({
        proxy: 'localhost:' + (port - 50),
        port: port,
        ui: false,
        files: ['public/**/*.*', 'app/views/**/*.*'],
        ghostmode: false,
        open: false,
        notify: false,
        logLevel: 'error'
      })
    })
  }
})
