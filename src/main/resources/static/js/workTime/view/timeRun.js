define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!workTime/templates/timeRun.html'
], function ($, _, Backbone, mustache, template) {

    var View = Backbone.View.extend({

        el: '#timeRun',

        initialize: function (model) {
            this.model = model;

            //todo model 변경으로 뷰를 를 다시 그려야하는건지 확인
            this.listenTo(this.model, 'change', function () {
                this.$el.html(mustache.render(template, {result: this.model.getDataToJson()}));
            });
        },

        events: {},

        render: function () {
            var self = this;

            //timer 가 run 중 다른 모델 클릭시 기존 타이머를 멈춤
            if (window.timer) {
                clearInterval(window.timer);
            }

            this.model.settingData();
            this.$el.html(mustache.render(template, {result: this.model.getDataToJson()}));

            //todo $변수를 재평가 해서 dom 에 아직 추가되지않는 상태라
            //jquery 동작하지않는다고한다.. 먼소리인지 모르겠다.
            // var $endTime = self.$el.find('#endTime');
            // var $restTime = self.$el.find('#restTime');

            //todo window 객체가 아닌 전역객체로 설정하기
            //todo 다중 if 제거하는 방안 찾아보기
            window.timer = setInterval(function () {
                self.model.set('localTime', self.model.localTime.add(1, 'seconds'));
                if (self.model.isWeekend()) {
                    self.$el.find('#endTime').text('오늘은 휴일 입니다.');
                    self.$el.find('#restTime').text('24시간이 모자라');
                    clearInterval(window.timer);
                } else if (self.model.isWorkTime()) {
                    self.model.set('workSec', self.model.get('workSec') + 1);
                } else if (self.model.isRestTime()) {
                    self.model.set('restSec', self.model.get('restSec') + 1);
                } else if (self.model.isAfterWorkTime()) {
                    self.$el.find('#endTime').text('오늘 하루 수고하셨습니다.');
                    clearInterval(window.timer);
                } else if (self.model.isBeforeWorkTime()) {
                    self.$el.find('#endTime').text('출근 전 입니다.');
                    clearInterval(window.timer);
                } else {
                    self.$el.find('#endTime').text('오류입니다.');
                    clearInterval(window.timer);
                }
            }, 1000);
        },
    });

    return View;
});