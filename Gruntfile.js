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
      tmp: 'src/.tmp'
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
        cascade: 'false'
      },
      serve: {
        src: '<%= path.src %>/assets/css/styles.css'
      },
      dist: {
        src: '<%= path.src %>/assets/css/styles.css'
      }
    },

    /*
     * CSS - Combine like media queries (CSS Task 3)
     * -------------------------------------------------
     */

    cmq: {
      options: {
        log: false
      },
      build: {
        files: '<%= path.src %>/assets/css/styles.css'
      }
    },

    /*
     * Remove unused CSS from the given files and gen a new cleansed stylesheet (CSS Task 4)
     * -------------------------------------------------
     */

    // NOTE: Need to use something like Processinghtml to add tidy.css to header
    // NOTE: This does not currently check articles so do not use cleansed css file on them.
    uncss: {
      build: {
        files: {
          '<%= path.src %>/assets/css/tidy.css': ['<%= path.srv %>/index.html', '<%= path.srv %>/about.html', '<%= path.srv %>/projects.html']
        }
      }
    },

    /*
     * CSSmin (CSS Task 5)
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
            dest:  '<%= path.tmp %>/optifying.js'
          }
        ]
      }
    },

    /*
     * Uglify
     * -------------------------------------------------
     */
    uglify: {
      file: {
        src:  '<%= path.tmp %>/optifying.js',
        dest: '<%= path.srv %>/assets/js/optified.js'
      }
    },

    /*
     * Usemin
     * -------------------------------------------------
     */
    useminPrepare: {
      html: '<%= path.srv %>/index.html',
      options: {
        dest: '<%= path.srv %>'
      }
    },

    // Usemin
    // Moves CSS and javascript inside of Usemin blocks.
    usemin: {
      options: {
        assetsDirs: '<%= path.srv %>/assets'
      },
      html: '<%= path.srv %>/**/*.html',
      css: '<%= path.srv %>/assets/css/**/*.css'
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
          cwd: '<%= path.srv %>',
          src: '**/*.html',
          dest: '<%= path.srv %>'
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
          cwd: '<%= path.srv %>',
          src: '**/*.{jpg,jpeg,png}',
          dest: '<%= path.srv %>'
        }]
      }
    },

    // SVGmin
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.srv %>',
          src: ['**/*.svg', '!<%= path.srv %>/fonts/**/*.svg'],
          dest: '<%= path.srv %>'
        }]
      }
    },

    /*
     * Image Optimization
     * @requires ImageAplha, ImageOptim, and jpegMini
     * Only optimize build/dist images in case something goes wrong
     * -------------------------------------------------
     */
    imageoptim: {
      build: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        src: ['assets/images']
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
            '<%= path.srv %>/*',
            '<%= path.src %>/assets/.tmp/**/*',
            // Running Jekyll also cleans the target directory.  Exclude any
            // non-standard `keep_files` here (e.g., the generated files
            // directory from Jekyll Picture Tag).
            '!<%= path.srv %>/.git*'
          ]
        }]
      }
    },



   /*
   * Process HTML
   * Another tool to inject CSS and JS links on build.
   * -------------------------------------------------
   */

    // NOT COMPLETE: Add files that contain build placeholders that need processing
    processhtml: {
      dist: {
        files: {
          '<%= path.srv %>/index.html': ['<%= path.src %>/includes/header.html']
        }
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
          dest: '<%= path.srv %>'
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
     * Git Build Control
     * -------------------------------------------------
     */
    buildcontrol: {
      dist: {
        options: {
          commit: true,
          push: true,
          message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
        }
      },
      github: {
        options: {
          remote: 'git@github.com:mackdoyle/mackdoyle.github.io.git',
          branch: 'gh-pages'
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
      },
      concat: {
        options: {
          title: 'Concat',  // optional
          message: 'Combined to: <%= path.tmp %>/optifying.js' //required
        }
      },
      uglify: {
        options: {
          title: 'Uglify',  // optional
          message: 'Uglifies to: <%= path.srv %>/assets/js/optified.js' //required
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
      serve: {
        options: {
          config: '_config.yml',
          dest: '<%= path.srv %>'
        }
      },
      dist: {
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
     * Watch
     * -------------------------------------------------
     */
    watch: {
      sass: {
        files: ['<%= path.src %>/scss/**/*.{scss,sass}'],
        tasks: ['sass:serve','cssmin','notify:watch']
      },
      concat: {
        files: ['<%= path.src %>/assets/js/**/*.js'],
        tasks: ['concat','uglify', 'notify:uglify']
      },
      jekyll: {
        files: [
          '<%= path.src %>/**/*.{html,yml,md,mkd,markdown}',
          '!<%= path.src %>/bower_components/**/*'
        ],
        tasks: 'jekyll:serve'
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '_site/**/*.html',
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
   * =================================================
   * Tests
   * =================================================
   */

   // Show page speed of live site in terminal output
    pagespeed: {
      test: {
        options: {
          nokey: true,
          url: 'http://jmd.io',
          locale: 'en_US',
          strategy: 'desktop',
          threshold: 35
        }
      }
    },





  }); // End task registration

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
      'useminPrepare',
      'sass:serve',
      'cssmin',
      'concat',
      'uglify',
      'usemin',
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
    'sass:dist',
    'cmq:build',
    'cssmin',
    'concat',
    'uglify',
    'imagemin',
    'svgmin',
    'usemin',
    'htmlmin',
    'jekyll:dist',
    'imageoptim:build'
  ]);

  // Grunt Test
  // No real tests yet. Add your own.
  grunt.registerTask('test', [
    'pagespeed:test'
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
