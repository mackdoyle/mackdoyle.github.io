
module.exports = function(grunt) {
  'use strict';
    // Show elapsed time after tasks run
    require('time-grunt')(grunt);
    // Load all Grunt tasks
    require('jit-grunt')(grunt);

    grunt.initConfig({
        app: {
            source: 'src',
            dist: '.jekyll'
        },

        /*
         * WATCH
         * --------------------------------------------------
         */
        watch: {
            sass: {
                files: ['<%= app.source %>/scss/**/*.{scss,sass}'],
                tasks: ['sass:server', 'autoprefixer:server', 'cssmin:dist', 'uncss:dist']
            },
            scripts: {
                files: ['<%= app.source %>/assets/js/**/*.js'],
                tasks: ['uglify:server']
            },
            jekyll: {
                files: ['<%= app.source %>/**/*.{html,yml,md,mkd,markdown}'],
                tasks: ['jekyll:server', 'watch:scripts']
            },
            images: {
                files: ['<%= app.source %>/assets/images**/*.{gif,jpg,jpeg,png,svg,webp}'],
                tasks: ['copy:server']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '.jekyll/**/*.{html,yml,md,mkd,markdown}',
                    '.tmp/assets/css/*.css',
                    '.tmp/assets/js/*.js',
                    '.tmp/assets/images**/*.{gif,jpg,jpeg,png,svg,webp}'
                ]
            }
        },

        /*
         * CONNECT
         * --------------------------------------------------
         */
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: {
                        target: 'http://localhost:9000/'
                    },
                    base: [
                        '.jekyll',
                        '.tmp',
                        '<%= app.source %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: {
                        target: 'http://localhost:9000/'
                    },
                    base: [
                        '<%= app.dist %>',
                        '.tmp'
                    ]
                }
            }
        },

        /*
         * CLEAN
         * --------------------------------------------------
         */
        clean: {
            server: [
                '.jekyll',
                '.tmp',
                'dist'
            ],
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= app.dist %>/*',
                        '!<%= app.dist %>/.git*'
                    ]
                }]
            }
        },

        /*
         * JEKYLL
         * --------------------------------------------------
         */
        jekyll: {
            options: {
                src: '<%= app.source %>'
            },
            dist: {
                options: {
                    config: '_config.yml',
                    dest: '<%= app.dist %>',
                }
            },
            server: {
                options: {
                    config: '_config.yml',
                    dest: '<%= app.dist %>'
                }
            }
        },

        /*
         * UGLIFY
         * --------------------------------------------------
         */
        uglify: {
            server: {
                options: {
                    mangle: false
                },
                files: {
                    '<%= app.dist %>/assets/js/main.min.js': ['<%= app.source %>/assets/js/*.js']
                }
            },
            dist: {
                options: {
                    compress: true,
                    preserveComments: false,
                    report: 'min'
                },
                files: {
                    '<%= app.dist %>/assets/js/main.min.js': ['<%= app.source %>/assets/js/*.js']
                }
            }
        },

        /*
         * SASS
         * --------------------------------------------------
         */
        sass: {
            server: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.source %>/scss',
                    src: '**/*.{scss,sass}',
                    dest: '<%= app.dist %>/assets/css',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.source %>/scss',
                    src: '**/*.{scss,sass}',
                    dest: '<%= app.dist %>/assets/css',
                    ext: '.css'
                }]
            }
        },

        /*
         * UNCSS
         * --------------------------------------------------
         */
        uncss: {
            options: {
                htmlroot: '<%= app.dist %>',
                report: 'gzip'
            },
            dist: {
                src: '<%= app.dist %>/**/*.html',
                dest: '<%= app.dist %>/assets/css/styles.min.css'
            }
        },

        /*
         * AUTOPREFIXER
         * --------------------------------------------------
         */
        autoprefixer: {
            options: {
                browsers: ['last 3 versions']
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>/assets/css',
                    src: '**/*.css',
                    dest: '<%= app.dist %>/assets/css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>/assets/css',
                    src: '**/*.css',
                    dest: '<%= app.dist %>/assets/css'
                }]
            }
        },

         /*
         * CRITICAL CSS
         * --------------------------------------------------
         */
        critical: {
            dist: {
                options: {
                    base: '<%= app.dist %>',
                    css: [
                        '<%= app.dist %>/assets/css/styles.css'
                    ],
                    minify: true,
                    width: 320,
                    height: 480
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>',
                    src: ['**/*.html'],
                    dest: '<%= app.dist %>'
                }]
            }
        },

        /*
         * HTMLMIN
         * --------------------------------------------------
         */
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>',
                    src: '**/*.html',
                    dest: '<%= app.dist %>'
                }]
            }
        },

        /*
         * CSSMIN
         * --------------------------------------------------
         */
        cssmin: {
          dist: {
            options: {
                keepSpecialComments: 0,
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            files: [{
              expand: true,
              cwd: '<%= app.dist %>/assets/css',
              src: ['*.css', '!*.min.css'],
              dest: '<%= app.dist %>/assets/css',
              ext: '.min.css'
            }]
          }
        },

        /*
         * IMAGEMIN
         * --------------------------------------------------
         */
        imagemin: {
            options: {
                progressive: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>/assets/images',
                    src: '**/*.{jpg,jpeg,png,gif}',
                    dest: '<%= app.dist %>/assets/images'
                }]
            }
        },

        /*
         * SVGMIN
         * --------------------------------------------------
         */
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>/assets/images',
                    src: '**/*.svg',
                    dest: '<%= app.dist %>/assets/images'
                }]
            }
        },

        /*
         * COPY
         * Does what the name says
         */
        copy: {
            server: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= app.source %>',
                    src: ['assets/images/**/*'],
                    dest: '.tmp'
                }]
            }
        },

        /*
         * PHANTOMAS
         * check metrics/index.html for a metrics report over time
         */
        phantomas: {
            gruntSite : {
                options : {
                    indexPath : '<%= app.dist %>/metrics/',
                    options   : {},
                    url       : 'localhost:9000',
                    buildUi   : true
                }
            }
        },

        buildcontrol: {
            dist: {
                options: {
                    dir: '<%= app.dist %>',
                    remote: 'git@github.com:mackdoyle/repo.git',
                    branch: 'master',
                    commit: true,
                    push: true,
                    connectCommits: false
                }
            }
        }
    });

    // DEFINE TASKS
    // --------------------------------------------------

    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'jekyll:server',
            'sass:server',
            'autoprefixer:server',
            'cssmin:dist',
            'uglify:server',
            'uncss:dist',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function() {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'jekyll:dist',
        'sass:dist',
        'autoprefixer:dist',
        'cssmin:dist',
        'uglify:dist',
        'uncss:dist',
    ]);

    grunt.registerTask('deploy', [
        'build',
        'imagemin',
        'svgmin',
        'buildcontrol'
    ]);

    grunt.registerTask('default', [
        'serve'
    ]);
};