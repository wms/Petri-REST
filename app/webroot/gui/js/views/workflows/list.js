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

        render: function(success) {
            var self = this;
            workflowsCollection.fetch({
                success: function(data) {
                    var compiledTemplate = _.template(workflowListTemplate);
                    self.el.html(compiledTemplate({
                        data: data.toJSON()[0],
                        _: _
                    }));
                    success();
                },
                error: function(workflows, error) {
                    var c = _.template(errorTemplate, JSON.parse(error.responseText));
                    self.el.html(c);
                }
            });
            return this;
        }
    });

    return new workflowListView;
});
