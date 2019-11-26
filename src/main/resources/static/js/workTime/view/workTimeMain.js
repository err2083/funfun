define([
    'jquery',
    'underscore',
    'backbone',
    'text!workTime/templates/workTimeMain.html',
    'workTime/view/workList',
    'mustache'
], function ($, _, Backbone, template, WorkTimeList, mustache) {

    var View = Backbone.View.extend({

        el:'#content',

        initialize : function(){
            console.log('mustache exists:', mustache !== undefined);
        },

        render : function () {
            this.$el.html(mustache.render(template.toString()));
            this.renderList();
        },

        renderList : function () {
            var workTimeList = new WorkTimeList();
            workTimeList.render();
        }
    });

    return View;
});