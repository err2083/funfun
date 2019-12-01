define([
    'jquery',
    'underscore',
    'backbone',
    'text!workTime/templates/workTimeMain.html',
    'workTime/view/workList',
    'mustache',
    'workTime/view/registry'
], function ($, _, Backbone, template, WorkTimeList, mustache, Registry) {

    var View = Backbone.View.extend({

        el:'#content',

        events: {
            'click #workTimeRegister': "OpenRegister",
            'click #workTimeRegister.open': "CloseRegister"
        },

        initialize : function(){
        },

        render : function () {
            this.$el.html(mustache.render(template.toString()));
            this.renderList();
        },

        renderList : function () {
            var workTimeList = new WorkTimeList();
            workTimeList.render();
        },

        OpenRegister : function(){
            var $button = this.$el.find('#workTimeRegister');
            $button.html('Register close');
            $button.addClass('open');

            var registry = new Registry();
            registry.render();
        },

        CloseRegister: function () {
            var $button = this.$el.find('#workTimeRegister');
            $button.html('Register open');
            $button.removeClass('open');
            this.$el.find('#registry').html('');
        }
    });

    return View;
});