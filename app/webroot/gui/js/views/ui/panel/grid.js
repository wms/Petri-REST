define([
    'jQuery',
    'Underscore',
    'Backbone'
], function($, _, Backbone) {

    var UIGridPanel = Backbone.View.extend({
        items: [],

        initialize: function(options) {
            this.el = $('<div />')
                .appendTo(this.el)
                .addClass('ui-grid-panel');
        },
        /**
         * Starting at the origin, return the nearest free grid cell
         */
        findFreeCell: function() {
            var position = {x: 0, y: 0};

            _.each(this.items, function(item) {
                if(item.position.x == position.x) {
                    position.x++;
                }
            });

            return position;
        },
        addItem: function(options) {
            options.el = this.el;
            var item = new UIGridItem(options);
            if(!item.position) {
                item.position = this.findFreeCell();
            }

            this.setPosition(item);
            this.items.push(item);
        },
        addItems: function(items) {
            /*
            _.each(items, function(item, name) {
                item.bind('all', function() {
                    console.debug(this);
                });
            });
            */
        },
        clear: function() {
            this.el.empty();
            this.items.length = 0;
            return this;
        },
        setPosition: function(item) {
            item.el.css({
                top: 350 - item.position.y * 64 - 32 + 'px',
                left: item.position.x * 64 + 32 + 'px'
            });
        },
        disableItemEvents: function() {
            _.each(this.items, function(item) {
                item.delegateEvents({});
            });
            return this;
        },
        enableItemEvents: function() {
            _.each(this.items, function(item) {
                item.delegateEvents(item.events);
            });
            return this;
        },
        showOverlay: function() {
            $('<div />')
                .appendTo(this.el)
                .addClass('overlay');

            return this.disableItemEvents();
        },
        hideOverlay: function() {
            $('.overlay', this.el).remove();

            return this.enableItemEvents();
        }
    });

    var UIGridItem = Backbone.View.extend({
        initialize: function(options) {
            // Apply passed-in attributes
            for(var key in options) {
                this[key] = options[key];
            };
            // Over-ride rendering element
            this.el = $('<div />')
                .appendTo(this.el)
                .addClass('ui-grid-item');

            this.delegateEvents();

            this.render();
        },
    });

    return UIGridPanel;
});
