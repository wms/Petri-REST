define([
    'jQuery',
    'Underscore',
    'Backbone',
    'models/workflows'
], function($, _, Backbone, workflowsModel) {
    var workflowsCollection = Backbone.Collection.extend({
        model: workflowsModel
    });

    return new workflowsCollection;
})
