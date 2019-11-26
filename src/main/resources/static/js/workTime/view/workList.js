define([
    'jquery',
    'underscore',
    'backbone',
    'text!workTime/templates/workList.html',
    'workTime/collection/working',
    'mustache'
], function ($, _, Backbone, template, WorkingCollection, mustache) {

    var View = Backbone.View.extend({

        initialize : function(){
        },

        render : function () {
            this.collection = new WorkingCollection();
            this.collection.fetch();

            //todo not working collection.foreach

            $('#workTimeList').append(mustache.render(template,{}));
        },
    });

    return View;
});