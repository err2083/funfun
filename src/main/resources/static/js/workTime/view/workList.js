define([
    'jquery',
    'underscore',
    'backbone',
    'text!workTime/templates/workList.html',
    'workTime/collection/working',
    'mustache'
], function ($, _, Backbone, template, WorkingCollection, mustache) {

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
            var id = $target.find(".workId").text();

            var data = this.collection.findJsonById(id);

            var $result = this.$el.find('#result');

            var perMoney = data.minuteIncreaseMoney / 60;
            //todo
            var now = 0;
            this.burning = setInterval(function(){
                now = perMoney + now;
                $result.html("<p>"+now+"</p>");
            },1000);
        }
    });

    return View;
});