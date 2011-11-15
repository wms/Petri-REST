define([
    'jQuery',
    'Underscore',
    'Backbone',
    'models/place'
], function($, _, Backbone, placeModel) {
    var placesCollection = Backbone.Collection.extend({
        model: placeModel,
        url: '/pr/places',

        parse: function(response) {
            return response.places;
        }
    });

    return placesCollection;
})
