"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssmin = require("gulp-csso");
var server = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var run = require("run-sequence");
var del = require("del");
var cheerio = require("gulp-cheerio");
var replace = require("gulp-replace");
var webp = require("gulp-webp");
var minjs = require("gulp-minify");
var htmlmin = require('gulp-htmlmin');

//удаляем папку build
gulp.task("clean", function() {
  return del("build");
});

//собираем css, cssmin
gulp.task("style", function() {
  gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(cssmin())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

//минифицируем изображения
gulp.task("images", function() {
  gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
  .pipe(gulp.dest("build/img"));
});

//конвертируем изображения в формат webp
gulp.task("webp", function() {
  gulp.src("source/img/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"))
});

//собираем спрайт из папки sprite
gulp.task("sprite", function() {
  gulp.src("source/img/sprite/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    //удаляем атрибуты
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    //исправляем баг с спец символом
  .pipe(replace('&gt;', '>'))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});

//минифицируем HTML
gulp.task("htmlmin", function() {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
})

//минифицируем js
gulp.task("minify", function() {
  gulp.src("source/js/*.js")
    .pipe(minjs())
    .pipe(gulp.dest("build/js"))
});

//копируем необходимый контент
gulp.task("copyfonts", function() {
  gulp.src("source/fonts/**/*.{woff,woff2}", {
      base: "source"
  })
  .pipe(gulp.dest("build"))
});

gulp.task("copyhtml", function() {
  gulp.src("source/*.html")
  .pipe(gulp.dest("build/html-origin"))
});



//запускаем последовательную сборку
gulp.task("build", function(done) {
  run("clean",
    "style",
    "images",
    "sprite",
    "webp",
    "copyfonts",
    "copyhtml",
    "minify",
    "htmlmin",
     done
    );
});


gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/*.html", ["copy"]);
  //gulp.watch("source/*.html").on("change", server.reload);
});
