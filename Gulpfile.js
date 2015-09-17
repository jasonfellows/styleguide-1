var autoprefix = require('gulp-autoprefixer');
var babelify = require('babelify');
var browserify = require('browserify');
var connect = require('gulp-connect');
var eslint = require('gulp-eslint');
var fontName = 'icons';
var gulp = require('gulp');
var gutil = require('gulp-util');
var header = require('gulp-header');
var history = require('connect-history-api-fallback');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var jsonSass = require('gulp-json-sass');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var stringifyObject = require('stringify-object');

function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true })
  var prettyJSON = stringifyObject(string, {singleQuotes: false});
  src._read = function () {
    this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(prettyJSON) }))
    this.push(null)
  }
  return src
}

gulp.task('scripts', function(){
  browserify({
    entries: './src/js/index.js',
    debug: true
  })
  .transform(babelify)
  .bundle()
  .on('error', gutil.log)
  .pipe(source('app.js'))
  .pipe(gulp.dest('./public'))
  .pipe(connect.reload());
});

gulp.task('es-lint', function () {
  return gulp.src(['./src/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('icons', function(){
  gulp.src(['./src/lib/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: './src/lib/scss/_icons-template.scss',
      targetPath: '../../src/scss/base/_icons.scss',
      fontPath: '/fonts/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      normalize: true,
      fixedWidth: true,
      centerHorizontally: true,
      fontHeight: 1001
    }))
    .on('codepoints', function(codepoints, options) {
      string_src('_icons.json', codepoints).pipe(gulp.dest("./src/lib/"));
    })
    .pipe(gulp.dest('././public/fonts/'));
});

gulp.task('import-styles', function(){
  gulp.src('./bower_components/prism/themes/prism-twilight.css')
  .pipe(gulp.dest('./public'));
});

gulp.task('styles', function(){
  gulp.src('./src/scss/app.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({errLogToConsole: true}))
  .pipe(sourcemaps.write('.'))
  .pipe(minifyCSS({processImport: false}))
  .pipe(autoprefix())
  .pipe(gulp.dest('./public'))
  .pipe(connect.reload());
});

gulp.task('scss-lint', function(){
  gulp.src('./src/scss/**/*.scss')
    .pipe(scsslint({
      'config': __dirname + '/scss-lint.yml'
    }))
    .pipe(scsslint.failReporter('E'));
});

gulp.task('colors', function(){
  var source = './src/lib/_colors.json';
  var banner = "// generated from <%= source %> by gulp-json-sass\n\n";
  gulp.src(source)
  .pipe(jsonSass())
  .pipe(header(banner, {source: source}))
  .pipe(gulp.dest('./src/scss/base/'));
});

gulp.task('server', ['icons', 'colors', 'import-styles', 'styles', 'scripts'], function(){
  connect.server({
    root: ['public'],
    port: gutil.env.port || 8080,
    livereload: true,
    middleware: function() {
      return [
        history()
      ]
    }
  });
});

gulp.task('watch', function(){
  gulp.watch('src/lib/icons/**', ['icons']);
  gulp.watch('src/lib/scss/_icons-template.scss', ['icons']);
  gulp.watch('src/lib/_colors.json', ['colors']);
  gulp.watch('src/scss/**', ['scss-lint', 'styles']);
  gulp.watch('src/js/**', ['es-lint', 'scripts']);
});

gulp.task('package:css', ['icons', 'colors'], function(){
  gulp.src('./lib/namely-ui.scss')
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['server', 'watch']);
