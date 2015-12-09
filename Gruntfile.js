/*

Default Gruntfile for AppGyver Steroids
http://www.appgyver.com
Licensed under the MIT license.

*/

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-steroids");
  grunt.registerTask("default", [
    "steroids-make-fresh"
  ]);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    karma: {
        unit: {
            configFile: 'karma.conf.js'
        }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.registerTask('default', ['karma']);

}
