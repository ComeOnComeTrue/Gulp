// 渲染 列表歌曲
(function ($, root) {
    var index = 1;
    var prevHtml = '';
    function renderList(info) {
        len = info.length;
        for (var i = 0; i < len; i++) {
            var html = prevHtml + '<div class="list-box" data-index="'+ index +'">\
            <div class="list-index">'+ index + '</div>\
            <div class="list-info">\
                <p>'+ info[i].song + '</p>\
                <p>'+ info[i].singer + '</p>\
            </div>\
            <div class="list-del">删除</div>\
        </div>'
        index ++;
        prevHtml = html;    
        }
        $(".list-wrapper").append(html);
    }
    // 删除歌曲
    function delSong () {

    }

    root.list = {
        renderList: renderList,
    }


}(window.Zepto, window.player || (window.player = {})));

