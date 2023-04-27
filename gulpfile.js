// Определяем переменную "preprocessor"
let preprocessor = "sass"; // Выбор препроцессора в проекте - sass или less

// Определяем константы Gulp
const { src, dest, parallel, series, watch } = require("gulp");

// Подключаем Browsersync
const browserSync = require("browser-sync").create();

// Подключаем gulp-concat
const clean = require("gulp-clean");

// Подключаем gulp-concat
const concat = require("gulp-concat");

// Подключаем gulp-uglify-es
const uglify = require("gulp-uglify-es").default;

// Подключаем модули gulp-sass и gulp-less
const sass = require("gulp-sass")(require("sass"));
const less = require("gulp-less");

// Подключаем Autoprefixer
const autoprefixer = require("gulp-autoprefixer");

// Подключаем модуль gulp-clean-css
const cleancss = require("gulp-clean-css");

// Определяем логику работы Browsersync
function browsersync() {
  browserSync.init({
    // Инициализация Browsersync
    server: { baseDir: "./" }, // Указываем папку сервера
    notify: false, // Отключаем уведомления
    online: false, // Режим работы: true или false
  });
}

// Обрабатываем скрипты
function scripts() {
  return src([
    // Берем файлы из источников
    "node_modules/alpinejs/dist/cdn.js", // Alpine JS
    "src/js/modal-fx.js", // Modified Bulma Modal FX
    "src/js/scripts.js", // Project custom JS
  ])
    .pipe(concat("scripts.min.js")) // Конкатенируем в один файл
    .pipe(uglify()) // Сжимаем JavaScript
    .pipe(dest("js/")) // Выгружаем готовый файл в папку назначения
    .pipe(browserSync.stream()); // Триггерим Browsersync для обновления страницы
}

// Обрабатываем стили
function styles() {
  return src([
    "src/" + preprocessor + "/styles." + preprocessor + "",
    "node_modules/animate.css/animate.css",
    "node_modules/bulma-modal-fx/dist/css/modal-fx.css",
  ]) // Выбираем источник: "src/sass/styles.sass" или "src/less/styles.less"
    .pipe(eval(preprocessor)()) // Преобразуем значение переменной "preprocessor" в функцию
    .pipe(concat("styles.min.css")) // Конкатенируем в файл app.min.js
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })
    ) // Создадим префиксы с помощью Autoprefixer
    .pipe(
      cleancss({
        level: { 1: { specialComments: 0 } } /* , format: 'beautify' */,
      })
    ) // Минифицируем стили
    .pipe(dest("css/")) // Выгрузим результат в папку "css/"
    .pipe(browserSync.stream()); // Сделаем инъекцию в браузер
}

// Слежение
function startwatch() {
  // Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
  watch(["src/**/*.js", "!src/**/*.min.js"], scripts);
  // Мониторим файлы препроцессора на изменения
  watch("src/**/" + preprocessor + "/**/*", styles);
  // Мониторим файлы HTML на изменения
  watch("./*.html").on("change", browserSync.reload);
}

// Сборка
function buildcopy() {
  return src(
    [
      // Выбираем нужные файлы
      "css/**/*.min.css",
      "js/**/*.min.js",
      "*.html",
    ],
    { base: "./" }
  ) // Параметр "base" сохраняет структуру проекта при копировании
    .pipe(dest("dist")); // Выгружаем в папку с финальной сборкой
}

function cleandist() {
  return src("dist", { allowEmpty: true }).pipe(clean()); // Удаляем папку "dist/"
}

// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.cleandist = cleandist;

// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;

// Экспортируем функцию scripts() в таск scripts
exports.scripts = scripts;

// Экспортируем функцию styles() в таск styles
exports.styles = styles;

// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(styles, scripts, browsersync, startwatch);

// Создаем новый таск "build", который последовательно выполняет нужные операции
exports.build = series(cleandist, styles, scripts, buildcopy);
