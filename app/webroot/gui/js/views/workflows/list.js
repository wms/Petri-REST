define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/workflows',
    'text!templates/workflows/list.html',
    'text!templates/common/error.html'
], function($, _, Backbone, workflowsCollection, workflowListTemplate, errorTemplate) {
    var workflowListView = Backbone.View.extend({
        el: $('#main'),

        render: function() {
            var self = this;
            workflowsCollection.fetch({
                success: function(workflows) {
                    var compiledTemplate = _.template(workflowListTemplate);
                    self.el.prepend(compiledTemplate({
                        workflows: workflows,
                        _: _
                    }));
                },
                error: function(workflows, error) {
                    foo = error;
                    var c = _.template(errorTemplate, JSON.parse(error.responseText));
                    self.el.prepend(c);

                    return false;
                }
            });
        }
    });

    return new workflowListView;
});
