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

        initialize : function(data){
            this.data = data;
            this.model = new Working(data);
        },

        events: {

        },

        render : function () {
            this.model.off();
            clearInterval(this.burning);

            this.model.on({
                "change:" : this.calculateEndTime,
                "change:" : this.calculateRestTime
            })
            this.model.settingData();

            this.$el.html(mustache.render(template, {result : this.model.getDataToJson()}));
            console.info(this.model);
            console.info(this.model.getDataToJson());

            var self = this;
            var $burningMoney = self.$el.find('#burningMoney');
            var $endTime = self.$el.find('#endTime');
            var $restTime = self.$el.find('#restTime');

            this.burning = setInterval(function () {
                if(self.model.isWeekend()){
                    $endTime.html('오늘은 휴일 입니다.');
                    clearInterval(self.burning);
                }
                else if (self.model.isWorkTime()) {

                } else if (self.model.isRestTime()) {

                } else if (self.model.isAfterWorkTime()) {
                    $endTime.html('오늘 하루 수고하셨습니다.');
                    clearInterval(self.burning);
                } else if (self.model.isBeforeWorkTime()) {
                    $endTime.html('출근 전 입니다.');
                } else {
                    $endTime.html('오류입니다.');
                    clearInterval(self.burning);
                }
            }, 1000);
        },

        calculateEndTime : function(){

        },

        calculateRestTime : function(){

        }
    });

    return View;
});