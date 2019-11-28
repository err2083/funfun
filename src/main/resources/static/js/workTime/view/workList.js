define([
    'jquery',
    'underscore',
    'backbone',
    'text!workTime/templates/workList.html',
    'workTime/collection/working',
    'mustache',
    'text!workTime/templates/run.html',
], function ($, _, Backbone, template, WorkingCollection, mustache, runTemplate) {

    var View = Backbone.View.extend({

        el:'#workTimeList',

        initialize : function(){
            this.collection = new WorkingCollection();
        },

        events: {
            "click .workTarget": "run"
        },

        render : function () {
            this.collection.fetch({
                success : function(models){
                    $('#workTimeList').append(mustache.render(template,{workTime:models.toJSON()}));
                }
            });
        },

        run : function(event){
            clearInterval(this.burning);

            var $target = $(event.currentTarget);
            var $result = this.$el.find('#result');

            var id = $target.find(".workId").text();
            var data = this.collection.findJsonById(id);

            console.info(data);

            $result.html(mustache.render(runTemplate, {result:data}));

            data.now = data.minuteIncreaseMoney * data.todayWorkingModel.workAndRestMinuteModel.workMinute;
            data.perMoney = data.minuteIncreaseMoney / 60;

            var $burningMoney = $result.find('#burningMoney');
            var $endTime = $result.find('#endTime');
            var $restTime = $result.find('#restTime');

            var workSec = data.todayWorkingModel.workAndRestMinuteModel.workMinute * 60;
            var restSec = data.todayWorkingModel.workAndRestMinuteModel.restMinute * 60;

            this.burning = setInterval(function(){
                if(true){
                    data.now = data.perMoney + data.now;
                    $burningMoney.html(data.now);
                    workSec = workSec - 1;
                    $endTime.html(workSec);
                } else if(true){
                    restSec = restSec - 1;
                    $restTime.html(restSec);
                } else{
                    $endTime.html('오늘 하루 수고하셨습니다.');
                    clearInterval(this);
                }
            },1000);
        },
    });

    return View;
});