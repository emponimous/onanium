var gulp          = require('gulp');
var sass          = require('gulp-sass');
var eyeglass      = require('eyeglass'); // for shorter imports
var sourcemaps    = require('gulp-sourcemaps');
var prefix        = require('gulp-autoprefixer');
var browserSync   = require('browser-sync').create();


var input = 'sass/**/*.scss';
var output = './css/';
var sourcemapdir = '.css/maps';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  eyeglass: {
    // eyeglass options go here
  }
};

var prefixerOptions = {
  browsers: ['last 2 versions']
};

gulp.task('sass', function() {
  gulp.src(input)
      //.pipe(sourcemaps.init())
      .pipe(sass(eyeglass(sassOptions)).on('error', sass.logError))
      //.pipe(sourcemaps.write())
      .pipe(prefix(prefixerOptions))
      .pipe(gulp.dest(output))
      .pipe(browserSync.stream());
});

// Watch task
gulp.task('watch', function() {
  gulp.watch(input, ['sass'])
      .on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      });
});

// Production build task
gulp.task('prod', function() {
  gulp.src(input)
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(gulp.dest(output));
});

// Browser sync static server
gulp.task('serve', ['sass', 'watch'], function() {
  browserSync.init({
    server: output
    //proxy: "google.lv"
  });
})

gulp.task('default', ['serve']);
