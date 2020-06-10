var gulp = require("gulp");
const { src, dest, watch, series, parallel } = require('gulp') //series串行 parallel并行

//压缩 html 插件
var htmlClean = require("gulp-htmlclean");
//压缩 img 插件
var imageMin = require("gulp-imagemin");
// 压缩 js 插件
var uglify = require("gulp-uglify");
// 去掉js中的调试语句
var stripDebug = require("gulp-strip-debug");

// 将less转换成css
var less = require("gulp-less");
// 压缩css
var cleanCss = require("gulp-clean-css");
// 添加前缀 gulp-postcss autoprefixer
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

// 开启服务器
var connect = require("gulp-connect");

// 判断当前环境变量
var devMod = process.env.NODE_ENV == "development";
// export NODE_ENV=development  设置环境变量 开发环境


var folder = {
    src: "src/",
    dist: "dist/",
}

// html
gulp.task('html', function () {
    return src(folder.src + "html/*")   // 入口
        .pipe(connect.reload())    // 重新刷新浏览器
        // .pipe(htmlClean())  // 压缩
        .pipe(dest(folder.dist + "html/"))  // 出口 生成静态文件
})
// img
gulp.task('img', function () {
    return src(folder.src + "images/*")
        // .pipe(imageMin())  // 压缩
        .pipe(dest(folder.dist + "images/"))
});
// css
gulp.task('css', function () {
    return src(folder.src + "css/*")
        .pipe(connect.reload())    // 重新刷新浏览器
        .pipe(less())  // 转换
        .pipe(postCss([autoprefixer()])) // 添加前缀 
        // .pipe(cleanCss())  // 压缩
        .pipe(dest(folder.dist + "css/"))
});
// js
gulp.task('js', function () {
    return src(folder.src + "js/*")
        .pipe(connect.reload())    // 重新刷新浏览器
        // .pipe(stripDebug()) // 去掉js中的调试语句
        // .pipe(uglify())  // 压缩
        .pipe(dest(folder.dist + "js/"))
});
//  开启服务器
gulp.task('startServer', function () {
    connect.server({ // 开启
        port: "8899", // 改端口号
        livereload: true,  // 自动刷新页面
    })
    // root: './src/',
});

// 在命令行使用 gulp watch 启动此任务
gulp.task('watch', function () {
    // 监听文件修改，当文件被修改则执行 html 任务
    watch(folder.src + "html/*", series('html')); // gulp4.0任务统一使用回调函数，不再支持 ['html'] 这种形式
    watch(folder.src + "css/*", series('css'));
    watch(folder.src + "js/*", series('js'));
})

// 开启default任务，管理其他任务
gulp.task('default', series(parallel('startServer', 'watch', 'html', 'css', 'js', 'img')))

// gulp.src(); 路径
// gulp.dest(); 写入
// gulp.pipe(); 管道 
// gulp.task(); 创建
// gulp.series：按照顺序执行
// gulp.paralle：可以并行计算
