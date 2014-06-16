/**
 * Grunt Task Configuratiion
 * @Commands:
 * grunt          - Start the watcher
 * grunt sass     - Compiles Sass to CSS
 * grunt js       - Concats js libs into a single file
 * grunt uncss    - Remove unused CSS while in development
 * grunt dev      - Builds files for development purposes
 * grunt build    - Builds files and makes them production ready
 * grunt deploy   - Runs build and deploys to a remote server
 *
 * @Todo:
 * 1. Convert to coffescript at some point
 *
 * Possible packages to add...
 * grunt-responsive-images - For generating multi-resolution images at predefined widths. For use with srcset or a responsive imaging strategy like Imager.js
 * grunt-autoshot - For generating screenshots of your site at different viewport sizes
 * grunt-html-snapshot - A grunt task that fetches html snapshots of your web app for easier SEO
 * grunt-modernizr - For generating lean Modernizr builds based on the feature detects you actually use
 * grunt-svgmin - For minmizing your SVG files
 * grunt-contrib-imagemin - For keeping your image files optimized. With the size of the average page being 1.5MB, most of it being images, keeping your image filesizes down is super-important.
 * grunt-open - For launching a browser window with BrowserStack using specific device/browser settings. We found this to be more usable than grunt-browserstack in practice.
 * grunt-concurrent - For concurrently running tasks to shorten down build times
 * grunt-notify  - For desktop notifications when Grunt has errors
 * grunt-wiredep - For managing 3rd party libraries installed by Bower
 * grint-htmlmin - Can be used to only remove comments when packaging final build
 * grunt-useminPrepare - Auto configures some Gruntfile settings and outputs includes to head. Example: https://github.com/wangshijun/grunt-build-crash-course/blob/master/Gruntfile.js
 */


 /**
 * For remote deployment, you can add a server config to use with grunt-ssh and grunt-shell
 * You add this in package.json but storing here since you cannot comment in json files
 * Example for a Drupal site...
 * "archive": "my_theme.tgz",
 * "buildPath": "../../../../../build",
 * "exclude": "--exclude=js/.normal.js",
 * "remote": {
 *   "host": "example.com",
 *   "username": "user",
 *   "password": "password",
 *   "basePath": "/path/to/website",
 *   "path": "web/sites/my_site/themes/my_theme",
 * }
 */

module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Project Settings
     */

    settings: {
      // Set common directories to variables for easy upating
      dir: {
        'base': './',
        'src': './src',
        'dist': './assets',
        'tmp': './tmp'
      }
    },


    /**
     * JSHint
     * Error check javascript
     */

    jshint: {
      dev: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true
          }
        },
        files: {
          src: ['assets/js/**/*.js']
        }
      },
      dist: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true
          }
        },
        files: {
          src: ['assets/js/**/*.js']
        }
      }
    },


    /**
     * ----------------------------------------------
     * Uglify
     * Minify and concatenate js files
     * ----------------------------------------------
     */

    uglify: {
      dev: {
        options : {
          mangle : false,
          compress : false,
          beautify : true
        },
        src: ['<%= settings.dir.src %>/js/vendor/custom.modernizr.js','<%= settings.dir.src %>/js/vendor/jquery-2.1.1.min.js', '<%= settings.dir.src %>/js/vendor/packery.pkgd.min.js', '<%= settings.dir.src %>/js/base.js'],
        dest: '<%= settings.dir.dist %>/js/base.min.js'
      },
      dist: {
        options : {
          mangle : true,
          compress : true
        },
        src: ['<%= settings.dir.src %>/js/vendor/custom.modernizr.js','<%= settings.dir.src %>/js/vendor/jquery-2.1.1.min.js', '<%= settings.dir.src %>/js/vendor/packery.pkgd.min.js', '<%= settings.dir.src %>/js/base.js'],
        dest: '<%= settings.dir.dist %>/js/base.min.js'
      }
    },


    /**
     * ----------------------------------------------
     * Sass
     * Compile Sass files to CSS
     * The dist seting will compile Sass to Css into the tmp/ directory. Other plugins
     * will then take the css and further optimize it into the css/ directory
     * ----------------------------------------------
     */

    sass: {
      dev: {
        options: {
          // cssmin will minify later
          style: 'nested',
          cacheLocation: '<%= settings.dir.src %>/scss/.sass-cache'
        },
        files: {
          '<%= settings.dir.tmp %>/css/styles.css': '<%= settings.dir.src %>/scss/styles.scss'
        }
      },
      dist: {
        options: {
          // cssmin will minify later
          style: 'nested',
          cacheLocation: '<%= settings.dir.src %>/scss/.sass-cache'
        },
        files: {
          '<%= settings.dir.tmp %>/css/styles.css': '<%= settings.dir.src %>/scss/styles.scss'
        }
      }
    },


    /**
     * ----------------------------------------------
     * Autoprefix CSS
     * ----------------------------------------------
     */

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
      },
      // if you have specified only the `src` param, the destination will be set automatically,
      // so source files will be overwritten
      // The Sass pplugin will compile to tmp/ so look there.
      no_dest: {
        expand: true,
        flatten: true,
        src: '<%= settings.dir.tmp %>/css/styles.css' // globbing is also possible here
      }
    },


    /**
     * ----------------------------------------------
     * Minify CSS
     * Looks for css that has been compiled into tmp/ and minifies it into the assets/css/
     * @Options: minify, combine, add_banner, keepSpecialComments
     * ----------------------------------------------
     */

    cssmin: {
      minify: {
        expand: true,
        files: [{
          src: ['<%= settings.dir.tmp %>/css/*.css', '!*.min.css'],
          dest: '<%= settings.dir.dist %>/css/styles.min.css'
        }]
      }
    },


    /**
     * Bless CSS
     * As a last step, break the final css file into two if it's too big for IE.
     * The second file is included in the first so no need to muck with the header include
     */

/*
    files: [{
      src: ['*.css', '!*.min.css'], dest: 'resources/front/css/'
    }]
*/


    bless: {
      css: {
        options: {
          cacheBuster: false,
          compress: true
        },
        files: {
          '<%= settings.dir.dist %>/css/styles-blessed.min.css': '<%= settings.dir.dist %>/css/styles.min.css'
        }
      }
    },


    /**
     * ----------------------------------------------
     * Process HTML
     * Replaces JS and CSS file references with the concat and minified versions post Grunt job
     * @NOTE: Another option is grunt-asset-injector
     * ----------------------------------------------
     */

    processhtml: {
      options: {
        data: {
          message: 'Linted, minified, combined and moved by Grunt!'
        }
      },
      js: {
        files: {
          '_includes/header.html': ['_includes/header.html']
        }
      },
      css: {
        files: {
          '_includes/header.html': ['_includes/header.html']
        }
      }
    },


    /**
     * ----------------------------------------------
     * Clean
     * Clean up temp folders used during build process
     * ----------------------------------------------
     */

    clean: {
      after: [
        '<%= settings.dir.tmp %>/'
      ]
    },


    /**
     * ----------------------------------------------
     * Jekyll
     * Configures Jekyll settings and runs the server
     * ----------------------------------------------
     */

    jekyll: {
        dev: {
          options : {
          src: '.',
          dest: './_site',
          watch: false, //watch is performed by grunt-contrib-watch
          serve : true,
          host: 'localhost',
          port : 4000,
          auto : true,
          doctor: false
        }
      }
    },

    /**
     * UNCSS
     * ----------------------------------------------
     * Create a file that contains only CSS that is used on the page(s) spcified.
     * @NOTE: The generated file can then be used for above-the-fold inline css
     * @TODO: Look into using a sitemap as the source so we can create a version for the entire site
     * @TODO: Modify src to look at all .html fiiles in the compiles site folder
     * ----------------------------------------------
     */


    // Need to run this after Jekyll has compiled all html files
    uncss: {
      dist: {
        options: {
          compress: true
        },
        files: [{
          src: '<%= settings.dir.base %>/index.html',
          dest: '<%= settings.dir.dist %>/css/styles-cleaned.min.css'
        }]
      }
    },


    /**
     * ----------------------------------------------
     * Watch
     * Watch for changes and run various jobs upon changes
     * ----------------------------------------------
     */
    watch: {
      options: {
        livereload: true,
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        }
      },
      js: {
        //files: ['<%= uglify:dev.files %>'],
        files: ['<%= settings.dir.src %>/js/**/*.js'],
        tasks: ['uglify:dev', 'processhtml:js']
      },
      sass: {
        //files: ['<%= sass:dev.files %>'],
        files: ['<%= settings.dir.src %>/scss/**/*.scss', '<%= settings.dir.src %>/scss/!.sass-cache/**'],
        tasks: ['sass:dev', 'autoprefixer', 'cssmin:minify', 'bless', 'clean', 'processhtml:css']
      },
      jekyll: {
        //files: ['<%= jekyll:dev.files %>'],
				files: ['**/*.*', '!_site/**.*','!<%= settings.dir.src %>/**', '!node_modules/**', '!.sass-cache/**', '!Gruntfile.js', '!package.json', '!.git/**'],
				tasks: ['jekyll:dev']
			}
    },

    /*
    connect: {
      options: {
        hostname: 'localhost',
        port: 4000,
        livereload: true,
        base: './_site',
        open: { appName: 'chrome' }
      }
    }
    */

    /**
     * ----------------------------------------------
     * Concurrent
     * Runs tasks on multiple CPU processes concurrently.
     * While not in doxumented examples, this is needed to run both grunt-watch and grunt-jekyll server together
     * ----------------------------------------------
     */
    concurrent: {
        target1: ['watch:js', 'watch:sass'],
        target2: ['watch:jekyll'] //Maybe just run the jekyll server from the jekyll task
    }

  });

  /*
  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
  */

  /**
   * ----------------------------------------------
   * Load tasks here
   * ----------------------------------------------
   */
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-bless');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-uncss');


  /**
  * ----------------------------------------------
  * Jobs
  * @NOTE: You cannot have alias names that match job names. It causes a recursive error. So
  * grunt.registerTask('uncss', ['uncss']); needs to be grunt.registerTask('remcss', ['uncss']);
  * ----------------------------------------------
  */
  // grunt - Enables the watcher
  grunt.registerTask('default', ['concurrent:target1', 'concurrent:target2']);

  // grunt dev - Runs tasks for development
  grunt.registerTask('dev', ['sass:dev', 'autoprefixer', 'cssmin:minify', 'uglify:dev', 'clean', 'watch']);

  // grunt build - Runs full suite of tasks to ready files for production
  grunt.registerTask('build', ['sass:dist', 'autoprefixer', 'cssmin:minify', 'bless:css', 'uglify:dist', 'clean', 'watch']);

  // grunt deploy - Runs build and deploys it to the defined remote server.
  //grunt.registerTask('deploy', ['build', 'shell:package', 'sftp:deploy', 'sshexec:deploy']);


};