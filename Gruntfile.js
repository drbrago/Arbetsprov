module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        stylus: {
            release: {
                files: {
                    'dist/main.css': ['src/styles/*.styl'] // compile and concat into single file
                }
            },
            dev: {
                files: {
                    'build/styles/main.css': ['src/styles/*.styl'] // compile and concat into single file
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dist/index.html': ['src/index.html']
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist',
                    ext: '.min.css'
                }]
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['<%= jshint.files %>'],
                tasks: ['build']
            },
            css: {
                files: 'src/styles/**/*.styl',
                tasks: ['build'],
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['build']
            }
        },
        bower: {
            release: {
                dest: 'dist/bower_components',
                options: {
                    ignorePackages: ['stylus'],
                    packageSpecific: {
                        'bootstrap': {
                            files: [
                                "dist/js/bootstrap.min.js",
                                "dist/css/bootstrap.min.css"
                            ]
                        },
                        'jquery': {
                            files: [
                                "dist/jquery.min.js"
                            ]
                        },
                        'angular': {
                            files: [
                                "angular.min.js"
                            ]
                        },
                        'angular-resource': {
                            files: [
                                "angular-resource.min.js"
                            ]
                        }
                    }
                }
            },
            dev: {
                dest: 'build/bower_components',
                options: {
                    ignorePackages: ['stylus'],
                    packageSpecific: {
                        'bootstrap': {
                            files: [
                                "dist/js/bootstrap.js",
                                "dist/css/bootstrap.css",
                                "dist/fonts/**"
                            ]
                        },
                        'angular-bootstrap': {
                            files: [
                                "ui-bootstrap.js",
                                "ui-bootstrap-tpls.js"
                            ]
                        }
                    }

                }
            }
        },
        copy: {
            release: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: ['assets/*'],
                        dest: 'dist/',
                        filter: 'isFile'
                    }
                ],
            },
            dev: {
                files: [
                    // copy assets
                    {
                        expand: true,
                        src: ['assets/*'],
                        dest: 'build/',
                        filter: 'isFile'
                    },
                    // copy scripts
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['scripts/**', 'index.html'],
                        dest: 'build/',
                        filter: 'isFile'
                    }
                ],
            },
        },
        clean: {
            release: ['dist/*'],
            dev: ['build/*']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('default', ['jshint', 'stylus:release', 'qunit', 'processhtml', 'concat', 'uglify', 'cssmin', 'bower:release',
        'copy:release'
    ]);
    grunt.registerTask('build', ['clean:dev', 'jshint', 'stylus:dev', 'qunit', 'copy:dev', 'bower:dev']);

};
