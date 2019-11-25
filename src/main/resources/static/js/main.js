require.config({
    paths:{
        'jquery':'../webjars/jquery/3.4.1/dist/jquery.min',
        'backbone':'../webjars/backbone/1.4.0/backbone-min',
        'underscore':'../webjars/underscore/1.9.1/underscore-min'
    }
});

require([
    'app',
], function(App){
    App.initialize();
});