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
            "click #add":"addModel"
        },

        render : function () {
            this.$el.html(mustache.render(template));
        },

        addModel : function(e){
            console.info(e);
        }
    });

    return View;
});