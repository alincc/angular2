module.exports = function (config) {
  config.set({
    basePath: '..',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher')
    ],
    customLaunchers: {
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    files: [
      { pattern: 'dist/vendor/es6-shim/es6-shim.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/zone.js', included: true, watched: false },
      { pattern: 'dist/vendor/reflect-metadata/Reflect.js', included: true, watched: false },
      { pattern: 'dist/vendor/systemjs/dist/system-polyfills.js', included: true, watched: false },
      { pattern: 'dist/vendor/systemjs/dist/system.src.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/async-test.js', included: true, watched: false },

      { pattern: 'config/karma-test-shim.js', included: true, watched: true },

      // Distribution folder.
      { pattern: 'dist/**/*', included: false, watched: true }
    ],
    exclude: [
      // Vendor packages might include spec files. We don't want to use those.
      'dist/vendor/**/*.spec.js'
    ],
    preprocessors: {},
    reporters: ['progress','junit','dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    junitReporter: {
      outputDir: '', // results will be saved as $outputDir/$browserName.xml 
      outputFile: 'test-results.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile 
      suite: '', // suite will become the package name attribute in xml testsuite element 
      useBrowserName: true, // add browser name to report and classes names 
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element 
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element, 
      properties: {} // key value pair of properties to add to the <properties> section of the report 
    }
  });
};
