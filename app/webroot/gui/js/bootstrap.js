require.config({
    paths: {
        jQuery: 'lib/jquery',
        Underscore: 'lib/underscore',
        Backbone: 'lib/backbone'
    }
});

require([
    'app',
    'order!lib/jquery-1.6.4.min',
    'order!lib/underscore-min',
    'order!lib/backbone-full'
], function(App) {
    App.initialize();
});
