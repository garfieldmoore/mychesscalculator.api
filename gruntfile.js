module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.registerTask('default', ['jshint']);
  grunt.initConfig({

    jasmine: {
      src: 'js/**/*.js',
      vendor: ['js/angular.min.js'],
      options: {
        specs: 'tests/**/*.js',
        vendor: ['js/angular.min.js'],
        // template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfig: {
            baseUrl: '/assets',
            paths: {
              // 'jquery': 'libs/jquery/dist/jquery'
            }
          }
        },
      },
    },

    jshint: {
      all: ['tests/**/*Specs.js','js/Controllers/*.js', 'js/*.js', 'js/services/*.js', '!js/bootstrap*.js', '!js/npm.js', '!js/angular**.js'],
      options: {
        "validthis": true,
        esversion: 6,
        browser: true,
        jasmine: true,
        node: true,
        globals: {
          jQuery: true,
          $: true,
          app: true,
          angular: true,
          console: true,
          normalDistributionDifferenceLookup: true,
          normalDistributionExpectedResultValues: true,
        },
      },
    },

    watch: {
      //   specs:{
      //     files: ['tests/**.js','js/**/*.js', 'acceptanceTests/**.js', 'js/**.js', 'js/**/**.js'],
      //     tasks: ['jasmine'],
      //     options: {
      //       reload: true,
      //       livereload: true,
      //     },
      // },
      js:{
        files: ['/js/**.js', 'js/**/**.js'],
        tasks: ['jshint']
      }

    }
  });
};
