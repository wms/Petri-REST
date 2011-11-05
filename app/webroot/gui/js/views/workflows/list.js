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
            var data = {
                workflows: {}
            };
            var compiledTemplate = _.template(workflowListTemplate, data);
            this.el.append(compiledTemplate);
        }
    });

    return new workflowListView;
});
