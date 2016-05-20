const babel = require("gulp-babel");
const concat = require("gulp-concat");
const cssMin = require("gulp-cssmin");
const gulp = require("gulp");
const hash = require("gulp-hash");
const less = require("gulp-less");
const revReplace = require("gulp-rev-replace");
const rimraf = require("gulp-rimraf");
const runSequence = require("run-sequence");
const uglify = require("gulp-uglify");

const DEST_PATH = "./public";
const ASSETS_PATH = `${DEST_PATH}/assets`;
const SRC_PATH = "./src";

gulp.task("default",[ "build" ]);

gulp.task("clean", () => {
    return gulp.src(DEST_PATH)
    .pipe(rimraf());
});

gulp.task("build", ["clean"], (cb) => {
    runSequence(
        "build-vendor",
        "build-js",
        "build-less",
        "build-html",
        cb
    );
});

gulp.task("build-vendor", () => {
    return gulp.src(["./node_modules/jquery/dist/jquery.js", "./node_modules/jquery.transit/jquery.transit.js"])
                .pipe(uglify())
                .pipe(concat("vendor.js"))
                .pipe(hash())
                .pipe(gulp.dest(ASSETS_PATH))
                .pipe(hash.manifest("manifest.json", true))
                .pipe(gulp.dest(SRC_PATH));
});

gulp.task("build-js", () => {
    return gulp.src(`${SRC_PATH}/**/*.js`)
                .pipe(babel({
                    presets: [ "es2015" ]
                }))
                .pipe(uglify())
                .pipe(hash())
                .pipe(gulp.dest(ASSETS_PATH))
                .pipe(hash.manifest("manifest.json",true))
                .pipe(gulp.dest(SRC_PATH));
});

gulp.task("build-less", () => {
    return gulp.src(`${SRC_PATH}/**/*.less`)
                .pipe(less())
                .pipe(cssMin())
                .pipe(hash())
                .pipe(gulp.dest(ASSETS_PATH))
                .pipe(hash.manifest("manifest.json", true))
                .pipe(gulp.dest(SRC_PATH));
});

gulp.task("build-html", () => {
    const manifest = gulp.src(`${SRC_PATH}/manifest.json`);

    return gulp.src(`${SRC_PATH}/index.html`)
                .pipe(revReplace({
                    manifest:manifest
                }))
                .pipe(gulp.dest(DEST_PATH));
});
