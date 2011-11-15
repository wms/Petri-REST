define([
    'jQuery',
    'Underscore',
    'Backbone',
    'models/transition'
], function($, _, Backbone, transitionModel) {
    var transitionsCollection = Backbone.Collection.extend({
        model: transitionModel,
        url: '/pr/transitions',

        parse: function(response) {
            return response.transitions;
        }
    });

    return transitionsCollection;
})
