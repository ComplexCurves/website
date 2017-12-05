const gulp = require('gulp');
const del = require('del');

const thirdPartyLibs = [
  'jquery',
  'semantic-ui-css'
];
const libPath = 'lib/';
const nodeModulesPath = 'node_modules/';

function surroundPaths(prefix, paths, postfix = '') {
  return paths.map(path => prefix + path + postfix);
}

gulp.task('copyThirdPartyLibs', function() {
    del(surroundPaths(libPath, thirdPartyLibs));
    gulp.src(surroundPaths(nodeModulesPath, thirdPartyLibs, '/**/*'), {
      base: nodeModulesPath
    }).pipe(gulp.dest(libPath));

});

gulp.task('default', ['copyThirdPartyLibs']);
