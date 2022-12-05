const { src, dest, watch, series, parallel } = require("gulp"),
    sass = require("gulp-sass")(require("sass")),
    cssnano = require("gulp-cssnano"),
    autoprefixer = require("gulp-autoprefixer"),
    uglify = require("gulp-uglify"),
    pug = require("gulp-pug");

const srcPath = {
    sass: "./app/styles/**/*.sass",
    js: "./app/scripts/*.js",
    pug: "./app/pugs/*.pug",
};

function buildHTML() {
    return src(srcPath.pug).pipe(pug()).pipe(dest("./"));
}

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
    watch(
        [srcPath.sass, srcPath.js, srcPath.pug],
        series(parallel(buildStyles, minifyJS, buildHTML))
    );
}

exports.default = series(
    parallel(buildStyles, minifyJS, buildHTML),
    watchFiles
);
