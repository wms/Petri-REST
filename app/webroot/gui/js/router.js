define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/workflows',
    'views/workflows/list',
    'views/workflows/create',
    'views/ui/panel'
], function($, _, Backbone, workflowsCollection, workflowListView, workflowCreateView, UIPanel){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'defaultAction'
        },
        defaultAction: function(actions){
            $('#main').empty();

            var collection = new workflowsCollection;

            var panel = new UIPanel({
                el: $('#main'),
                title: 'Defined Workflows',
                containers: 2
            });

            var listView = new workflowListView({
                collection: collection,
                el: panel.containers[0],
            });

            var createView = new workflowCreateView({
                collection: collection,
                el: panel.containers[1]
            })

            listView.render();
            createView.render();
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
