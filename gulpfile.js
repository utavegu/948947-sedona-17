"use strict";

var gulp = require("gulp");  //подключил сам галп
var plumber = require("gulp-plumber");  //подключил гаситель критичности ошибок
var sourcemap = require("gulp-sourcemaps");  //подключил карту исходников
var less = require("gulp-less");  //подключил декодер less-css
var postcss = require("gulp-postcss");  //подключил плагин postcss(для работы автопрефиксера)
var autoprefixer = require("autoprefixer");  //подключил сам автопрефиксер
var server = require("browser-sync").create();  //подключил локальный веб-сервер
var csso = require("gulp-csso");  //подключил минификатор css
var rename = require("gulp-rename");  //подключил галп-переименователь
var del = require("del");  //подключил галп-удалятель
var imagemin = require("gulp-imagemin");  //подключил 4 плагина по оптимизации изображений
var webp = require("gulp-webp");  //подключил оптимизатор webp
var svgstore = require("gulp-svgstore");  //подключил сборщик svg-спрайта
var posthtml = require("gulp-posthtml");  //подключил post-html
var include = require("posthtml-include");  //и плагин инклюд для него
var minjs = require("gulp-uglify");  //минификатор js
var minhtml = require("gulp-minimize");  //минификатор html


//Декодирование less в css и автопрефиксер
gulp.task("css-dev", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

//Минимизация css и закидывание его в продакшн
gulp.task("css-prod", function () {
  return gulp.src("source/css/style.css")
    .pipe(csso())
    // .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

//Вставка содержимого include в итоговый html
gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(minhtml())
    .pipe(gulp.dest("build"));
})

//Оптимизация изображений (png, jpg, svg)
gulp.task("images", function() {
	return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel:3}),
      imagemin.jpegtran({progressive:true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
});

//Создание webp из растра и копирование в продакшн
gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp())
    .pipe(gulp.dest("build/img"));
})

//Создание svg-спрайта
gulp.task("sprite", function() {
  return gulp.src("source/img/*_spr.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("source/img"))
  .pipe(gulp.dest("build/img"));
})

//Удаление папки билда (чтобы удалённое в source при разработке не оставалось в build)
gulp.task("clean", function () {
	return del("build");
});

gulp.task("compress-js", function() {
  return gulp.src("source/js/*.js")
  .pipe(minjs())
  .pipe(gulp.dest("build/js"));
});

//Копирование нужного в папку продакшена
gulp.task("copy", function() {
	return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/js/picturefill.min.js",
    "source/*.ico"
    ], {
			base: "source"
		})
		.pipe(gulp.dest("build"));
});

//Автообновления локального сервера при разработке
gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("source/less/**/*.less", gulp.series("css-dev"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("untrack", function () {
  return del("source/img/sprite.svg");
});

//Сборка проекта
gulp.task("build", gulp.series("css-dev", "clean", "copy", "css-prod", "compress-js", "images", "webp", "sprite", "html", "untrack"));

//Сборка проекта + запуск локального сервера
gulp.task("start", gulp.series("build", "server"));

//Тестирование в препродакшене (обязательно после npm run build и без untrack в билде)
gulp.task("prepro", gulp.series("css-dev", "copy", "css-prod", "html"));
