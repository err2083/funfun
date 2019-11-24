define(['jquery', 'underscore', 'backbone'],function($, _, Backbone){
    var Model = Backbone.Model.extend({
        urlRoot : function(){
            return /working/ + id;
        }
    });
});