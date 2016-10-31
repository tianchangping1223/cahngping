var gulp=require('gulp');
var fs=require('fs');
var connect=require('gulp-connect');//启服务器
var respond=require('gulp-respond');//启服务器
var clean=require('gulp-clean');
//压缩css
var minifyCss=require('gulp-minify-html');//压缩css
var concat=require('gulp-concat');//链接
var rev=require('gulp-rev');//加密
//压缩js
var ngAnnotate = require('gulp-ng-annotate');
var ngMin = require('gulp-ngmin');
var uglify = require('gulp-uglify');


//用压缩css
gulp.task('miniCss',function(){
	//gulp.src(['src/css/index.css','src/css/index1.css','src/css/indexN.css'])
	gulp.src('src/css/*.css')//路径
		.pipe(minifyCss())//压缩
		.pipe(concat("all.min.css"))//合并成...名
		.pipe(rev())//加密
		.pipe(gulp.dest('src/css/build'))//输出css，自动创建build
		.pipe(rev.manifest('miniCss.json'))//创建json
		.pipe(gulp.dest('./src/data'))//输出json
})
//压缩js
gulp.task('miniJS',function(){
	return gulp.src(['src/js/app.js','src/js/config.js','src/js/controller.js','src/js/directive.js','src/js/api.service.js'])
	/*return gulp.src('src/js/*.js')*/
				.pipe(ngAnnotate())//压缩angularJs必备
				.pipe(ngMin())//压缩angularJs必备
				.pipe(uglify())//压缩
				.pipe(concat('all.min.js'))//合并
				.pipe(rev())//加密
				.pipe(gulp.dest('src/js/min'))//输出js路径
				.pipe(rev.manifest('miniJS.json'))//输出json
				.pipe(gulp.dest('./src/data'))//输出json路径

})	
//启服务器
gulp.task('connect',function(){
	return connect.server({
		root:['src','bower_components'],
		port:3221,
		livereload:true,

		middleware:function(){
			return [function(req,res,next){
				//console.log("开始操作");
				next();
			},function(req,res){
				var path=req.url.split('?').shift();
				path=path=='/'?'/enter.html':path;
				url='src'+path;
				if(!fs.existsSync(url)){
					url='bower_components'+path;
				}
				//console.log(url)
				gulp.src(url)
					.pipe(respond(res))

			}];
		}
	})
})
gulp.task('server',['miniCss','miniJS','connect'])