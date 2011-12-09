define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/workflows/edit.html',
    'text!templates/workflows/editor/place.html',
    'text!templates/common/error.html'
], function($, _, Backbone, workflowEditTemplate, workflowPlaceTemplate, errorTemplate) {

    var workflowEditView = Backbone.View.extend({
        events: {
            "click .btn.add-place": 'addPlace',
            "click .btn.add-transition": 'addTransition',
            "click .btn.add-arc": 'addArc',
        },

        occupied: [],

        initialize: function() {
            this.model.bind('change', this.render, this);
            this.model.fetch();

            this.model.places.bind('all', this.renderWorkflow, this);
            this.model.places.fetch({
                data: { workflow_id: this.model.id }
            });
        },

        render: function() {
            var c = _.template(workflowEditTemplate, {
                workflow: this.model.toJSON()
            });

            this.el.html(c);

            return this;
        },

        renderWorkflow: function() {
            var $canvas = $('.canvas', this.el)
                .empty();
            this.occupied.length = 0;

            this.model.places.each(function(place) {
                var c = _.template(workflowPlaceTemplate, {
                    place: place,
                    position: this.getPosition(place)
                });
                $('.canvas', this.el).append(c);
            }, this);
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
        },
        // @todo: refactor into a GridLayout view
        getPosition: function(place) {
            var position = place.position ? place.position : {x: 0, y: 0};

            _.each(this.occupied, function(p) {
                if(p.x == position.x) {
                    position.x++;
                }            
            }, position);

            this.occupied.push(position);

            // Transform grid co-ordinates to pixels
            var t = {
                x: position.x * 64 + 32,
                y: 350 - position.y * 64 - 32
            };
            foo = this.occupied;
            bar = this.position;

            return "left:"+t.x+"px;top:"+t.y+"px;";
        }
    });

    return workflowEditView;
});
