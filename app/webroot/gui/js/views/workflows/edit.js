define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/workflows/edit.html',
    'text!templates/common/error.html'
], function($, _, Backbone, workflowEditTemplate, errorTemplate) {

    var workflowEditView = Backbone.View.extend({
        events: {
            "click .btn.add-place": 'addPlace',
            "click .btn.add-transition": 'addTransition',
            "click .btn.add-arc": 'addArc',
        },

        initialize: function() {
            this.model.fetch();
            this.model.bind('change', this.render, this);
        },

        render: function() {
            var c = _.template(workflowEditTemplate, {
                workflow: this.model.toJSON()
            });
            this.el.html(c);

            return this;
        },

        addPlace: function() {
            this.model.places.create({
                workflow_id: this.model.id
            });
        },
        addTransition: function() {
            this.model.transitions.create({
                workflow_id: this.model.id
            });
        },
        addArc: function() {
            this.model.arcs.create({
                workflow_id: this.model.id
            });
        }
    });

    return workflowEditView;
});
