define([
    'jquery',
    'underscore',
    'backbone',
    'text!observer/templates/home.html',
    'mustache'
], function ($, _, Backbone, template, mustache) {

    var View = Backbone.View.extend({

        el: '#content',

        events: {},

        initialize: function () {
        },

        render: function () {
            this.$el.html(mustache.render(template));

            this.scrollBoxEvent();
            this.observerEvent();
        },

        scrollBoxEvent: function () {
            //todo view event 등록시 스크롤은 영역 지정이 안됨
            var self = this;
            $("div.old").scroll(function () {
                if (self.$el.find('#scrollEnd').is(':visible')) {
                    self.scrollAdd()
                }
            });
        },

        observerEvent: function () {
            var self = this;
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.intersectionRatio > 0) {
                        self.observerAdd();
                    }
                });
            });

            var box = document.getElementById('observerEnd')
            io.observe(box);
        },

        scrollAdd: function () {
            if ($('div.box').length > 100) {
                return;
            }
            $('#scrollEnd').before("<div class='box'></div>");
        },

        observerAdd: function () {
            if ($('div.box').length > 100) {
                return;
            }
            $('#observerEnd').before("<div class='box'></div>");
        },
    });

    return View;
});


//http://blog.hyeyoonjung.com/2019/01/09/intersectionobserver-tutorial/?utm_source=gaerae.com&utm_campaign=%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%8A%A4%EB%9F%BD%EB%8B%A4&utm_medium=social&fbclid=IwAR3XkhV7nugYzzPaY2NbGm23SWb8PXiMM46dJ_Okx1M1rWnkG59sR8CjQ38
//https://tech.lezhin.com/2017/07/13/intersectionobserver-overview

// var io = new IntersectionObserver(function(entries){
//     entries.forEach(function(entry){
//         if(entry.intersectionRatio > 0){
//             _this.listMore();
//         }
//     });
// });

// var box = document.getElementById('moreButton');
// io.observe(box);
//

// 올드 코드
//
// $(window).unbind('scroll.board');
// $(window).bind('scroll.board', function (ev) {
//     //console.log('scroll');
//     d_height = $(document).height();
//     w_height = $(window).height();
//     s_height = d_height - w_height;
//     d_top = $(document).scrollTop();
//     if ((s_height - d_top) < 2) {
//         if(_this.$el.find('div.bottom_action').is(':visible')){
//             _this.listMore();
//         }
//     }
// });