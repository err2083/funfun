define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
], function ($, _, Backbone) {

    var View = Backbone.View.extend({

        el:'#content',

        events: {

        },

        initialize : function(){

        },

        render : function () {
            this.$el.html('home');
        },
    });

    return View;
});