define([
    'jQuery',
    'Underscore',
    'Backbone',
    'models/workflows',
    'text!templates/workflows/create.html',
    'text!templates/common/error.html'
], function($, _, Backbone, workflowsModel, workflowCreateTemplate, errorTemplate) {
    var workflowCreateView = Backbone.View.extend({
        events: {
            'submit form': 'save'
        },

        save: function(event) {
            var self = this;
            event.preventDefault();
            return this.collection.create({
                name: this.$('[name=name]').val()
            }, {
                success: function(workflow) {
                    $('form', self.el)[0].reset();
                },
                error: function(workflow, error) {
                    var c = _.template(errorTemplate, JSON.parse(error.responseText));
                    self.el.html(c);
                }
            });
        },

        render: function() {
            var data = {
                workflow: {}
            };
            var compiledTemplate = _.template(workflowCreateTemplate, data);
            this.el.html(compiledTemplate);
        }
    });

    return workflowCreateView;
});
