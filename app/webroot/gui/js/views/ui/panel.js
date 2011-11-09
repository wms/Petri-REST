define([
    'jQuery',
    'Underscore',
    'Backbone'
], function($, _, Backbone, workflowListTemplate, errorTemplate) {

    var UIPanel = Backbone.View.extend({

        initialize: function(options) {
            this.containers = $([]);

            this.el = $('<div />')
                .appendTo(this.el)
                .addClass('ui-panel');

            this.titleEl = $('<h2>'+options.title+'</h2>')
                .addClass('ui-panel title')
                .appendTo(this.el);

            for(var i = 0; i < options.containers; i++) {
                this.containers.push(
                    $('<div />')
                    .addClass('ui-panel container')
                    .appendTo(this.el)
                );
            }
        }
    });

    return UIPanel;
});
