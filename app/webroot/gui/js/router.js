define([
    'jQuery',
    'Underscore',
    'Backbone',
    'models/workflows',
    'collections/workflows',
    'views/workflows/list',
    'views/workflows/create',
    'views/workflows/edit',
    'views/ui/panel'
], function($, _, Backbone, workflowsModel, workflowsCollection, workflowListView, workflowCreateView, workflowEditView, UIPanel){
    var $canvas = $('#main');

    var AppRouter = Backbone.Router.extend({
        routes: {
            'edit/:id': 'edit',
            '*actions': 'index'
        },
        edit: function(id) {
            $canvas.empty();

            var workflow = new workflowsModel({
                _id: id,
                fetchChildren: true
            });

            var panel = new UIPanel({
                el: $canvas,
                title: 'Workflow Editor',
                containers: 1
            });

            var editor = new workflowEditView({
                model: workflow,
                el: panel.containers[0]
            });
        },
        index: function(actions){
            $canvas.empty();

            var collection = new workflowsCollection;

            var panel = new UIPanel({
                el: $canvas,
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
