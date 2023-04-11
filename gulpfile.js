// // Gulp should be of 4.0.2 version
// const gulp = require("gulp");

// // Install sass library require like this
// const sass = require("gulp-sass")(require("sass"));

// const cssnano = require("gulp-cssnano");

// // rev should be of 9.0.0 version
// const rev = require("gulp-rev");

// // Uglify es should be of 1.0.4
// const uglify = require("gulp-uglify-es").default;

// const path = require('path')
// // Imagemin should be of 6.0.0
// const imagemin = require("gulp-imagemin");

// // del should be of 4.1.1
// const del = require("del");

// gulp.task("css", function (done) {
//   console.log("minifing css...");
//   gulp
//     .src("./assets/scss/**/*.scss")
//     .pipe(sass())
//     .pipe(cssnano())
//     .pipe(gulp.dest("./assets/css"));

//   gulp
//     .src("./assets/**/*.css")
//     .pipe(rev())
//     .pipe(gulp.dest("./public/assets"))
//     .pipe(
//       rev.manifest({
//         cwd: "public",
//         merge: true,
//       })
//     )
//     .pipe(gulp.dest("./public/assets"));
//   done();
// });

// gulp.task("js", function (done) {
//   console.log("minifying js...");
//  gulp
//     .src(path.join(__dirname, "/assets/**/*.js"))
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest("./public/assets"))
//     .pipe(
//       rev.manifest({
//         cwd: "public",
//         merge: true,
//       })
//     )
//     .pipe(gulp.dest("./public/assets"));
//   done();
// });

// gulp.task("images", function (done) {
//   console.log("compressing images...");
//   gulp
//     .src(path.join(__dirname, "/assets/**/*.+(png|jpg|gif|svg|jpeg)"))
//     .pipe(imagemin())
//     .pipe(rev())
//     .pipe(gulp.dest("./public/assets"))
//     .pipe(
//       rev.manifest({
//         cwd: "public",
//         merge: true,
//       })
//     )
//     .pipe(gulp.dest("./public/assets"));
//   done();
// });

// gulp.task("clean:assets", function (done) {
//   del.sync("./public/assets");
//   done();
// });

// gulp.task(
//   "build",
//   gulp.series("clean:assets", "css", "js", "images"),
//   function (done) {
//     console.log("Building assets");
//     done();
//   }
// );


const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');


gulp.task('css',function(done){
    console.log('minifying css...');
    //** means any folder and every subfolder inside it and *.scss means every file with .scss
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets')) //write rev'd assets to build dir
    .pipe(rev.manifest({
        base : './public/assets',
        merge : true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

gulp.task('js',function(done){
    console.log('minifying js...');

    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets')) //write rev'd assets to build dir
    .pipe(rev.manifest({
        base : './public/assets',
        merge : true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('images',function(done){
    console.log('compressing images...');

    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets')) //write rev'd assets to build dir
    .pipe(rev.manifest({
        base : './public/assets',
        merge : true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('clean:assets',function(done){

    del.sync('./public/assets');
    del.sync("./rev-manifest.json");
    done();
});

gulp.task('build',gulp.series('clean:assets','css','js','images'),function(done){
    console.log('Building assets');
    done();
})