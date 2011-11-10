define([
    'jQuery', 
    'Underscore', 
    'Backbone',
    'router'
], function($, _, Backbone, Router){
    var error = {
        modal: function(message, error) {
            var error = error || {}
            if(typeof(error) == 'string') {
                error = JSON.parse(error);
            }

            if(error.info)  {
                if(error.info.type) {
                    message += ':\n\n' + error.info.type;
                }
                if(error.info.message) {
                    message += '\n' + error.info.message;
                }
            }

            if(error.error) {
                message += ':\n\n';
                _.each(error.error, function(el) {
                    message += el + '\n';
                });
            }

            alert(message);
        }
    };
    
    var initialize = function(){
        App = {};
        App.Error = error;
        console.debug('App.initialize');
        Router.initialize();
    }

    return { 
        initialize: initialize
    };
});
