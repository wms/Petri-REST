define([
    'Underscore',
    'Backbone',
], function(_, Backbone) {
    var transitionModel = Backbone.Model.extend({
        urlRoot: '/pr/transitions',
        idAttribute: '_id',

        parse: function(response) {
            return response.transition ? response.transition : response;
        }
    });

    return transitionModel;
});
