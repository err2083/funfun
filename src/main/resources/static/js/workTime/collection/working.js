define(['jQuery','underscore','backbone'], function($, _, Backbone){
    var Model =  require('workTime/model/working');

    var Collection = Backbone.Collection.extend({
        model: new Model(),
        url: '/working/listAll'
    });
});