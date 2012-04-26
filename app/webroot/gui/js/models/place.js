define([
    'Underscore',
    'Backbone',
], function(_, Backbone) {
    var placeModel = Backbone.Model.extend({
        urlRoot: '/pr/places',
        idAttribute: '_id',

        parse: function(response) {
            return response.place ? response.place : response;
        }
    });

    return placeModel;
});
