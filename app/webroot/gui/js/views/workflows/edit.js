define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/ui/panel/grid',
    'text!templates/workflows/edit.html',
    'text!templates/workflows/editor/place.html',
    'text!templates/common/error.html'
], function($, _, Backbone, UIGridPanel, workflowEditTemplate, workflowPlaceTemplate, errorTemplate) {

    var workflowEditView = Backbone.View.extend({
        events: {
            "click .btn.add-place": 'addPlace',
            "click .btn.add-transition": 'addTransition',
            "click .btn.add-arc": 'addArc',

            "click .place": 'editPlace'
        },

        initialize: function() {

            this.model.bind('change', this.render, this);
            this.model.places.bind('all', this.renderPlaces, this);

            this.model.fetch();
        },

        render: function() {
            var c = _.template(workflowEditTemplate, {
                workflow: this.model.toJSON()
            });

            this.el.html(c);

            this.gridView = new UIGridPanel({
                el: $('.canvas', this.el)
            });

            this.model.places.fetch({
                data: { workflow_id: this.model.id }
            });

            return this;
        },

        renderPlaces: function() {
            this.gridView.clear();

            this.model.places.each(function(place) {
                var el = this.el;
                this.gridView.addItem({
                    model: place,
                    render: function() {
                        var c = _.template(workflowPlaceTemplate, {
                            place: place,
                        });
                        this.el.append(c);
                    }
                })
            }, this);
        },

        addPlace: function() {
            this.model.places.create({
                workflow_id: this.model.id
            });
        },
        editPlace: function(event) {
            var id = $(event.target).attr('id');
            this.model.places.getById(id).destroy();
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
            return "left:"+t.x+"px;top:"+t.y+"px;";
        }
    });

    return workflowEditView;
});
