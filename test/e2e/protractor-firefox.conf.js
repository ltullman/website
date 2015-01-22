var ScreenShotReporter = require('protractor-screenshot-reporter');
var path = require('path');

exports.config = {
  specs: [
    './**/*.spec.js'
  ],
  params: {
    screenshotsBasePath: 'test/e2e/screenshots'
  },
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

    // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:
    jasmine.getEnv().addReporter(new ScreenShotReporter({
      baseDirectory: 'test/e2e/screenshots',
      pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
        // Return '<browser>/<specname>' as path for screenshots:
        // Example: 'firefox/list-should work'.
        //console.log(spec, descriptions, capabilities);
        return path.join(capabilities.caps_.browserName + '-' + descriptions.join('-'));
      }
    }));
  }

};
