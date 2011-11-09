define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/workflows',
    'views/workflows/list',
    'views/workflows/create'
], function($, _, Backbone, workflowsCollection, workflowListView, workflowCreateView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'defaultAction'
        },
        defaultAction: function(actions){
            var collection = new workflowsCollection;

            var $listEl = $('<div />').appendTo('#main');
            var $createEl = $('<div />').appendTo('#main');

            var listView = new workflowListView({
                collection: collection,
                el: $listEl
            });

            var createView = new workflowCreateView({
                collection: collection,
                el: $createEl
            })

            listView.render(function() {
                createView.render();
            });
        }
    });

    var initialize = function(){
        var app_router = new AppRouter;
        // Create a router in the global App if possible
        if(App) {
            App.Router = app_router;
        }
        Backbone.history.start();
    };
    return { 
        initialize: initialize
    };
});
