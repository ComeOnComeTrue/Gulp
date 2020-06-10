// 渲染 列表歌曲
(function ($, root) {
    var prevHtml = '';
    function renderList(info) {
        $(".list-song").remove();
        prevHtml = ''
        var index = 1;
        let itemList = info.filter(ele => ele.isLike == true);
        len = itemList.length;
        for (var i = 0; i < len; i++) {
            var html = `<li class="list-song" data-index="${index}">
                            <div class="list-index">${index}</div>
                            <div class="list-info">
                                <p>${itemList[i].song}</p>
                                <p>${itemList[i].singer}</p>
                            </div>
                            <div class="list-del" dataIndex="${index}" songName="${itemList[i].song}">删除</div>
                        </li>`
            prevHtml = prevHtml + html;
            index++;
        }
        $(".list-box").append(prevHtml);
    }
    // 删除歌曲
    function delSong(dataList, songName) {
        for (let i = 0; i < dataList.length; i++) {
            if(dataList[i].song == songName){
                dataList[i].isLike = false;
            } 
        }
        $('.list-song').each((index, ele) => {
            // 对应的歌曲名和点击删除的歌曲名相等时，就移除
            if(ele.children[1].children[0].innerText === songName) { 
                $('.list-song').eq(index).remove();
            }
        })
    }

    root.list = {
        renderList,
        delSong,
    }


}(window.Zepto, window.player || (window.player = {})));

