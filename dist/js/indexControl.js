// 获取当前data的索引，
(function ($, root) {
    function Control(len) {
        this.index = 0;
        this.len = len;
    }
    Control.prototype = {
        prev: function () {
            // if (this.index == 0) {
            //     this.index = len - 1;
            // } else {
            //     this.index--;
            // }
            // return this.index;
            return this.getIndex(-1);
        },
        next: function () {
            // if (this.index == len - 1) {
            //     this.index = 0;
            // } else {
            //     this.index++;
            // }
            // return this.index;
            return this.getIndex(1);
        },
        getIndex: function (val) {// 计算改变后索引，简化，
            // 当前对应索引
            var index = this.index;
            // 数据总长度
            var len = this.len;
            // 改变后的索引
            var curIndex = (index + val + len) % len;
            // 改变后的索引 赋值 给当前的
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controlIndex = Control; // 暴露构造函数

}(window.Zepto, window.player || (window.player = {})))