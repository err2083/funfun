define([
    'jquery',
    'underscore',
    'backbone',
    'workTime/templates/workList.html',
    'workTime/collection/working'
], function ($, _, Backbone, Template, WorkingCollection) {

    var View = Backbone.View.extend({

        initialize : function(){
        },

        render : function () {
            this.collection = new WorkingCollection();
            this.collection.fetch();

            $('workTimeList').append(new Template(JSON.stringify(this.collection)));
        },
    });

    return View;
});