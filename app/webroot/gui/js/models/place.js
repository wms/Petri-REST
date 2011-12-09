define([
    'Underscore',
    'Backbone',
], function(_, Backbone) {
    var placeModel = Backbone.Model.extend({
        idAttribute: '_id',

        parse: function(response) {
            return response.place;
        }
    });

    return placeModel;
});
