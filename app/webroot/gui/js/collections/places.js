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
        },
        getById: function(id) {
            return this.find(function(p) {
                return p.id == id
            }, id);
        }
    });

    return placesCollection;
})
