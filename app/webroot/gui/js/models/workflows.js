define([
    'Underscore',
    'Backbone'
], function(_, Backbone) {
    var workflowsModel = Backbone.Model.extend({
        url: '/pr/workflows',
        idAttribute: '_id',
        
        parse: function(response) {
            return response.workflow;
        }
    });

    return workflowsModel;
});
