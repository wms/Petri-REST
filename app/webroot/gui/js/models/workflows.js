define([
    'jQuery',
    'Underscore',
    'Backbone',
    'models/place',
    'collections/places',
    'collections/transitions',
    'collections/arcs',
], function($, _, Backbone, placeModel, placesCollection, transitionsCollection, arcsCollection) {
    var workflowsModel = Backbone.Model.extend({
        urlRoot: '/pr/workflows',
        idAttribute: '_id',

        initialize: function(options) {
            this.places = new placesCollection();
            this.transitions = new transitionsCollection();
            this.arcs = new arcsCollection();

            this.places.url      = '/pr/workflows/' + this.id + '/places';
            this.transitions.url = '/pr/workflows/' + this.id + '/transitions';
            this.arcs.url        = '/pr/workflows/' + this.id + '/arcs';

            var self = this;
            var getTerminals = function(attribute) {
                if(attribute == 'input') {
                    var key = _.first(
                        _.keys(this.attributes.input)
                    );
                    var type = key.match(/(.*)_id$/)[1];

                    return self[type + 's'].get(this.attributes.input[key]);
                }
                if(attribute == 'output') {
                    var key = _.first(
                        _.keys(this.attributes.output)
                    );
                    var type = key.match(/(.*)_id$/)[1];

                    return self[type + 's'].get(this.attributes.output[key]);
                }
                return Backbone.Model.prototype.get.call(this, attribute);
            }

            this.arcs.on('reset', function() {
                this.arcs.each(function(arc) {
                    arc.get = getTerminals
                });
            }, this);
            this.arcs.on('add', function(arc) {
                arc.get = getTerminals
            });

            _.bindAll(this, 'prepare_revert', 'revert');
            this.prepare_revert();
        },
        
        parse: function(response) {
            if(response.workflow) {
                return response.workflow;
            }
            return response;
        },

        disable: function(options) {
            return this.save({
                enabled: false
            }, options);
        },

        enable: function(options) {
            return this.save({
                enabled: true
            }, options);
        },

        save: function(attributes, options) {
            var self = this;
            var options = options || {};
            var error = options.error;
            this.prepare_revert();

            options.error = function(model, response) {
                self.trigger("save:error", self);
                if(error) {
                    error(self, response)
                }
                self.revert();
            }
            this.trigger('save', this);

            result = Backbone.Model.prototype.save.call(this, attributes, options);
            return result;
        },

        fetch: function(options) {
            var self = this;

            result = Backbone.Model.prototype.fetch.call(this, {
                silent: true,
                success: function() {
                    if(options.children) {
                        $.when(
                            $.when(
                                self.places.fetch(),
                                self.transitions.fetch()
                            ).done(function() {
                                self.arcs.fetch()
                            })
                        ).done(function() {
                            options.success ? options.success() : null;
                        })
                    }
                    else {
                        return options.success ? options.success() : true;
                    }
                }
            });
            return result;
        },

        prepare_revert: function() {
            this._revertAttributes = _.clone(this.attributes);
        },

        revert: function() {
            if(this._revertAttributes) {
                this.set(this._revertAttributes);
            }
        }
    });

    return workflowsModel;
});
