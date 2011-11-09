define([
    'jQuery',
    'Underscore',
    'Backbone',
    'models/workflows'
], function($, _, Backbone, workflowsModel) {
    var workflowsCollection = Backbone.Collection.extend({
        model: workflowsModel,
        url: '/pr/workflows',
        principal: 'workflows',

        initialize: function() {
            var originalSync = Backbone.sync;

            Backbone.sync = function(method, model, options) {
                var success = options.success;
                var self = this;

                if(self.principal) {
                    var setPrincipal = function(data, method, response) {
                        data = data[self.principal];
                        response.responseText = JSON.stringify(data)
                        success(data, method, response);
                    }

                    options.success = setPrincipal;
                }

                var syncResult = originalSync.apply(Backbone, arguments);
                return syncResult;
            };
        }
    });

    return workflowsCollection;
})
