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

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Project Settings
    settings: {
      // Set common directories to variables for easy upating
      dir: {
        'src': './src',
        'dist': './assets',
        'tmp': './tmp'
      }
    },

    // Clean up temp folders used during build process
    clean: {
      after: [
        '<%= settings.dir.tmp %>'
      ]
    },

    // error check javascript
    //jshint : {
      //options : {
        //jshintrc : '.jshintrc'
      //},
      //all : ['js/{,**/}*.js', '!js/{,**/}*.min.js']
    //},


    // Minify and concatenate js files
    uglify: {
      dev: {
        options : {
          mangle : false,
          compress : false,
          beautify : true
        },
        src: ['<%= settings.dir.src %>/js/vendor/custom.modernizr.js','<%= settings.dir.src %>/js/vendor/jquery-2.1.1.min.js', '<%= settings.dir.src %>/js/base.js'],
        dest: '<%= settings.dir.dist %>/js/base.min.js'
      },
      dist: {
        options : {
          mangle : true,
          compress : true
        },
        src: ['<%= settings.dir.src %>/js/**/*.js','<%= settings.dir.src %>/js/vendor/jquery-2.1.1.min.js', '<%= settings.dir.src %>/js/base.js'],
        dest: '<%= settings.dir.dist %>/js/base.min.js'
      }
    },

    // Compile Sass files to CSS
    // This will compile Sass to Css into the tmp/ directory. Other plugins
    // will then take the css and further optimize it into the css/ directory
    sass: {
      dev: {
        options: {
          // cssmin will minify later
          style: 'expanded',
          cacheLocation: '<%= settings.dir.src %>/scss/.sass-cache'
        },
        files: {
          '<%= settings.dir.tmp %>/css/styles.css': '<%= settings.dir.src %>/scss/**/*.scss'
        }
      },
      dist: {
        options: {
          // cssmin will minify later
          style: 'expanded',
          cacheLocation: '<%= settings.dir.src %>/scss/.sass-cache'
        },
        files: {
          '<%= settings.dir.tmp %>/css/styles.css': '<%= settings.dir.src %>/scss/styles.scss'
        }
      }
    },

    // Autoprefix CSS
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

    // Minify CSS
    // Looks for css that has been compiled into tmp/ and minifies it into the css/
    cssmin: {
      combine: {
        files: {
          '<%= settings.dir.dist %>/css/styles.css': '<%= settings.dir.tmp %>/css/styles.css'
        }
      }
    },

    // Create a file that contains only CSS that is used on the home page.
    // The generated file can then be used for above-the-fold inline css
    // @TODO: Remove dev task after testing. It's not needed during development
    // @TODO: Look into using a sitemap as the source so we can create a version for the entire site

    /*
    // Try this if your other set up is not working
    uncss: {
            dist: {
                files: {
                    'main.css': ['index.html']
                }
            }
        },
    */

    uncss: {
      src: 'index.html',
      dest: '<%= settings.dir.dist %>/css/styles-cleaned.css'
    },

    /*
    shell : {
      "clear-theme-registry" : {
        command : 'drush cache-clear theme-registry'
      },
      "package" : {
        command : 'tar -zcf <%= pkg.buildPath %>/<%= pkg.archive %> <%= pkg.exclude %> *'
      }
    },
    */

    /*
    sftp : {
      deploy : {
        "./" : "<%= pkg.buildPath %>/<%= pkg.archive %>"
      },
      options : {
        path : '<%= pkg.remote.basePath %>',
        host : '<%= pkg.remote.host %>',
        username : '<%= pkg.remote.username %>',
        password : '<%= pkg.remote.password %>',
        srcBasePath : '<%= pkg.buildPath %>'
      }
    },
    */

    /*
    sshexec : {
      deploy : {
        command : "tar -zx -C <%= pkg.remote.basePath %>/<%= pkg.remote.path %> -f <%= pkg.remote.basePath %>/<%= pkg.archive %>;rm <%= pkg.remote.basePath %>/<%= pkg.archive %>;cd <%= pkg.remote.basePath %>/<%= pkg.remote.path %>; drush cache-clear all",
        options : {
          host : '<%= pkg.remote.host %>',
          username : '<%= pkg.remote.username %>',
          password : '<%= pkg.remote.password %>'
        }
      }
    },
    */


    // Watch for changes
    watch: {
      uglify: {
        //files: ['<%= uglify:dev.files %>'],
        files: ['<%= settings.dir.src %>/js/**.js'],
        tasks: 'uglify:dev',
        options: {
          livereload: true
        }
      },
      sass: {
        //files: ['<%= sass:dev.files %>'],
        files: ['<%= settings.dir.src %>/css/**.scss'],
        tasks: ['sass:dev'],
        options: {
          livereload: true
        }
      }
    }

  });

  // Load tasks here
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // grunt - Enables the watcher
  grunt.registerTask('default', ['watch']);

  // grunt uncss - Removes unused CSS for development
  grunt.registerTask('uncss', ['uncss']);

  // grunt dev - Runs tasks for development
  grunt.registerTask('dev', ['sass:dev', 'autoprefixer', 'uglify:dev', 'clean']);

  // grunt build - Runs full suite of tasks to ready files for production
  grunt.registerTask('build', ['sass:dist', 'cssmin', 'autoprefixer', 'uglify:dist', 'clean']);

  // grunt deploy - Runs build and deploys it to the defined remote server.
  //grunt.registerTask('deploy', ['build', 'shell:package', 'sftp:deploy', 'sshexec:deploy']);

};