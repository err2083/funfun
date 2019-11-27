define([
    'jquery',
    'underscore',
    'backbone'
    ],function($, _, Backbone){

    var Model = Backbone.Model.extend({

        initialize : function(option){
            this.id = option.id;
        },

        url : function(){
            return /working/ + this.id;
        }
    });

    return Model;
});