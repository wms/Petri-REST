require.config({
    paths: {
        jQuery: 'lib/jquery',
        Underscore: 'lib/underscore',
        Backbone: 'lib/backbone',
    }
});

require([
    'app',
    'order!lib/jquery-1.7.2',
    'order!lib/bootstrap-dropdown',
    'order!lib/underscore-min',
    'order!lib/backbone-full',
], function(App) {
    App.initialize();
});
