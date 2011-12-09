define([
    'Underscore',
    'Backbone',
    'collections/places',
    'collections/transitions',
    'collections/arcs',
], function(_, Backbone, placesCollection, transitionsCollection, arcsCollection) {
    var workflowsModel = Backbone.Model.extend({
        urlRoot: '/pr/workflows',
        idAttribute: '_id',

        initialize: function(options) {
            _.bindAll(this, 'prepare_revert', 'revert');
            this.prepare_revert();

            if(options.fetchChildren) {
                this.places = new placesCollection;
                this.transitions = new transitionsCollection;
                this.arcs = new arcsCollection;
            }
        },
        
        parse: function(response) {
            return response.workflow;
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
