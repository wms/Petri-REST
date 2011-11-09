define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'router'
], function($, _, Backbone, Router){
    var initialize = function(){
        App = {};
        console.debug('App.initialize');
        Router.initialize();
    }

    return { 
        initialize: initialize
    };
});
