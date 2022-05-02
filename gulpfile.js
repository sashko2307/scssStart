
let project_folder = "dist";
let source_folder = "assets";

const { src, dest, watch, parallel } = require('gulp');

const sass          = require('gulp-sass')(require('sass'));
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');
const plumber       = require('gulp-plumber');;
const gcmq          = require('gulp-group-css-media-queries');
const ttf2woff2     = require('gulp-ttf2woff2')
const favicons      = require('gulp-favicons');


function browsersync() {
	browserSync.init({
        server: {
            baseDir: "assets/"
        },
		notify: false,
    });
	 /* browserSync.init({
		proxy: "streetsoupNewLayout",
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});  */
}

function styles() {
	//console.log(4)
	/* return src(["assets/scss/header.min.css", "assets/scss/main.min.css"]) */
	return src("assets/scss/main.min.css")
		//.pipe(sass({outputStyle: 'compressed'}))
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			grid: true
		}))
		.pipe(gcmq())
		.pipe(concat('main.min.css'))
		.pipe(dest('assets/css'))
		.pipe(browserSync.stream())
}

function stylesHeader() {
	console.log(8)
	/* return src("assets/sass/header.sass")
		//.pipe(sass({outputStyle: 'compressed'}))
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			grid: true
		}))
		.pipe(gcmq())
		.pipe(concat('header.min.css'))
		
		.pipe(dest('assets/css'))
		.pipe(browserSync.stream()) */
}

function scripts() {
	console.log(9)
	/* return src([
		'node_modules/jquery/dist/jquery.js',
		'assets/libs/jquery.inputmask.bundle.min.js',
		'assets/libs/lazyload/lazysizes.min.js',
		'assets/libs/slick_work/slick.min.js',
		'assets/libs/magnific-popup/jquery.magnific-popup.min.js',
		//'app/js/common.min.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(dest('assets/js'))
	.pipe(browserSync.stream()) */
}



function ttf2Woff2() {
	return src("assets/fonts/**/*.ttf")
	.pipe(ttf2woff2())
    .pipe(dest('assets/fonts/'));
}

function fav() {
	return src("assets/img/favicon/favicon.png")
	.pipe(favicons({
		appName: 'My App',
		appShortName: 'App',
		appDescription: 'This is my application',
		developerName: 'ss',
		developerURL: '/',
		background: '#020307',
		path: 'favicons/',
		url: '/',
		display: 'standalone',
		orientation: 'portrait',
		scope: '/',
		start_url: '/',
		version: 1.0,
		logging: false,
		html: 'index.html',
		pipeHTML: false,
		replace: true,
		icons: {
			appleIcon: true,
			favicons: true,
			online: false,
			appleStartup: false,
			android: true,
			firefox: false,
			yandex: false,
			windows: false,
			coast: false
		}
	  })
  )
    .pipe(dest('assets/img/favicon/'));
}

function watching() {
	watch(['assets/sass/**/*.sass'], styles)
	watch(['assets/sass/header.sass'], stylesHeader)
	//watch(['assets/js/*.js'], scripts)
	watch(['assets/*.html']).on('change', browserSync.reload)
	watch(['assets/*.php']).on('change', browserSync.reload)
}

exports.styles = styles;
exports.stylesHeader = stylesHeader;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.ttf2Woff2 = ttf2Woff2;
exports.fav = fav;

exports.default = parallel(stylesHeader, styles, scripts, browsersync, watching)
// let path = {
// 	build: {
// 		html: project_folder + "/",
// 		css: project_folder + "css/",
// 		js: project_folder + "js/",
// 		img: project_folder + "img/",
// 		fonts: project_folder + "fonts/",
// 	},
// 	assets: {
// 		html: source_folder + "/",
// 		css: source_folder + "sass/main.sass/",
// 		js: source_folder + "js/",
// 		img: source_folder + "img/**/*",
// 		fonts: source_folder + "fonts/",
// 	}
// }