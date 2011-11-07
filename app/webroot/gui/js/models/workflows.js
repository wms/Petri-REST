define([
    'Underscore',
    'Backbone'
], function(_, Backbone) {
    var workflowsModel = Backbone.Model.extend({
        url: '/pr/workflows'
    });

    return workflowsModel;
});
