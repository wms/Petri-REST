define([
    'Underscore',
    'Backbone'
], function(_, Backbone) {
    var workflowsModel = Backbone.Model.extend({
        url: '/pr/workflows',
        idAttribute: '_id'
    });

    return workflowsModel;
});
