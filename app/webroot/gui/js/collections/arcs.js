define([
    'jQuery',
    'Underscore',
    'Backbone',
    'models/arc'
], function($, _, Backbone, arcModel) {
    var arcsCollection = Backbone.Collection.extend({
        model: arcModel,
        url: '/pr/arcs',

        parse: function(response) {
            return response.arcs;
        }
    });

    return arcsCollection;
})
