define(['jquery'], function ($) {

    var template = require('workTime/templates/workTimeMain.html');
    var workTimeList = require('workTime/view/workList');
    var workingCollection = require('workTime/collection/working');

    var View = Backbone.View.extend({

        el:'#content',

        initialize : function(){
            this.model = new workingCollection();
        },

        render : function () {
            this.$el.html(template);
            this.renderList();
        },

        renderList : function () {
            //this.model.fetch();
        }
    });
});