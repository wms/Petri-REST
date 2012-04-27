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
            this.itemViews = Array();

            _.each(this.items, function(item, index) {
                this.items[index].collection.bind('change reset', function(event) {
                    this.renderItems(index);
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
                this.itemViews.push(new UIGridItem(
                    _.extend(this.items[index].options, {
                        type: index,
                        model: item,
                        el: $el,
                        grid: this
                    })
                ));

            }, this);
        },
        allItems: function(callback) {
            _.each(this.itemViews, function(item) {
                callback.call(item);
            });
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
            var defaults = {
                autoRender: true
            }

            // Apply passed-in attributes
            for(var key in _.defaults(options, defaults)) {
                this[key] = options[key];
            };

            // Over-ride rendering element
            this.setElement(
                $('<div />')
                    .appendTo(this.$el)
                    .addClass('ui-grid-item')
            );

            if(this.autoRender) {
                this.setPosition()
                    .render();
            }
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
            this.grid.allItems(function() {
                this.hideMenu();
            });

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

            foo = this.$dropdown;
            this.$dropdown.dropdown('toggle');

            return false;
        },
        hideMenu: function() {
            this.$el.removeClass('open');
        },
        move: function() {
            this.hideMenu();

            var self = this;
            var moveItemTo = function(event) {
                // @todo: only unbind the click handler we're currently in
                this.undelegateEvents();
                // @todo: grid snapping
                self.model.set('position', {
                    x: Math.round((event.offsetX - 32) / 64),
                    y: Math.round((event.offsetY - 32) / 64)
                });
                self.model.save();
                self.grid.allItems(this.delegateEvents);
            }

            this.grid.allItems(function() {
                this.delegateEvents({
                    'click': function(event) {
                        event.stopPropagation();
                    }
                });
            });

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
