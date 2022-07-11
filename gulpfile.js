const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
//browserSync
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});
// все файлы + (scss или sass) задача для компиляции
gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});
// следит за обновлением файлов и потом запустить parallel она когда выполниться обновит бразуер
gulp.task("watch", function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change", browserSync.reload); /* следит за именением файлы */
});

gulp.task("default", gulp.parallel("watch", "server", "styles"));