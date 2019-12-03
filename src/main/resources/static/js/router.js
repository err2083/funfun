define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "workTime": "workTimeMain",
            "observer": "observer",
            "home": "home",
            "registry": "registry"
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

        appRouter.on('route:observer', function () {
            require(["observer/view/home"], function (View) {
                var view = new View();
                view.render();
            });
        });

        //todo home 디렉토리 workTime 에서 변경하기
        appRouter.on('route:home', function () {
            require(["workTime/view/home"], function (View) {
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