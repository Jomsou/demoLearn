/*
* @Author: wenqian
* @Date:   2017-10-02 01:01:32
* @Last Modified by:   wenqian
* @Last Modified time: 2017-10-04 10:45:30
*/

/* 轮播 */
var _carousel = {
    option : {
        // ulWidth根据pageSize计算
        imageWidth : 1020,
        pageSize : 5, // 最少/默认5张
        isDelay : false,
        DelayTimeOut : 2000,
        ulWidth : 0
    },
    init : function() {
        this.setCarouselWidth();
    },
    // 设置轮播区域宽度
    setCarouselWidth : function() {
        this.option.ulWidth = this.option.imageWidth * (this.option.pageSize + 2);
        // 这里先写死class，以后扩展再进行修改
        $('.carousel-list').width(this.option.ulWidth);
    },
    // 下一张
    next : function() {
        var _this = this;
        // 防止重复点击
        this.setStatus('.opera-next',false);
        $('.carousel-list').animate({left:"-1020px"}, 600, function() {
            $('.carousel-list').children().first().appendTo('.carousel-list');
            $('.carousel-list').css('left','0');  
            _this.setStatus('.opera-next',true);
        });
    },
    // 上一张
    previous : function() {
        var _this = this,
            index = this.option.pageSize;
        // 防止重复点击
        this.setStatus('.opera-next',false);
        $('.carousel-list').animate({left:"1020px"}, 600, function() {
            $('.carousel-list').children().last().prependTo('.carousel-list');  
            $('.carousel-list').css('left','0');  
            _this.setStatus('.opera-next',true);
        });
    },
    setStatus : function(ele, st) {
        $(ele).attr('disabled', !st);
    }
};