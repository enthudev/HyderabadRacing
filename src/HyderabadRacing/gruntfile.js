// This file in the main entry point for defining grunt tasks and using grunt plugins.
// Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409

module.exports = function (grunt) {
    grunt.initConfig({
        gitrootpath: 'E:/EnthuDev/HyderabadRacing/GitProjects',
        bootstrapfolder: 'bootstrap',
        themefolder: 'StartBootstrapGrayscale',
        bower: {
            install: {
                options: {
                    targetDir: "wwwroot/lib",
                    layout: "byComponent",
                    cleanTargetDir: false
                }
            }
        },
        gitclone: {
            bootstrap: {
                options: {
                    cwd: "<%= gitrootpath %>",
                    repository: "https://github.com/twbs/bootstrap.git",
                    directory: "<%= bootstrapfolder %>"
                }
            },
            sitetheme: {
                options:{
                    cwd: "<%= gitrootpath %>",
                    repository: "https://github.com/IronSummitMedia/startbootstrap-grayscale.git",
                    directory: "<%= themefolder %>"
                }
            }
        },
        gitfetch:{
            bootstrap: {
                options: {
                    cwd: "E:/EnthuDev/HyderabadRacing/GitProjects/bootstrap",
                    remote: "origin"
                }
            },
            sitethem: {
                options: {
                    cwd: "<%= gitrootpath %>/<%= themefolder %>"
                }
            }
        },
        copy: {
            bsless: {
                expand: true,
                cwd: '<%= gitrootpath %>/<%= bootstrapfolder %>/Less',
                src: '**/*',
                dest: 'LESS/Bootstrap/'
            },
            bsfonts: {
                expand: true,
                cwd: '<%= gitrootpath %>/<%= bootstrapfolder %>/',
                src: 'fonts/*',
                dest: 'wwwroot/'
            },
            gsless: {
                expand: true,
                cwd: '<%= gitrootpath %>/<%= themefolder %>/less',
                src: '*',
                dest: 'less/grayscale'
            },
            gsimg: {
                expand: true,
                cwd: '<%= gitrootpath %>/<%= themefolder %>/img',
                src: '*',
                dest: 'wwwroot/img'
            }
        },
        less: {
            development: {
                options: {
                    path: "Less/"
                },
                files: {
                    "wwwroot/css/Styles.css": "Less/Main.less"
                }
            }
        }
    });

    // This command registers the default task which will install bower packages into wwwroot/lib
    grunt.registerTask("default", ["bower:install"]);
    grunt.registerTask("cloneAllGitProjects", ["gitclone:bootstrap", "gitclone:sitetheme"])
    grunt.registerTask('copyBootStrap', ['copy:bsless', 'copy:gsless', 'copy:gsimg', 'copy:bsfonts'])
    grunt.registerTask("prepareWebSite", ["gitfetch", "copyBootStrap"])
    // The following line loads the grunt plugins.
    // This line needs to be at the end of this this file.
    grunt.loadNpmTasks("grunt-bower-task");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-git");
};