
module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);

	grunt.loadNpmTasks("gruntify-eslint");
	grunt.loadNpmTasks("grunt-contrib-yuidoc");
	grunt.loadNpmTasks("grunt-contrib-watch");

	var config = {
		"pkg": grunt.file.readJSON("package.json"),
		"eslint": {
			"options": {
				"globals": [
					"Math"
				],
				"rules": {
					"eqeqeq": 0,
					"curly": [2, "all"],
					"no-undef": 2,
					"semi": 2,
					"indent": [2, "tab", {
						"ignoreComments": true,
						"MemberExpression": 0,
						"SwitchCase": 1
					}],
					"comma-dangle": 2,
					"quotes": [2, "double"],
					"no-unused-vars": [2, {
						"varsIgnorePattern": "^_?ignore"
					}],
					"block-scoped-var": 2,
					"no-undef": 2,
					"semi": 2,
					"camelcase": 2,
					"max-depth": [1, {
						"max": 4
					}],
					"no-unused-vars": 1
				},
				"terminateOnCallback": false,
				"callback": function(response) {
					if(response.errorCount) {
						var result, message;
						for(result=response.results.length-1; result !== -1; --result) {
							if(!response.results[result].errorCount) {
								response.results.splice(result,1);
							} else {
								for(message=response.results[result].messages.length-1; message !== -1; --message) {
									if(response.results[result].messages[message].severity !== 2) {
										response.results[result].messages.splice(message,1);
									}
								}
							}
						}
					}
					return response;
				},
				"envs": ["browser", "node", "jasmine"]
			},
			"lib": [
				"lib/**/*.js",
				"spec/*.js"
			]
		},
		"watch": {
			"lib": {
				"files": ["index.js"],
				"tasks": ["lint", "jasmine", "doc"]
			}
		},
		"yuidoc": {
			"compile": {
				"name": "<%= pkg.name %>",
				"description": "<%= pkg.description %>",
				"version": "<%= pkg.version %>",
				"url": "<%= pkg.homepage %>",
				"options": {
					"paths": ["./"],
					"outdir": "./docs",
					"markdown": true
				}
			}
		}
	};

	grunt.initConfig(config);
	grunt.registerTask("jasmine", function() {
		var done = this.async();
		var Jasmine = require("jasmine");
		var jasmine = new Jasmine();

		var Reporter = require("jasmine-console-reporter");
		var reporter = new Reporter({
			colors:2,
			verbosity: 3,
			emoji: false
		});

		jasmine.configureDefaultReporter(false);
		jasmine.onComplete(done);
		jasmine.loadConfig({
			"spec_dir": "./",
			"spec_files": ["specification.js"],
			"random": false
		});

		jasmine.addReporter(reporter);

		jasmine.execute();
	});

	grunt.registerTask("default", ["lint", "jasmine", "doc", "watch:lib"]);
	grunt.registerTask("lint", ["eslint:lib"]);
	grunt.registerTask("doc", ["yuidoc"]);
};
