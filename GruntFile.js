/*global module:false*/
module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: {
					port: 3000,
					base: './'
				}
			}
		},
		qunit: {
			files: ['test/**/*.html']
		},
		compass: {
			prod: {
				options: {
					sassDir: 'scss',
					cssDir: 'css',
					outputStyle: 'compressed',
					environment: 'production'
				}
			}
		},
		concat: {
			dist: {
				src: [
					'src/*.js'
				],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				report: 'min'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['dist/clearview.js']
				}
			}
		},
		watch: {
			files: ['src/*.js', 'scss/*.scss'],
			tasks: ['compass', 'jshint', 'concat', 'uglify', 'connect:server']
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true,
				white: true,
				globals: {
					console: true,
					JSON: true,
					jQuery: true,
					escape: true,
					unescape: true
				}
			},
			dist: ['src/script.js'],
			grunt: ['GruntFile.js']
		}
	});

	grunt.registerTask('default', ['compass', 'jshint', 'concat', 'uglify', 'connect:server', 'watch']);

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	
};