define([
    'Underscore',
    'Backbone'
], function(_, Backbone) {
    var workflowsModel = Backbone.Model.extend({
        url: '/pr/workflows',
        idAttribute: '_id',

        initialize: function() {
            Backbone.Model.prototype.initialize.apply(this, arguments);
            _.bindAll(this, 'prepare_revert', 'revert');
            this.prepare_revert();
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
