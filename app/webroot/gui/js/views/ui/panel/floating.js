define([
    'jQuery',
    'Underscore',
    'Backbone'
], function($, _, Backbone) {

    var UIFloatingPanel = Backbone.View.extend({
        initialize: function(options) {
            this.el = $('<div />')
                .appendTo(this.el)
                .addClass('ui-floating-panel');

            if(options.orientation) {
                this.el.addClass('orientation-' + options.orientation);
            }

            this.render();
        },
        render: function() {
            return this;
        }
    });

    return UIFloatingPanel;
});
