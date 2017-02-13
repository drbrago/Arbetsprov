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
                    'build/main.css': ['src/styles/*.styl'] // compile and concat into single file
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
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
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
                        dest: 'public/',
                        filter: 'isFile'
                    },
                    // copy assets
                    {
                        expand: true,
                        src: ['src/scripts/*'],
                        dest: 'public/scripts/',
                        filter: 'isFile'
                    },
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
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('default', ['jshint', 'stylus:release', 'qunit', 'concat', 'uglify', 'cssmin', 'copy']);
    grunt.registerTask('build', ['jshint', 'stylus:dev', 'qunit', 'copy:dev', 'clean:dev']);

};
