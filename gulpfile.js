var gulp = require("gulp");
var stylus = require("gulp-stylus");
var browserSync = require("browser-sync");
var autoprefixer = require("gulp-autoprefixer");
var minify = require("gulp-minify-css");
var concat = require('gulp-concat');
var spritesmith = require("gulp.spritesmith")

gulp.task("stylus", function() {
    gulp.src("./src/stylus/**/*.styl")
            .pipe(stylus())
            .pipe(autoprefixer())
            .pipe(minify())
            .pipe(concat("style.css"))
            .pipe(gulp.dest("./build/css"))
            .pipe(browserSync.reload({
                stream: true
             }))
});

gulp.task("img", function() {
	gulp.src("./src/images/*")
		.pipe(gulp.dest("./build/images"))
		.pipe(browserSync.reload({
			stream: true
		 }))
})

gulp.task("sprite", function() {
	var spriteData = gulp.src("./src/images/sprites/*")
		.pipe(spritesmith({
			imgName: "sprite.png",
			cssName: "sprite.styl",
			cssFormat: "less",
			algorithm: 'binary-tree',
			cssTemplate: 'stylus.template.mustache',
			padding: 10,
			cssVarMap: function(sprite) {
				sprite.name = 's-' + sprite.name
			}
		}))
		spriteData.img.pipe(gulp.dest('./src/images'))
		spriteData.css.pipe(gulp.dest('./src/stylus'))
})

gulp.task("html", function() {
	gulp.src("src/index.html")
		.pipe(gulp.dest("./build"))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task("fonts", function() {
	gulp.src("src/fonts/*")
		.pipe(gulp.dest("./build/fonts"))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task("js", function() {
	gulp.src("src/js/*")
		.pipe(gulp.dest("./build/js"))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task("browserSync", function(){
	browserSync({
		server: {
			baseDir: "build"
		}
	})
})


gulp.task("watch", ["browserSync", "sprite", "img", "html", "stylus", "fonts", "js"], function() {
	gulp.watch("./src/stylus/**/*.styl", ["stylus"])
	gulp.watch("src/index.html", ["html"])
	gulp.watch("src/fonts/*", ["fonts"])
	gulp.watch("src/images/sprites/*", ["sprite"])
	gulp.watch("src/images/*", ["img"])
  gulp.watch("src/js/*", ["js"])
})