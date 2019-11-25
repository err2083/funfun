define([
    'jquery',
    'underscore',
    'backbone',
    'text!workTime/templates/workTimeMain.html',
    'workTime/view/workList'
], function ($, _, Backbone, template, WorkTimeList) {

    var View = Backbone.View.extend({

        el:'#content',

        initialize : function(){
        },

        render : function () {
            this.$el.html(template);
            this.renderList();
        },

        renderList : function () {
            var workTimeList = new WorkTimeList();
            workTimeList.render();
        }
    });

    return View;
});