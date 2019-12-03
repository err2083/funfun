define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!workTime/templates/workTimeMain.html',
    'workTime/view/workList',
], function ($, _, Backbone, mustache, template, WorkTimeList) {

    var View = Backbone.View.extend({

        el: '#content',

        events: {},

        initialize: function () {
        },

        render: function () {
            this.$el.html(mustache.render(template.toString()));
            this.renderList();
        },

        renderList: function () {
            var workTimeList = new WorkTimeList();
            workTimeList.render();
        },
    });

    return View;
});