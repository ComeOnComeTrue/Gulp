// 播放play 暂停pause 播放音乐getAudio
(function ($, root) {

    function AudioManager() {
        // 创建 音频对象
        this.audio = new Audio();
        // this.src = src;
        // audio 默认状态
        this.status = 'pause';
    }

    AudioManager.prototype = {
        play: function () {
            this.audio.play(); // 音频播放函数
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();// 音频暂停函数
            this.status = 'pause';
        },
        getAudio: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        playTo: function (time) { // 跳转到的当前时间
            this.audio.currentTime = time; // currentTime可以获取到当前时间
        }
    }

    root.audioManager = new AudioManager();


}(window.Zepto, window.player || (window.player = {})))