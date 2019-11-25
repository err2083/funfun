define([
    'jquery',
    'underscore',
    'backbone',
    'workTime/model/working'
    ], function($, _, Backbone, Model){

    var Collection = Backbone.Collection.extend({
        model: Model,
        url: '/working/listAll'
    });

    return Collection;
});