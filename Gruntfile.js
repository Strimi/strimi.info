module.exports = function(grunt) {
    require('time-grunt')(grunt);
    var app = {
        version: require('./package.json').version,
        app: {
            path: 'app'
        },
        src: {
            path: 'src'
        },
        web: {
            path: 'web'
        },
        tmp: {
            path: '.tmp'
        }
    };
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        app: app,
        watch: {
            options: {
                livereload: true
            },
            base: {
                files: [
                    'Gruntfile.js',
                    '<%= app.app.path %>/AppKernel.php',
                    '<%= app.app.path %>/config/**.yml',
                    '<%= app.app.path %>/Resources/public/js/**/*.js',
                    '<%= app.app.path %>/Resources/public/less/**/*.less',
                    '<%= app.app.path %>/Resources/views/source/base.html.twig'
                ],
                tasks: ['build']
            },
            bundle: {
                files: [
                    '<%= app.src.path %>/**/*.js',
                    '<%= app.src.path %>/**/*.less'
                ],
                tasks: ['build']
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "<%= app.web.path %>/css/<%= app.version %>/app.css": '<%= app.app.path %>/Resources/public/less/app.less',
                    "<%= app.web.path %>/css/<%= app.version %>/vendor.css": '<%= app.app.path %>/Resources/public/less/vendor.less'
                }
            }
        },
        wiredep: {
            target: {
                src: [
                    '<%= app.app.path %>/Resources/views/source/base.html.twig'
                ],
                ignorePath: [
                    'components/jquery/dist/jquery.min.js',
                    'components/moment'
                ],
                dependencies: true,
                devDependencies: false
            }
        },
        copy: {
            base: {
                src: '<%= app.app.path %>/Resources/views/source/base.html.twig',
                dest: '<%= app.app.path %>/Resources/views/base.html.twig'
            },
            images: {
                expand: true,
                cwd: '<%= app.app.path %>/Resources/public/images/',
                src: ['**'],
                dest: '<%= app.web.path %>/images/'
            },
            fonts: {
                expand: true,
                cwd: '<%= app.app.path %>/Resources/public/fonts/',
                src: ['**'],
                dest: '<%= app.web.path %>/css/fonts/'
            },
            tracking: {
                files: [
                    {
                        src: '<%= app.app.path %>/Resources/public/js/tr.js',
                        dest: '<%= app.web.path %>/js/<%= app.version %>/tr.js'
                    }
                ]
            },
            bootstrap: {
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        cwd: 'components/bootstrap/dist',
                        dest: '<%= app.web.path %>/css',
                        src: ['fonts/*']
                    }
                ]
            },
            fontawesome: {
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        cwd: 'components/fontawesome',
                        dest: '<%= app.web.path %>/css',
                        src: ['fonts/*']
                    }
                ]
            },
            jquery: {
                files: [
                    {
                        src: 'components/jquery/dist/jquery.min.js',
                        dest: '<%= app.web.path %>/js/<%= app.version %>/jquery.js'
                    }
                ]
            },
            flags: {
                files: [

                    {
                        expand: true,
                        cwd: "components/flag-icon-css/flags",
                        src: ["*.*", "**/*.*"],
                        dest: "<%= app.web.path %>/css/flags"
                    }
                ]
            },
            vendor: {
                src: '.tmp/concat/js/vendor.js',
                dest: '<%= app.web.path %>/js/<%= app.version %>/vendor.js'

            }
        },
        concat: {
            '<%= app.web.path %>/js/<%= app.version %>/app.js': [
                '<%= app.app.path %>/Resources/public/js/app.js',
                '<%= app.app.path %>/Resources/public/js/**/*.js',
                '<%= app.src.path %>/**/*.js',
                '!<%= app.app.path %>/Resources/public/js/tr.js'
            ]
        },
        useminPrepare: {
            html: '<%= app.app.path %>/Resources/views/source/base.html.twig'
        },
        usemin: {
            html: [
                '<%= app.app.path %>/Resources/views/base.html.twig'
            ]
        },
        cssmin: {
            options: {
                keepSpecialComments: 0,
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    '<%= app.web.path %>/css/<%= app.version %>/app.css': [
                        '<%= app.web.path %>/css/<%= app.version %>/app.css'
                    ]
                }
            }
        },
        uglify: {
            app: {
                files: {
                    '<%= app.web.path %>/js/<%= app.version %>/app.js': '<%= app.web.path %>/js/<%= app.version %>/app.js',
                    '<%= app.web.path %>/js/<%= app.version %>/tr.js': '<%= app.web.path %>/js/<%= app.version %>/tr.js',
                    '<%= app.web.path %>/js/<%= app.version %>/vendor.js': '<%= app.web.path %>/js/<%= app.version %>/vendor.js',
                    '<%= app.web.path %>/js/<%= app.version %>/jquery.js': '<%= app.web.path %>/js/<%= app.version %>/jquery.js',
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeEmptyAttributes: true,
                    keepClosingSlash: true,
                    removeCommentsFromCDATA: true,
                    useShortDoctype: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    '<%= app.app.path %>/Resources/views/base.html.twig': '<%= app.app.path %>/Resources/views/base.html.twig'
                }
            }
        },
        clean: {
            app: [
                '<%= app.app.path %>/Resources/views/base.html.twig',
                '<%= app.web.path %>/css/**/*',
                '<%= app.web.path %>/fonts/**/*',
                '<%= app.web.path %>/images/**/*',
                '<%= app.web.path %>/js/**/*'
            ],
            tmp: ['<%= app.tmp.path %>/**/*']
        },
        obfuscator: {
            files: [
                '<%= app.web.path %>/js/<%= app.version %>/app.js'
            ],
            entry: '<%= app.web.path %>/js/<%= app.version %>/app.js',
            out: '<%= app.web.path %>/js/<%= app.version %>/app.js',
            strings: false,
            root: '<%= app.web.path %>/js/<%= app.version %>'
        },
        htmlbuild: {
            dist: {
                src: '<%= app.app.path %>/Resources/views/base.html.twig',
                dest: '<%= app.app.path %>/Resources/views/base.html.twig',
                options: {
                    base: {
                        bundle: [
                            '/js/<%= app.version %>/vendor.js'
                        ],
                        main: '<%= fixturesPath %>/scripts/main.js'
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-obfuscator');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.registerTask('build', [
        'clean:tmp',
        'clean:app',
        'wiredep',
        'copy',
        'less',
        'useminPrepare',
        'concat',
        'copy:vendor',
        'uglify',
        'usemin',
        'htmlbuild',
        'cssmin',
        //'htmlmin'
    ]);
    grunt.registerTask('default', ['watch']);
};

