// 信息+图片渲染到页面上 render
// 点击按钮
// 音频的播放与暂停 切歌
// 进度条运动与拖拽
// 图片旋转
// 列表切歌

var root = window.player; // window上创建player对象
var nowIndex = 0;
var dataList; // 用于接受数据，
var len; // 数据长度
var control; // 用于接收构造函数
var timer;
var audio = root.audioManager; // 接收构造出的对象
var duration = 0;
var imgTimer = null;

// 获取数据
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            console.log(data);
            dataList = data; // data存到全局
            len = data.length;
            control = new root.controlIndex(len);// 得到改变后的索引
            root.render(data[0]); // 默认渲染第一个
            root.pro.renderAllTime(data[0].duration);//渲染总时间
            root.list.renderList(data); // 渲染列表
            duration = data[0].duration; // 总时间
            audio.getAudio(data[0].audio); // 得到音频的src
            listEvent();
            bindEvent();
            bindTouchEvent();
        },
        error: function () {
            console.log('error');
        }
    })
}
// click 事件
function bindEvent() {
    // 自定义事件 优化 上或下播放 共同的封装在一起 切歌
    $('body').on('play:change', function (e, index) {
        audio.getAudio(dataList[index].audio); // 上一首的音频src
        root.render(dataList[index]);
        root.pro.renderAllTime(dataList[index].duration);//渲染总时间
        duration = dataList[index].duration;
        if (audio.status == "play") { // 播放暂停
            rotated(0);
            audio.play();
            root.pro.start();
            // 切换下一首时 从0开始转
            $('.img-box').attr('data-deg', 0);
            $('.img-box').css({
                'transform': ' rotateZ(0deg)',
                'transition': 'none'
            })
        } else {
            root.pro.update(0);
        }
    });
    // 上一首 操作
    $('.prev').on('click', function () {

        var i = control.prev();// 当前data的索引
        // audio.getAudio(dataList[i].audio); // 上一首的音频src
        // root.render(dataList[i]);
        // if(audio.status == "play") { // 播放暂停
        //     audio.play();
        // }
        $('body').trigger('play:change', i);
    });
    // 下一首 操作
    $('.next').on('click', function () {

        var i = control.next();// 当前data的索引
        // audio.getAudio(dataList[i].audio); // 下一首的音频src
        // root.render(dataList[i]);
        // if(audio.status == "play") { // 播放暂停
        //     audio.play();
        // }
        $('body').trigger('play:change', i);
    });
    //  播放状态 操作
    $('.play').on('click', function () {
        if (audio.status == "pause") {
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        } else {
            audio.pause();
            root.pro.stop();
            cancelAnimationFrame(imgTimer);
        }
        console.log(audio.status)
        $('.play').toggleClass('playing');
    });
}
// 列表事件操作
function listEvent() {
    var y = $('.list-wrapper').offset().height;
    $('.list-wrapper').css({
        bottom: -y + 'px',
        transition: 'bottom 1s ',
    });
    // list 操作
    $('.list').on('click', function (e) {
        $('.list-wrapper').css({
            bottom: 0,
        });
    });
    $('.list-header').on('click', function (e) {
        $('.list-wrapper').css({
            bottom: -y + 'px',
        });
    });
    // 列表中的每一首歌曲都添加点击事件
    $('.list-box').each(function (index, ele) {
        $(ele).on('click', function () {
            root.render(dataList[index]); // 渲染
            root.pro.renderAllTime(dataList[index].duration);//渲染总时间
            audio.getAudio(dataList[index].audio);// 渲染音频
            root.pro.stop(); // 清除之前的动画帧
            audio.play();
            $('.play').addClass('playing');
            root.pro.start(0); // 时间开始转动，并且从零开始
            rotated(0); // 图片转动
            $('.list-wrapper').css({
                bottom: -y + 'px',
            });
        })
    })
}

// 移动端进度条事件操作
function bindTouchEvent() {
    var left = $('.pro-bottom').offset().left; // 距离左侧
    var width = $('.pro-bottom').offset().width;
    $('.slider').on('touchstart', function (e) { // 按下
        root.pro.stop();

    }).on('touchmove', function (e) { // 移动
        var x = e.changedTouches[0].clientX - left; //当前移动的距离-》 距离页面视口左侧 - pro-bottom距离视口左侧
        var per = x / width;
        if (per >= 0 && per < 1) { // 0 - 100% 之间执行
            root.pro.update(per);
        }

    }).on('touchend', function (e) {
            var x = e.changedTouches[0].clientX - left; //当前移动的距离-》 距离页面视口左侧 - pro-bottom距离视口左侧
            var per = x / width; // 距离百分比
            var curTime = per * duration;
            if (per >= 0 && per < 1) { // 0 - 100% 之间执行
                audio.playTo(curTime); // 跳转音乐时间，
                audio.play(); // 开始播放
                var deg = $('.img-box').attr('data-deg');
                rotated(deg); // 转动图片
                root.pro.start(per); // 继续播放时间
                $('.play').addClass('playing'); // 改变播放按钮状态
            }
    })
}
// 播放完了自动下一首,播放结束事件
$(audio.audio).on('ended', function () {
    $('.next').trigger('click');
});

// 图片旋转
function rotated(deg) {
    cancelAnimationFrame(imgTimer); 
    // var deg = 0;
    deg = +deg;
    function timer() { 
        deg += 0.1;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            'transform': ' rotateZ(' + deg + 'deg)',
            'transition': 'all 1s ease-out'
        })
    imgTimer = requestAnimationFrame(timer); // 页面重绘触发，动画帧
    };
    timer();
}

getData('../mock/data.json');

