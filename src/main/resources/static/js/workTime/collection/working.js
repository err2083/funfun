define([
    'jquery',
    'underscore',
    'backbone',
    'workTime/model/working'
    ], function($, _, Backbone, Model){

    var Collection = Backbone.Collection.extend({
        model: Model,
        url: '/working/listAll',

        findJsonById : function(id) {
            var ret;
            this.models.forEach(function(model){
                if(model.attributes.id == id){
                    ret = model.attributes;
                    return true;
                }
            });
            return ret;
        }
    });

    return Collection;
});