define(['jquery', 'underscore', 'backbone'],function($, _, Backbone){
    var myRouter = Backbone.Router.extend({
        routes:{
            "workTime":"workTimeMain"
        },

        workTimeMain : function(){
            console.info("good");
            require(["workTime/view/workTimeMain"],function(View){
                var view = new View();
                view.render();
            });
        }
    });
});