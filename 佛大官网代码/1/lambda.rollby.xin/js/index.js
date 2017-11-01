/*
* @Author: wenqian
* @Date:   2017-09-30 16:00:56
* @Last Modified by:   wenqian
* @Last Modified time: 2017-10-09 16:15:23
*/

var page = {
    init : function() {
        this.load();
        this.bindEvent();
    },
    load : function() {
        // 初始化轮播
        _carousel.init();
    },
    bindEvent : function() {
        // placeholder模拟
        $('#search-input').blur(function() {
            $(this).val('站内搜索...');
        });
        $('#search-input').focus(function() {
            $(this).val('');
        });

        // 导航栏hover事件
        $('.nav-items-list').hover(function() {
            $('.overlay').slideDown('fast');
            $('.item-children').slideDown('fast');
        }, function() {
            $('.overlay').hide();
            $('.item-children').hide();
        });

        // 轮播图上一张、下一张
        $('.opera-pre').click(function() {
            _carousel.previous();
        });
        $('.opera-next').click(function() {
            _carousel.next();
        });

        // 广告栏关闭
        $('.ad-close').click(function() {
            $('.ad-con').hide();
        });

        // 控制回到顶部按钮显示隐藏
        $(window).scroll(function() {
            if($(window).scrollTop() > 100) {
                $('.goto-top').show();
            }
            else {
                $('.goto-top').hide();
            }
        });

        // 回到顶部
        $('.goto-top').click(function() {
            $('body,html').animate({
                scrollTop: 0
            },'normal');
        });

        // 中间新闻栏，按钮变色和内容切换
        $('.news-classify-item').mouseenter(function() {
            if($(this).hasClass('no-hover')) {
                return;
            }
            $(this).addClass('active').siblings().removeClass('active');
            var className = $(this).find('i').attr('class');
            $('.news-content').hide();
            $('.' + className + '-content').show();
        });

        // 最右侧新闻栏，按钮内容切换
        $('.sh-classify-item').mouseenter(function() {
            if($(this).hasClass('active')) {
                return;
            }
            $(this).addClass('active').siblings().removeClass('active');
            var name = $(this).data('name');
            $('.sh-content').hide();
            $('.' + name + '-content').show();
        });
    }

};

// 页面加载完成后，执行init
window.onload = function() {
    page.init();
};