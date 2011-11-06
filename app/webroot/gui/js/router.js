define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/workflows/list',
    'views/workflows/create'
], function($, _, Backbone, workflowListView, workflowCreateView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            '/workflows': 'showWorkflows',
            // Default
            '*actions': 'defaultAction'
        },
        showWorkflows: function(){
            workflowListView.render();
        },
        defaultAction: function(actions){
            // We have no matching route, lets just log what the URL was
            if(workflowListView.render()) {
                workflowCreateView.render();
            };
            //console.log('No route:', actions);
        }
    });

    var initialize = function(){
        var app_router = new AppRouter;
        Backbone.history.start();
    };
    return { 
        initialize: initialize
    };
});
