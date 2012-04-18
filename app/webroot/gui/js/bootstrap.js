require.config({
    paths: {
        jQuery: 'lib/jquery',
        Underscore: 'lib/underscore',
        Backbone: 'lib/backbone',
        BackboneRelational: 'lib/backbone-relational'
    }
});

require([
    'app',
    'order!lib/jquery-1.6.4.min',
    'order!lib/underscore-min',
    'order!lib/backbone-full',
    'order!lib/backbone-relational-full'
], function(App) {
    App.initialize();
});
