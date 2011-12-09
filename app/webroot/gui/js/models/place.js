define([
    'Underscore',
    'Backbone',
], function(_, Backbone) {
    var placeModel = Backbone.Model.extend({
        idAttribute: '_id'
    });

    return placeModel;
});
