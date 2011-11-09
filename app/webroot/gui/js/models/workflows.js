define([
    'Underscore',
    'Backbone'
], function(_, Backbone) {
    var workflowsModel = Backbone.Model.extend({
        url: '/pr/workflows',
        idAttribute: '_id',
        
        parse: function(response) {
            return response.workflow;
        },

        disable: function() {
            return this.save({
                enabled: false
            });
        },

        enable: function() {
            return this.save({
                enabled: true
            });
        }
    });

    return workflowsModel;
});
