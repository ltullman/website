var ScreenShotReporter = require('protractor-screenshot-reporter');
var path = require('path');

exports.config = {
  specs: [
    './**/*.spec.js'
  ],
  capabilities: {
    browserName: 'firefox'
  },
  directConnect: true,
  baseUrl: 'http://localhost:9000',
  framework: 'jasmine',

  onPrepare: function() {

    // Disable animations so e2e tests run more quickly
    var disableNgAnimate = function() {
      angular.module('disableNgAnimate', []).run(['$animate', function($animate) {
        $animate.enabled(false);
      }]);
    };

    browser.addMockModule('disableNgAnimate', disableNgAnimate);

    // Add a screenshot reporter and take screenshots of failed tests
    jasmine.getEnv().addReporter(new ScreenShotReporter({
      baseDirectory: 'failed_tests/screenshots',
      takeScreenShotsOnlyForFailedSpecs: true
    }));
  }

};
