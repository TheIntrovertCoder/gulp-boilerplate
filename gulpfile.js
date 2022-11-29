const { src, dest, watch, series, parallel } = require("gulp"),
    sass = require("gulp-sass")(require("sass")),
    cssnano = require("gulp-cssnano"),
    autoprefixer = require("gulp-autoprefixer"),
    uglify = require("gulp-uglify");

const srcPath = {
    sass: "./app/styles/**/*.sass",
    js: "./app/scripts/*.js",
};

function buildStyles() {
    return src(srcPath.sass, { sourcemaps: true })
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(dest("./dist/styles"));
}

function minifyJS() {
    return src(srcPath.js).pipe(uglify()).pipe(dest("./dist/scripts"));
}

function watchFiles() {
    watch([srcPath.sass, srcPath.js], series(parallel(buildStyles, minifyJS)));
}

exports.default = series(parallel(buildStyles, minifyJS), watchFiles);
