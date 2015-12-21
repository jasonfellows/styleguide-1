var babelify = require('babelify');

module.exports = function(config) {
  config.set({

    singleRun: false,
    autoWatch: true,
    basePath: '',

    frameworks: ['mocha','browserify'],

    // list of files / patterns to load in the browser
    files: [
      'src/js/components/**/*.es6',
      'test/**/*.spec.js'
    ],

    // list of files to exclude
    // view component is giving me problems.  excluding for now...
    exclude: [
      'src/js/components/view/**/*.es6'
    ],

    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.spec.js': ['browserify'],
      'src/js/components/**/*.es6': ['browserify']
    },

    browserify: {
      debug: true,
      paths: ['./src/js/components'],
      extensions: ['.js', '.es6'],
      configure: function(bundle) {
        bundle.on('prebundle', function(){
          bundle.transform(babelify)
        })
      }
    },

    // change Karma's debug.html to the mocha web reporter
    client: {
      mocha: {
        reporter: 'html'
      }
    },

    reporters: ['mocha'],

    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-jsdom-launcher',
      'karma-browserify',
      'karma-chrome-launcher'
    ],

    port: 9876,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['jsdom'],

  })
}
