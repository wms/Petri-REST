define([
    'Underscore',
    'Backbone',
], function(_, Backbone) {
    var placeModel = Backbone.Model.extend({
        urlRoot: '/pr/places',
        idAttribute: '_id',

        initialize: function() {
            _.bindAll(this, 'prepare_revert', 'revert');
            this.prepare_revert();
        },

        parse: function(response) {
            return response.place ? response.place : response;
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

    return placeModel;
});
