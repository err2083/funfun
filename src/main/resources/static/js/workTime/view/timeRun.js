define([
    'jquery',
    'underscore',
    'backbone',
    'text!workTime/templates/timeRun.html',
    'mustache',
    'workTime/model/working',
    'moment'
], function ($, _, Backbone, template, mustache, Working, moment) {

    var View = Backbone.View.extend({

        el:'#timeRun',

        initialize : function(model){
            this.model = model;

            //todo model 변경으로 뷰를 를 다시 그려야하는건지 확인
            this.listenTo(this.model, 'change', function(){
                this.$el.html(mustache.render(template, {result : this.model.getDataToJson()}));
            });
        },

        events: {

        },

        render : function () {
            var self = this;

            if(window.timer){
                clearInterval(window.timer);
            }

            this.model.settingData();

            this.$el.html(mustache.render(template, {result : this.model.getDataToJson()}));

            var $endTime = self.$el.find('#endTime');
            var $restTime = self.$el.find('#restTime');

            //todo window객체가 아닌 전역객체로 설정하기
            window.timer = setInterval(function () {
                if(self.model.isWeekend()){
                    $endTime.html('오늘은 휴일 입니다.');
                    $restTime.html('24시간이 모자라');
                    clearInterval(window.timer);
                }
                else if (self.model.isWorkTime()) {
                    self.model.set('workSec',self.model.get('workSec') + 1);
                } else if (self.model.isRestTime()) {
                    self.model.set('restSec',self.model.get('restSec') + 1);
                } else if (self.model.isAfterWorkTime()) {
                    $endTime.html('오늘 하루 수고하셨습니다.');
                    clearInterval(window.timer);
                } else if (self.model.isBeforeWorkTime()) {
                    $endTime.html('출근 전 입니다.');
                    clearInterval(window.timer);
                } else {
                    $endTime.html('오류입니다.');
                    clearInterval(window.timer);
                }
            }, 1000);
        },
    });

    return View;
});