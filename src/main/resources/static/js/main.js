require.config({
    paths: {
        'jquery': '../webjars/jquery/3.4.1/dist/jquery.min',
        'backbone': '../webjars/backbone/1.4.0/backbone-min',
        'underscore': '../webjars/underscore/1.9.1/underscore-min',
        'mustache': '../webjars/mustache/2.3.2/mustache.min',
        'text': '../webjars/requirejs-plugins/1.0.3/lib/text',
        'moment': "/webjars/momentjs/2.24.0/min/moment.min"
    },

    shim: {
        'mustache': {
            exports: 'Mustache'
        },
        'moment': {
            exports: 'Moment'
        }
    }
});

require([
    'app',
], function (App) {
    App.initialize();
});