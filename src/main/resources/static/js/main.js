define(['jquery', 'underscore', 'backbone'],function($, _, Backbone){

    var Router = require('route');

    var myRouter = new Router();

    $('#goWorking').click(function(){
        myRouter.navigate('workTime',{trigger:true});
        return false;
    });
});

var myRouter = new myRouter();
Backbone.history.start();