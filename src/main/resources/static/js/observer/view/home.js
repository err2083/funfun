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
            this.imgIndex = 3;
        },

        render: function () {
            this.$el.html(mustache.render(template));

            this.appendImg();

            this.scrollBoxEvent();
            this.observerEvent();
            //this.imgObserver();
        },

        appendImg: function () {
            var i;
            for (i = 3; i < 1044; i++) {
                //$('#imgBox').append('<img data-src="img/redvelvet_seulgiimg' + i + '.jpg" class="img" width="400" height="400">');
                $('#imgBox').append('<img src="img/redvelvet_seulgiimg' + i + '.jpg" class="img" width="400" height="400">');
            }
        },

        scrollBoxEvent: function () {
            //todo view event 등록시 스크롤은 영역 지정이 안됨
            var self = this;
            $("div.old").scroll(function () {
                if (self.isScrollDown()) {
                    self.scrollAdd()
                }
            });
        },

        observerEvent: function () {
            var self = this;
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        self.observerAdd();
                    }
                });
            }, {
                threshold : 1
            });

            var box = document.getElementById('observerEnd');
            io.observe(box);
        },

        scrollAdd: function () {
            $('#scrollEnd').before("<div class='box'></div>");
        },

        observerAdd: function () {
            $('#observerEnd').before("<div class='box'></div>");
        },

        isScrollDown : function(){
            var scrollTop = $('.old').scrollTop();
            var clientH = document.getElementById('scrollBox').clientHeight;
            console.info("scroll Evt");
            if(clientH - scrollTop < 400){
                return true;
            }
            return false;
        },

        imgObserver : function () {
            var io = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.src = entry.target.dataset.src;
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold : 0
            });

            var img = document.querySelectorAll('.img');
            img.forEach(function(el){
                io.observe(el);
            });
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
//
// var box = document.getElementById('moreButton');
// io.observe(box);


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

// var io = new IntersectionObserver(function (entries, observer) {
//     entries.forEach(function (entry) {
//         console.info(entry.rootBounds); // root 정보
//         console.info(entry.target); // 타겟 정보
//         console.info(entry.boundingClientRect); // 타겟 영역 정보
//         console.info(entry.intersectionRect); // 교차된 영역의 정보
//         console.info(entry.intersectionRatio); // 교차된 영역의 비율
//         console.info(entry.isIntersecting); // 교차 유무
//         console.info(entry.time); // 교차된 시간
//     })
// }, {
//     root : null, // 교차영역의 기준이 될 dom 설정
//     rootMargin : '0px 0px 0px 0px', // root el 의 마진값
//     threshold : 0 // 교차 영역의 비율 0~1
// });
// var targetEl;
// io.observe(targetEl); // target 에 대한 관찰 시작
// io.unobserve(targetEl); // target 에 대한 관찰 중지
// io.disconnect(); // 모든 관찰 중지
// io.takeRecords(); // 객체의 배열 리턴