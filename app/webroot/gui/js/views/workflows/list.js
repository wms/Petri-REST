define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/workflows/list.html',
    'text!templates/common/error.html'
], function($, _, Backbone, workflowListTemplate, errorTemplate) {
    var workflowListView = Backbone.View.extend({
        initialize: function() {
            this.collection.bind('add', this.render, this);
        },

        render: function(success) {
            var self = this;
            this.collection.fetch({
                success: function(data) {
                    var compiledTemplate = _.template(workflowListTemplate);
                    self.el.html(compiledTemplate({
                        workflows: data.toJSON(),
                        _: _
                    }));
                    if(typeof(success) == 'function') {
                        success();
                    }
                },
                error: function(workflows, error) {
                    var c = _.template(errorTemplate, JSON.parse(error.responseText));
                    self.el.html(c);
                }
            });
            return this;
        }
    });

    return workflowListView;
});
