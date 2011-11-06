define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/workflows',
    'text!templates/workflows/list.html'
], function($, _, Backbone, workflowsCollection, workflowListTemplate) {
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
                }
            });
        }
    });

    return new workflowListView;
});
