requirejs.config({
    baseUrl: 'js',
    paths:{
        'jquery':'../webjars/jquery/3.4.1/dist/jquery.min.js',
        'backbone':'../webjars/backbone/1.4.0/backbone-min.js',
        'underscore':'../webjars/underscore/1.9.1/underscore-min.js'
    }
});

var myRouter = Backbone.Router.extend({
    routes:{
        "workTime":"workTimeMain"
    },

    workTimeMain : function(){
        require(["workTime/view/workTimeMain"],function(){
        });
    }
})

var myRouter = new myRouter();
myRouter.history.start();