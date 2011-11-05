define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/workflows/create.html'
], function($, _, Backbone, workflowCreateTemplate) {
    var workflowCreateView = Backbone.View.extend({
        el: $('#main'),

        render: function() {
            var data = {
                workflow: {}
            };
            var compiledTemplate = _.template(workflowCreateTemplate, data);
            this.el.append(compiledTemplate);
        }
    });

    return new workflowCreateView;
});
