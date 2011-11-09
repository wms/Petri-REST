define([
    'jQuery',
    'Underscore',
    'Backbone',
    'models/workflows'
], function($, _, Backbone, workflowsModel) {
    var workflowsCollection = Backbone.Collection.extend({
        model: workflowsModel,
        url: '/pr/workflows',

        parse: function(response) {
            return response.workflows;
        }
    });

    return workflowsCollection;
})
