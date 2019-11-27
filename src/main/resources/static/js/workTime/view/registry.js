define([
    'jquery',
    'underscore',
    'backbone',
    'text!workTime/templates/registry.html',
    'mustache'
], function ($, _, Backbone, template, mustache) {

    var View = Backbone.View.extend({

        el:'#registry',

        initialize : function(){
        },

        events: {

        },

        render : function () {
            this.$el.html(mustache.render(template));
        },
    });

    return View;
});