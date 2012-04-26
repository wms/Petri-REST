define([
    'jQuery',
    'Underscore',
    'Backbone'
], function($, _, Backbone) {

    var UIGridPanel = Backbone.View.extend({
        initialize: function(options) {
            this.setElement(
                $('<div />')
                    .appendTo(this.el)
                    .addClass('ui-grid-panel')
            );

            this.items = options.items;

            _.each(this.items, function(item, index) {
                this.items[index].collection.bind('change reset', function(event) {
                    this.renderItems(index);
                }, this);

                this.items[index].collection.bind('add', function(event) {
                    this.addItem(index);
                }, this);

                $('<div />')
                    .addClass(index)
                    .appendTo(this.$el);
            }, this);

            return this;
        },
        renderItems: function(index) {
            var $el = $('.' + index, this.$el).empty();

            this.items[index].collection.each(function(item) {
                var itemView = new UIGridItem(
                    _.extend(this.items[index].options, {
                        model: item,
                        el: $el,
                        grid: this
                    })
                );
            }, this);
        },
        addItem: function(options) {
        },
        addItems: function(items) {
        },
        clear: function() {
        },
        showOverlay: function() {
            $('<div />')
                .appendTo(this.el)
                .addClass('overlay');

            return this;
        },
        hideOverlay: function() {
            $('.overlay', this.el).remove();

            return this;
        }
    });

    var UIGridItem = Backbone.View.extend({
        events: function() {
            var result = {};
            var defaults = {};

            if(this.menu) {
                result['click div'] = 'showMenu'

                _.each(this.menu, function(item, index) {
                    result['click .'+index] = item.handler;
                }, this);
            }

            return _.defaults(result, defaults);
        },
        initialize: function(options) {
            // Apply passed-in attributes
            for(var key in options) {
                this[key] = options[key];
            };

            // Over-ride rendering element
            this.setElement(
                $('<div />')
                    .appendTo(this.$el)
                    .addClass('ui-grid-item')
            );

            this.setPosition()
                .render();
        },
        setPosition: function(position) {
            var position = _.defaults(
                position || this.model.get('position') || {}, {
                x: 0, y: 0
            });

            this.$el.css({
                top: position.y * 64 + 32 + 'px',
                left: position.x * 64 + 32 + 'px'
            });

            return this;
        },
        showMenu: function(event) {
            //@todo: refactor context menu
            if(!this.$dropdown) {
                this.$el.addClass('dropdown');
                this.$dropdown = $('<ul class="dropdown-menu">');

                _.each(this.menu, function(item, index) {
                    $('<li><a class="'+index+'"><i class="icon icon-'+index+'" />\n'+item.label+'</a></li>')
                        .appendTo(this.$dropdown);
                }, this);

                this.$dropdown.appendTo(this.$el);
            }

            this.$dropdown.dropdown('toggle');

            return false;
        },
        move: function() {
            this.$el.removeClass('open');

            var self = this;
            var moveItemTo = function(event) {
                // @todo: only unbind the click handler we're currently in
                this.undelegateEvents();
                // @todo: grid snapping
                self.model.set('position', {
                    x: (event.offsetX - 32) / 64,
                    y: (event.offsetY - 32) / 64
                });
                self.model.save();
            }
            this.grid.delegateEvents({
                'click': moveItemTo
            });

            return false;
        },
        destroy: function() {
            if(confirm('Confirm delete') && this.model.destroy()) {
                this.remove();
            }
        }
    });

    return UIGridPanel;
});
