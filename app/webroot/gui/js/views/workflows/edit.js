define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/ui/panel/grid',
    'views/ui/panel/floating',
    'text!templates/workflows/edit.html',
    'text!templates/workflows/editor/place.html',
    'text!templates/workflows/editor/place/edit.html',
    'text!templates/workflows/editor/transition.html',
    'text!templates/workflows/editor/transition/edit.html',
    'text!templates/common/error.html',
    'lib/inflection'
], function(
    $, _, Backbone,
    UIGridPanel, UIFloatingPanel, 
    workflowEditTemplate,
    workflowPlaceTemplate,
    placeEditFormTemplate,
    workflowTransitionTemplate,
    transitionEditFormTemplate,
    errorTemplate
) {
    var workflowEditView = Backbone.View.extend({
        events: {
            "click .btn.add-place": 'addPlace',
            "click .btn.add-transition": 'addTransition',
            "click .btn.add-arc": 'addArc',
        },

        initialize: function() {
            this.render();

            var editPlace = function() {
                var placeEditWindow = new UIFloatingPanel({
                    el: $('<div>').appendTo(this.grid.$el),
                    orientation: 'right'
                });
                if(placeEditWindow) {
                    this.grid.showOverlay();
                    var self = this;

                    var editPlaceForm = new PlaceEditForm({
                        el: placeEditWindow.el,
                        model: self.model,
                        cancel: function() {
                            self.grid.hideOverlay();
                            placeEditWindow.remove();
                        },
                        onSave: function() {
                            self.grid.hideOverlay();
                            placeEditWindow.remove();
                        }
                    });
                }
            }
            var editTransition = function() {
                var transitionEditWindow = new UIFloatingPanel({
                    el: $('<div>').appendTo(this.grid.$el),
                    orientation: 'right'
                });
                if(transitionEditWindow) {
                    this.grid.showOverlay();
                    var self = this;

                    var editTransitionForm = new TransitionEditForm({
                        el: transitionEditWindow.el,
                        model: self.model,
                        cancel: function() {
                            self.grid.hideOverlay();
                            transitionEditWindow.remove();
                        },
                        onSave: function() {
                            self.grid.hideOverlay();
                            transitionEditWindow.remove();
                        }
                    });
                }
            }

            this.gridView = new UIGridPanel({
                el: $('.canvas', this.$el),
                items: {
                    place: {
                        collection: this.model.places,
                        options: {
                            menu: {
                                wrench: {
                                    label: 'Edit',
                                    handler: editPlace
                                },
                                move: {
                                    label: 'Move',
                                    handler: 'move'
                                },
                                remove: {
                                    label: 'Delete',
                                    handler: 'destroy'
                                }
                            },
                            render: function() {
                                this.$el.html(_.template(workflowPlaceTemplate, {
                                    place: this.model
                                }));
                                return this;
                            }
                        }
                    },
                    transition: {
                        collection: this.model.transitions,
                        options: {
                            menu: {
                                wrench: {
                                    label: 'Edit',
                                    handler: editTransition
                                },
                                move: {
                                    label: 'Move',
                                    handler: 'move'
                                },
                                remove: {
                                    label: 'Delete',
                                    handler: 'destroy'
                                }
                            },
                            render: function() {
                                this.$el.html(_.template(workflowTransitionTemplate, {
                                    transition: this.model
                                }));
                                return this;
                            }
                        }
                    },
                    arc: {
                        collection: this.model.arcs,
                        options: {
                            render: function() {
                                var x1 = this.model.get('input').get('position').x * 64 + 32,
                                    y1 = this.model.get('input').get('position').y * 64 + 32,
                                    x2 = this.model.get('output').get('position').x * 64 + 32,
                                    y2 = this.model.get('output').get('position').y * 64 + 32;

                                var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
                                var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                                var transform = 'rotate('+angle+'deg)';

                                this.$el
                                    .addClass('line')
                                    .css({
                                        '-moz-transform': transform,
                                        '-webkit-transform': transform,
                                        'top': y1,
                                        'left': x1,
                                        'width': length
                                    })
                            }
                        }
                    }
                }
            });

            this.model.bind('change reset', this.render, this);
            this.model.places.on('change', function() {
                this.model.arcs.trigger('change')
            }, this);
            this.model.transitions.on('change', function() {
                this.model.arcs.trigger('change')
            }, this);
            this.model.fetch({children: true});
        },

        render: function() {
            var c = _.template(workflowEditTemplate, {
                workflow: this.model
            });

            this.$el.html(c);

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
            var data = {},
                self = this;

            var setInput = function() {
                self.gridView.allItems(function() {
                    this.delegateEvents({
                        'click': setOutput
                    });
                });
                var type = this.$el.parent().attr('class');
                data['input'] = {};
                data['input'][type] = this.model;
            }
            var setOutput = function() {
                self.gridView.allItems(function() {
                    this.delegateEvents();
                });

                var type = this.$el.parent().attr('class');
                data['output'] = {};
                data['output'][type] = this.model;

                self.model.arcs.create(data);
            }

            this.gridView.allItems(function() {
                this.delegateEvents({
                    'click': setInput
                });
            });
        },
    });

    // @todo: refactor
    var PlaceEditForm = Backbone.View.extend({
        events: {
            "submit form": 'save',
            "click .btn.cancel": 'cancel',
            "click .btn.delete": 'destroy'
        },
        initialize: function(options) {
            this.cancel = options.cancel || function() {};
            this.onSave = options.onSave || function() {};

            this.setElement($('<div />')
                .appendTo(this.$el)
                .addClass('place-edit-form')
            );

            this.delegateEvents();
            this.render();
        },
        render: function() {
            var c = _.template(placeEditFormTemplate, {
                place: this.model.attributes
            });
            this.$el.html(c); 
            return this;
        },
        save: function(event) {
            var self = this;

            this.model.save({
                name: this.$('[name=name]').val()
            }, {
                success: function() {
                    self.onSave();
                    self.remove();
                },
                error: function(collection, response) {
                    App.Error.modal("Could not save Place", response.responseText);
                }
            });

            event.preventDefault();
            return false;
        },
        destroy: function() {
            this.model.destroy();
            self.remove();
        },
        cancel: function() {
            return this;
        }
    });

    var TransitionEditForm = Backbone.View.extend({
        events: {
            "submit form": 'save',
            "click .btn.cancel": 'cancel',
            "click .btn.delete": 'destroy'
        },
        initialize: function(options) {
            this.cancel = options.cancel || function() {};
            this.onSave = options.onSave || function() {};

            this.$el = $('<div />')
                .appendTo(this.$el)
                .addClass('transition-edit-form');

            this.delegateEvents();
            this.render();
        },
        render: function() {
            var c = _.template(transitionEditFormTemplate, {
                transition: this.model.attributes
            });
            this.$el.html(c); 
            return this;
        },
        save: function(event) {
            var self = this;

            this.model.save({
                name: this.$('[name=name]').val()
            }, {
                success: function() {
                    self.onSave();
                    self.remove();
                },
                error: function(collection, response) {
                    App.Error.modal("Could not save Transition", response.responseText);
                }
            });

            event.preventDefault();
            return false;
        },
        destroy: function() {
            this.model.destroy();
            self.remove();
        },
        cancel: function() {
            return this;
        }
    });

    return workflowEditView;
});
