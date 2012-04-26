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
                success: function(collection, response) {
                    $('form', self.$el)[0].reset();
                },
                error: function(collection, response) {
                    App.Error.modal('Could not create Workflow', response.responseText);
                }
            });
        },

        render: function() {
            var compiledTemplate = _.template(workflowCreateTemplate);
            this.$el.html(compiledTemplate);
        }
    });

    return workflowCreateView;
});
