define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'router'
], function($, _, Backbone, Router){
    var initialize = function(){
        console.debug('App.initialize');
        console.debug(Router);
        Router.initialize();
    }

    return { 
        initialize: initialize
    };
});
