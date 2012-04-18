define([
    'Underscore',
    'BackboneRelational',
], function(_, Backbone) {
    var placeModel = Backbone.RelationalModel.extend({
        urlRoot: '/pr/places',
        idAttribute: '_id',

        parse: function(response) {
            return response.place;
        }
    });

    return placeModel;
});
