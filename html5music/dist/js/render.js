
// 实现页面渲染 img + info + like-btn
(function ($, root) {
    var $scope = $(document.body);
    //渲染当前这首歌的图片
    function renderImg(src) {
        var img = new Image();
        img.onload = function () {
            root.blurImg(img, $scope); //模糊图片插件
            $scope.find(".song-img img").attr("src", src);
        }
        img.src = src;
    }
    // 动态添加歌手信息
    function renderInfo(info) {
        var html = '<div class="song-name">' + info.song + '</div>' +
            '<div class="singer-name">' + info.singer + '</div>' +
            '<div class="album-name">' + info.album + '</div>';
        $scope.find(".song-info").html(html);
    }

    function renderIsLike(like) { // 爱心，为true显示，否则不显示
        if (like) {
            $('.like').addClass('liking');
        } else {
            $('.like').removeClass('liking');
        }
    }
    
    root.render = function (data) { // 暴露出去
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }
}(window.Zepto, window.player || (window.player = {})));