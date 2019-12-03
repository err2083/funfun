define([
    'jquery',
    'underscore',
    'backbone',
    'workTime/model/working'
], function ($, _, Backbone, Model) {

    var Collection = Backbone.Collection.extend({
        model: Model,
        url: '/working/collection',

        findById: function (id) {
            var ret = undefined;
            this.models.forEach(function (model) {
                if (model.get('id') == id) {
                    ret = model;
                    return true;
                }
            });
            return ret;
        }
    });

    return Collection;
});