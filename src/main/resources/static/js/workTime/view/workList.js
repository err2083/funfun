define([
    'jquery',
    'underscore',
    'backbone',
    'text!workTime/templates/workList.html',
    'workTime/collection/working',
    'mustache',
    'workTime/view/timeRun'
], function ($, _, Backbone, template, WorkingCollection, mustache, TimeRun) {

    var View = Backbone.View.extend({

        el:'#workTimeList',

        initialize : function(){
            this.collection = new WorkingCollection();
        },

        events: {
            "click .workTarget": "timeRun"
        },

        render : function () {
            this.collection.fetch({
                success : function(models){
                    $('#workTimeList').append(mustache.render(template,{workTime:models.toJSON()}));
                }
            });
        },

        timeRun : function(event){
            //todo 단일 모델만 서버에서 다시 받아서 계산하는 방법 찾아보기 -중요도높음
            this.undelegateEvents();
            this.delegateEvents({"click .workTarget":"popup"});

            var $target = $(event.currentTarget);
            var id = $target.find(".workId").text();
            var data = this.collection.findJsonById(id);

            var timeRun = new TimeRun(data);
            timeRun.render();
        },

        popup : function(){
            //모델이 동작중인 상황에 다른 모델을 누르면 시간 동기화가 안됨 대체방안-클릭막음
            //todo 팝업이 뜨는 동안 Interval 이벤트가 동작하지 않음
            alert("다른 타이머가 동작중입니다. 다시 실행시켜주세요");
        }
    });

    return View;
});