// 进度条 操作
(function ($, root) {

    var duration = 0;
    var frameId = null;
    var startTime = 0;
    var lastPst = 0;

    // 渲染总时间 渲染两侧时间 进度条运动
    function renderAllTime(time) {
        duration = time;
        time = formatTime (time);
        lastPst = 0; // 切歌时上一次时间 初始化
        $('.all-time').html(time); // 渲染总时间
    }

    // 格式化： 将秒转换成分
    function formatTime (t) {
        t = Math.round(t); // 四舍五入 取整
        // t为总时间
        var m = Math.floor(t / 60); // 分
        var s = t - m * 60; // 当前秒数
        // 小于两位数加0
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        return m + ':' + s;
    }
    // 左侧实时时间
    function start (p) {
        lastPst = p === undefined ? lastPst : p; // 判断有没有时间
        // 当前点击播放的时间戳
        startTime = new Date().getTime(); // 获取当前时间
        cancelAnimationFrame(frameId);
        function frame () {
            var curTime = new Date().getTime();
            // 上一次时间 + 进行的时间 / （总时间-》毫秒转换秒） = 当前进行时间百分比
            var per = lastPst + (curTime - startTime) / (duration * 1000);
            update(per); 
            frameId = requestAnimationFrame(frame);//定时帧，渲染
        }
        frame();
    }

    // 更新dom当前时间 + 更新进度条
    function update(per) {
        var curTime = per * duration; // 当前时间
        curTime = formatTime (curTime);
        $('.cur-time').html(curTime);
        var translateX = (per - 1) * 100 + '%';// -0.9901 * 100 
        $('.pro-top').css({
            transform : 'translateX('+ translateX +')',
        });
    }

    // 停止之后进行的操作时间
    // 0 >> 3 lastPst = 3  
    //  3 >> 8 lastPst = 5  
    function stop () {
        cancelAnimationFrame(frameId);
        var curTime = new Date().getTime();
        var per = (curTime - startTime) / (duration * 1000); // 进行的时间
        lastPst += per; // 点击停止之后 上一次时间 加上 这次进行的时间
    }

    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        update: update,
    }


}(window.Zepto, window.player || (window.player = {})))