module.exports = function (config) {
  config.set({


    basePath: '../',

    files: [
      'test/e2e/**/*.js'
    ],

    autoWatch: false,

    browsers: ['Chrome'],

    frameworks: ['ng-scenario'],

    singleRun: true,

    urlRoot: '/_karma_/',
    proxies: {
      '/': 'http://localhost:3000/'
    },

    plugins: [
      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ng-scenario'
    ],

    junitReporter: {
      outputFile: 'test_out/e2e.xml',
      suite: 'e2e'
    }

  });
};
