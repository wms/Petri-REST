define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/ui/panel/grid',
    'views/ui/panel/floating',
    'text!templates/workflows/edit.html',
    'text!templates/workflows/editor/place.html',
    'text!templates/workflows/editor/place/edit.html',
    'text!templates/common/error.html'
], function($, _, Backbone, UIGridPanel, UIFloatingPanel, workflowEditTemplate, workflowPlaceTemplate, placeEditFormTemplate, errorTemplate) {

    var workflowEditView = Backbone.View.extend({
        events: {
            "click .btn.add-place": 'addPlace',
            "click .btn.add-transition": 'addTransition',
            "click .btn.add-arc": 'addArc',
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
            var grid = this.gridView
                .clear();

            this.model.places.each(function(place) {
                var el = this.el;
                grid.addItem({
                    model: place,
                    events: {
                        "click": 'editPlace'
                    },
                    render: function() {
                        var c = _.template(workflowPlaceTemplate, {
                            place: place,
                        });
                        this.el.append(c);
                    },
                    editPlace: function() {
                        var placeEditWindow = new UIFloatingPanel({
                            el: grid.el,
                            orientation: 'right'
                        });
                        if(placeEditWindow) {
                            grid.disableItemEvents();
                            var editPlaceForm = new PlaceEditForm({
                                el: placeEditWindow.el,
                                model: this.model,
                                cancel: function() {
                                    grid.enableItemEvents();
                                    placeEditWindow.remove();
                                }
                            });
                        }
                    }
                });
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
    });

    var PlaceEditForm = Backbone.View.extend({
        events: {
            "click .btn.cancel": 'cancel',
            "click .btn.delete": 'destroy'
        },
        initialize: function(options) {
            this.cancel = options.cancel || function() {};

            this.el = $('<div />')
                .appendTo(this.el)
                .addClass('place-edit-form');

            this.delegateEvents();
            this.render();
        },
        render: function() {
            var c = _.template(placeEditFormTemplate);
            this.el.html(c); 
            return this;
        },
        destroy: function() {
            this.model.destroy();
            return this;
        },
        cancel: function() {
            return this;
        }
    });

    return workflowEditView;
});
