define([
    'Underscore',
    'Backbone',
], function(_, Backbone) {
    var arcModel = Backbone.Model.extend({

        save: function(attributes, options) {
            attributes = attributes || {};
            // @todo: refactor
            if(this.attributes.input) {
                attributes.input = _.map(this.attributes.input, function(input, type) {
                    if(typeof input == 'string') {
                        return input;
                    }
                    var result = {};
                    result[type + '_id'] = input.id;
                    return result;
                }).pop();
            }
            if(this.attributes.output) {
                attributes.output = _.map(this.attributes.output, function(output, type) {
                    if(typeof output == 'string') {
                        return output;
                    }
                    var result = {};
                    result[type + '_id'] = output.id;
                    return result;
                }).pop();
            }
            return Backbone.Model.prototype.save.call(this, attributes, options);
        },

    });

    return arcModel;
});
