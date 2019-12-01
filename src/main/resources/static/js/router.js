define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "workTime": "workTimeMain",
            "starlight": "starlight",
            "home": "home"
        }
    });

    var initialize = function () {
        var appRouter = new AppRouter;

        appRouter.on('route:workTimeMain', function () {
            require(["workTime/view/workTimeMain"], function (View) {
                var view = new View();
                view.render();
            });
        });

        appRouter.on('route:starlight', function () {
            console.log('starlight');
        });

        appRouter.on('route:home', function () {
            console.log('home');
            require(["workTime/view/home"], function (View) {
                console.log('home');
                var view = new View();
                view.render();
            });
        });


        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});