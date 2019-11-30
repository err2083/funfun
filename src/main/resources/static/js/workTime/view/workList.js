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
            var $target = $(event.currentTarget);
            var id = $target.find(".workId").text();
            var data = this.collection.findJsonById(id);

            var timeRun = new TimeRun(data);
            timeRun.render();
        },
    });

    return View;
});