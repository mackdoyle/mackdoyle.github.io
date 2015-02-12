"use strict";module.exports=function(s){require("time-grunt")(s),require("load-grunt-tasks")(s),s.initConfig({path:{dist:"dist",srv:"_site",src:"src",tmp:"src/.tmp"},sass:{options:{bundleExec:!0,debugInfo:!1,lineNumbers:!1},serve:{files:[{src:"<%= path.src %>/scss/styles.scss",dest:"<%= path.src %>/assets/css/styles.css"}]},dist:{files:[{src:"<%= path.src %>/scss/styles.scss",dest:"<%= path.src %>/assets/css/styles.css"}]}},autoprefixer:{options:{browsers:["last 2 versions"],cascade:"false"},serve:{src:"<%= path.src %>/assets/css/styles.css"},dist:{src:"<%= path.src %>/assets/css/styles.css"}},cmq:{options:{log:!1},build:{files:"<%= path.src %>/assets/css/styles.css"}},uncss:{build:{files:{"<%= path.src %>/assets/css/tidy.css":["<%= path.srv %>/index.html","<%= path.srv %>/about.html","<%= path.srv %>/projects.html"]}}},cssmin:{options:{check:"gzip"},file:{src:"<%= path.src %>/assets/css/styles.css",dest:"<%= path.srv %>/assets/css/styles.min.css"}},concat:{js:{file:[{src:["<%= path.src %>/bower_components/jquery/dist/jquery.min.js","<%= path.src %>/bower_components/imagesloaded/imagesloaded.pkgd.min.js","<%= path.src %>/bower_components/isotope/dist/isotope.pkgd.min.js","<%= path.src %>/assets/js/main.js"],dest:"<%= path.tmp %>/optifying.js"}]}},uglify:{file:{src:"<%= path.tmp %>/optifying.js",dest:"<%= path.srv %>/assets/js/optified.js"}},useminPrepare:{html:"<%= path.srv %>/index.html",options:{dest:"<%= path.srv %>"}},usemin:{options:{assetsDirs:"<%= path.srv %>/assets"},html:"<%= path.srv %>/**/*.html",css:"<%= path.srv %>/assets/css/**/*.css"},htmlmin:{dist:{options:{collapseWhitespace:!0,collapseBooleanAttributes:!0,removeAttributeQuotes:!0,removeRedundantAttributes:!0},files:[{expand:!0,cwd:"<%= path.srv %>",src:"**/*.html",dest:"<%= path.srv %>"}]}},imagemin:{dist:{options:{progressive:!0},files:[{expand:!0,cwd:"<%= path.srv %>",src:"**/*.{jpg,jpeg,png}",dest:"<%= path.srv %>"}]}},svgmin:{dist:{files:[{expand:!0,cwd:"<%= path.srv %>",src:["**/*.svg","!<%= path.srv %>/fonts/**/*.svg"],dest:"<%= path.srv %>"}]}},clean:{serve:["<%= path.src %>/assets/.tmp/**/*","<%= path.srv %>"],dist:{files:[{dot:!0,src:["<%= path.srv %>/*","<%= path.src %>/assets/.tmp/**/*","!<%= path.srv %>/.git*"]}]}},shell:{copyPrefixedCss:{command:"cp -r ~/Sites/jmd/src/assets/css/styles.css ~/Sites/jmd/src/assets/css/styles.css"}},copy:{dist:{files:[{expand:!0,dot:!0,cwd:"<%= path.src %>",src:["img/**/*","fonts/**/*","!**/_*{,/*}","favicon.ico","apple-touch*.png"],dest:"<%= path.srv %>"}]},stageJs:{files:[{expand:!0,dot:!0,src:"<%= path.src %>/assets/js/**/*.js",dest:"<%= path.tmp %>/js"}]}},filerev:{options:{length:4},dist:{files:[{src:["<%= path.srv %>/assets/js/**/*.js","<%= path.srv %>/assets/css/**/*.css","<%= path.srv %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}","<%= path.srv %>/fonts/**/*.{eot*,otf,svg,ttf,woff}"]}]}},buildcontrol:{dist:{options:{remote:"../",branch:"docs.wheretraveler",commit:!0,push:!0}}},jshint:{options:{jshintrc:".jshintrc",reporter:require("jshint-stylish")},all:["Gruntfile.js","<%= path.src %>/assets/js/**/*.js","test/spec/**/*.js"]},csslint:{options:{csslintrc:".csslintrc"},check:{src:"<%= path.src %>/assets/css/styles.css",dest:"<%= path.src %>/assets/css/styles.linted.css"}},notify:{task_name:{options:{}},watch:{options:{title:"Task Complete",message:"CSS and JS Compiled Successfully"}},concat:{options:{title:"Concat",message:"Combined to: <%= path.tmp %>/optifying.js"}},uglify:{options:{title:"Uglify",message:"Uglifies to: <%= path.srv %>/assets/js/optified.js"}}},jekyll:{options:{bundleExec:!0,config:"_config.yml",src:"<%= path.src %>"},serve:{options:{config:"_config.yml",dest:"<%= path.srv %>"}},dist:{options:{config:"_config.yml",dest:"<%= path.srv %>"}},check:{options:{doctor:!0}}},watch:{sass:{files:["<%= path.src %>/scss/**/*.{scss,sass}"],tasks:["sass:serve","cssmin","notify:watch"]},concat:{files:["<%= path.src %>/assets/js/**/*.js"],tasks:["concat","uglify","notify:uglify"]},jekyll:{files:["<%= path.src %>/**/*.{html,yml,md,mkd,markdown}","!<%= path.src %>/bower_components/**/*"],tasks:"jekyll:serve"},livereload:{options:{livereload:"<%= connect.options.livereload %>"},files:["_site/**/*.html","<%= path.src %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}"]}},concurrent:{serve:["sass:serve","jekyll:serve","copy:dist"],dist:["sass:dist","copy:dist"]},connect:{options:{port:9e3,livereload:35729,hostname:"0.0.0.0"},livereload:{options:{open:!0,base:["<%= path.src %>/assets","<%= path.srv %>"]}},serve:{options:{open:!0,base:["<%= path.src %>/assets","<%= path.srv %>"]}},dist:{options:{open:!0,base:["<%= path.dist %>"]}},test:{options:{base:["<%= path.src %>/assets","<%= path.srv %>","test"]}}},pagespeed:{test:{options:{nokey:!0,url:"http://jmd.io",locale:"en_US",strategy:"desktop",threshold:35}}}}),s.loadNpmTasks("grunt-notify"),s.registerTask("serve",function(t){return"dist"===t?s.task.run(["build","connect:dist:keepalive"]):void s.task.run(["clean:serve","concurrent:serve","useminPrepare","sass:serve","cssmin","concat","uglify","usemin","connect:livereload","jekyll:serve","watch"])}),s.registerTask("build",["clean","concurrent:dist","useminPrepare","sass:dist","cmq:build","uncss:build","cssmin","concat","uglify","imagemin","svgmin","usemin","htmlmin","jekyll:dist"]),s.registerTask("test",["pagespeed:test"]),s.registerTask("check",["clean:serve","jekyll:check","sass:serve","csslint:check"]),s.registerTask("deploy",["check","test","build","buildcontrol"]),s.registerTask("default",["check","test","build"])};