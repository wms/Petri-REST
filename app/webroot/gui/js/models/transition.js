define([
    'Underscore',
    'Backbone',
], function(_, Backbone) {
    var transitionModel = Backbone.Model.extend({
        idAttribute: '_id',

        parse: function(response) {
            return response.transition;
        }
    });

    return transitionModel;
});
