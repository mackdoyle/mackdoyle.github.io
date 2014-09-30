/*
 * Main Grunt Task Configuration
 * -------------------------------------------------
 */
'use strict';

module.exports = function (grunt) {
  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // Configurable paths
    path: {
      dist: 'dist',
      srv: '_site',
      src: 'src',
      tmp: '.tmp'
    },


    // Watch
    watch: {
      sass: {
        files: ['<%= path.src %>/scss/**/*.{scss,sass}'],
        tasks: ['sass:serve','cssmin','notify:watch']
      },
      jekyll: {
        files: [
          '<%= path.src %>/**/*.{html,yml,md,mkd,markdown}',
          '!<%= path.src %>/bower_components/**/*',
          '!<%= path.src %>/**/*/.tmp/**/*'
        ],
        tasks: 'jekyll:serve'
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '_site/**/*.html',
          '.tmp/assets/css/**/*.css',
          '<%= path.src %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
      }
    },



    /*
     * Concurrent
     * -------------------------------------------------
     */
    concurrent: {
      serve: [
        'sass:serve',
        'jekyll:serve',
        'copy:dist'
      ],
      dist: [
        'sass:dist',
        'copy:dist'
      ]
    },


    /*
     * Connect
     * -------------------------------------------------
     */
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to localhost if not working
        hostname: '0.0.0.0'
      },


    /*
     * Livereload
     * -------------------------------------------------
     */
      livereload: {
        options: {
          open: true,
          base: [
            '<%= path.src %>/assets',
            '<%= path.srv %>'
          ]
        }
      },
      serve: {
        options: {
          open: true,
          base: [
            '<%= path.src %>/assets',
            '<%= path.srv %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: [
            '<%= path.dist %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            '<%= path.src %>/assets',
            '<%= path.srv %>',
            'test'
          ]
        }
      }
    },

    /*
     * Jekyll
     * -------------------------------------------------
     */
    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml',
        src: '<%= path.src %>'
      },
      dist: {
        options: {
          dest: '<%= path.srv %>'
        }
      },
      serve: {
        options: {
          config: '_config.yml',
          dest: '<%= path.srv %>'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },

    /*
     * ================================================
     * CSS Scpecific
     * ================================================
     */

    /*
     * Sass (CSS Task 1)
     * -------------------------------------------------
     */
    sass: {
      options: {
        bundleExec: true,
        debugInfo: false,
        lineNumbers: false
      },
      serve: {
        files: [{
          src: '<%= path.src %>/scss/styles.scss',
          dest: '<%= path.src %>/assets/css/styles.css'
        }]
      },
      dist: {
        files: [{
          src: '<%= path.src %>/scss/styles.scss',
          dest: '<%= path.src %>/assets/css/styles.css'
        }]
      }
    },


    /*
     * CSS Autoprefixer  (CSS Task 2)
     * -------------------------------------------------
     */
    autoprefixer: {
      options: {
        browsers: ['last 2 versions'],
        cascade: "false"
      },
      serve: {
        src: '<%= path.src %>/assets/css/styles.css'
      },
      dist: {
        src: '<%= path.src %>/assets/css/styles.css'
      }
    },


    /*
     * CSSmin (CSS Task 3)
     * -------------------------------------------------
     */
    cssmin: {
      options: {
        check: 'gzip'
      },
      file: {
        src:  '<%= path.src %>/assets/css/styles.css',
        dest: '<%= path.srv %>/assets/css/styles.min.css'
      }
    },

    /*
     * ================================================
     * Javascript Scpecific
     * ================================================
     */

    /*
     * Concat
     * Output JS files to /.tmp and have Uglify pick up from there for final processing
     * -------------------------------------------------
     */
    concat: {
      js: {
        file: [{
            src: [ '<%= path.src %>/bower_components/jquery/dist/jquery.min.js', '<%= path.src %>/bower_components/imagesloaded/imagesloaded.pkgd.min.js', '<%= path.src %>/bower_components/isotope/dist/isotope.pkgd.min.js', '<%= path.src %>/assets/js/main.js' ],
            dest:  '<%= path.src %>/assets/.tmp/js/optifying.js'
          }
        ]
      }
    },

    /*
     * Uglify
     * -------------------------------------------------
     */
    uglify: {
      serve: {
        file: {
          src:  '<%= path.src %>/assets/.tmp/js/optifying.js',
          dest: '<%= path.srv %>/assets/js/optified.js'
        }
      },
      dist: {
        file: {
          src:  '<%= path.src %>/assets/.tmp/js/optifying.js',
          dest: '<%= path.srv %>/assets/js/optified.js'
        }
      }
    },

    /*
     * Usemin
     * -------------------------------------------------
     */
    useminPrepare: {
      html: '<%= path.dist %>/index.html',
      options: {
        dest: '<%= path.dist %>'
      }
    },

    // Usemin
    // Moves CSS and javascript inside of Usemin blocks.
    usemin: {
      options: {
        assetsDirs: ['<%= path.dist %>/assets', '<%= path.dist %>/images']
      },
      html: '<%= path.dist %>/**/*.html',
      css: '<%= path.dist %>/assets/css/**/*.css'
    },

    // HTML Prepare
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true
        },
        files: [{
          expand: true,
          cwd: '<%= path.dist %>',
          src: '**/*.html',
          dest: '<%= path.dist %>'
        }]
      }
    },

    // Imagemin
    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= path.dist %>',
          src: '**/*.{jpg,jpeg,png}',
          dest: '<%= path.dist %>'
        }]
      }
    },

    // SVGmin
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.dist %>',
          src: '**/*.svg',
          dest: '<%= path.dist %>'
        }]
      }
    },


    /*
     * Clean
     * -------------------------------------------------
     */
    clean: {
      serve: [
        '<%= path.src %>/assets/.tmp/**/*',
        '<%= path.srv %>'
      ],
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= path.dist %>/*',
            '<%= path.src %>/assets/.tmp/**/*',
            // Running Jekyll also cleans the target directory.  Exclude any
            // non-standard `keep_files` here (e.g., the generated files
            // directory from Jekyll Picture Tag).
            '!<%= path.dist %>/.git*'
          ]
        }]
      }
    },


    /*
     * Using cp command with Shell since grunt-contrib-copy and grunt-autoprefixer suck
     * -------------------------------------------------
     */
    shell: {
      copyPrefixedCss: {
        command: 'cp -r ~/Sites/jmd/src/assets/css/styles.css ~/Sites/jmd/src/assets/css/styles.css'
      }
    },


    /*
     * Copy
     * -------------------------------------------------
     */
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= path.src %>',
          src: [
            // Jekyll processes and moves HTML and text files.
            // Usemin moves CSS and javascript inside of Usemin blocks.
            // Copy moves asset files and directories.
            'img/**/*',
            'fonts/**/*',
            // Like Jekyll, exclude files & folders prefixed with an underscore.
            '!**/_*{,/*}',
            // Explicitly add any files your site needs for distribution here.
            //'bower_components/jquery/jquery.js',
            'favicon.ico',
            'apple-touch*.png'
          ],
          dest: '<%= path.dist %>'
        }]
      },

      stageJs: {
        files: [{
          expand: true,
          dot: true,
          src: '<%= path.src %>/assets/js/**/*.js',
          dest: '<%= path.tmp %>/js'
        }]
      }
    },


    /*
     * File Revision
     * -------------------------------------------------
     */
    filerev: {
      options: {
        length: 4
      },
      dist: {
        files: [{
          src: [
            '<%= path.dist %>/assets/js/**/*.js',
            '<%= path.dist %>/assets/css/**/*.css',
            '<%= path.dist %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}',
            '<%= path.dist %>/fonts/**/*.{eot*,otf,svg,ttf,woff}'
          ]
        }]
      }
    },


    /*
     * Build Control
     * -------------------------------------------------
     */
    buildcontrol: {
      dist: {
        options: {
          remote: '../',
          branch: 'docs.wheretraveler',
          commit: true,
          push: true
        }
      }
    },


    /*
     * Code Validation Tasks
     * -------------------------------------------------
     */

    // JSHint
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= path.src %>/assets/js/**/*.js',
        'test/spec/**/*.js'
      ]
    },

    // CSSLint
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      check: {
        src: '<%= path.src %>/assets/css/styles.css',
        dest: '<%= path.src %>/assets/css/styles.linted.css'
      }
    },


    /*
     * Notification Messages
     * -------------------------------------------------
     */
    notify: {
      task_name: {
        options: {
          // Task-specific options go here.
        }
      },
      watch: {
        options: {
          title: 'Task Complete',  // optional
          message: 'CSS and JS Compiled Successfully' //required
        }
      }
    }

  });

  /*
   * =================================================
   * Define Task
   * =================================================
   */
  grunt.loadNpmTasks('grunt-notify');

  // Grunt Serve
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:serve',
      'concurrent:serve',
      'sass:serve',
      'cssmin',
      'concat',
      'uglify:serve',
      'connect:livereload',
      'jekyll:serve',
      'watch'
    ]);
  });

  // Grunt Build
  grunt.registerTask('build', [
    'clean', // Jekyll cleans files from the target directory, so must run first
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'sass:dist',
    'cssmin',
    'uglify:dist',
    'imagemin',
    'svgmin',
    'usemin',
    'htmlmin',
    'jekyll:dist'
  ]);

  // Grunt Test
  // No real tests yet. Add your own.
  grunt.registerTask('test', [
  //   'clean:serve',
  //   'concurrent:test',
  //   'connect:test'
  ]);

  // Grunt Check
  // 'jshint:all',
  grunt.registerTask('check', [
    'clean:serve',
    'jekyll:check',
    'sass:serve',
    'csslint:check'
  ]);

  // Grunt Deploy
  grunt.registerTask('deploy', [
    'check',
    'test',
    'build',
    'buildcontrol'
    ]);

 // Grunt
  grunt.registerTask('default', [
    'check',
    'test',
    'build'
  ]);
};
