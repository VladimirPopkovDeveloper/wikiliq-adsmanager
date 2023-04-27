// Определяем константы Gulp
const { src, dest, parallel, series, watch } = require("gulp");

// Подключаем Browsersync
const browserSync = require("browser-sync").create();

// Подключаем gulp-concat
const concat = require("gulp-concat");

// Подключаем gulp-uglify-es
const uglify = require("gulp-uglify-es").default;

// Определяем логику работы Browsersync
function browsersync() {
  browserSync.init({
    // Инициализация Browsersync
    server: { baseDir: "./" }, // Указываем папку сервера
    notify: false, // Отключаем уведомления
    online: false, // Режим работы: true или false
  });
}

function scripts() {
  return src([
    // Берем файлы из источников
    "node_modules/alpinejs/dist/cdn.min.js", // Alpine JS
    "src/js/modal-fx.js", // Bulma Modal FX
  ])
    .pipe(concat("scripts.min.js")) // Конкатенируем в один файл
    .pipe(uglify()) // Сжимаем JavaScript
    .pipe(dest("js/")) // Выгружаем готовый файл в папку назначения
    .pipe(browserSync.stream()); // Триггерим Browsersync для обновления страницы
}

// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;

// Экспортируем функцию scripts() в таск scripts
exports.scripts = scripts;
