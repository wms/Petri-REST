define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/workflows/list/item.html',
    'text!templates/workflows/list/empty.html',
    'text!templates/common/error.html'
], function($, _, Backbone, workflowListItemTemplate, workflowListEmptyTemplate, errorTemplate) {
    var workflowListView = Backbone.View.extend({
        initialize: function() {
            this.collection.fetch();
            this.collection.bind('error', this.error, this);
            this.collection.bind('reset', this.render, this);
            this.collection.bind('change', this.render, this);
            this.collection.bind('add', this.render, this);
        },

        render: function() {
            var self = this;
            this.el.empty();

            if(this.collection.length) {
                this.collection.each(function(workflow) {
                    var item = new workflowListItemView({model: workflow});
                    self.el.append(item.render().el);
                });
            }
            else {
                self.el.html(_.template(workflowListEmptyTemplate));
            }

            return this;
        },

        error: function(collection, response) {
            this.el.html(_.template(errorTemplate, JSON.parse(response.responseText)));
        }
    });

    var workflowListItemView = Backbone.View.extend({
        initialize: function() {
            this.render();
        },

        events: {
            "click .btn.edit": 'openEditor',
            "click .btn.disable": 'disable',
            "click .btn.enable": 'enable'
        },

        openEditor: function(){
            App.Router.navigate('edit/' + this.model.get('_id'), true);
        },

        disable: function() {
            return this.model.disable();
        },

        enable: function() {
            return this.model.enable({
                error: function(c, r) {
                    App.Error.modal('Could not enable Workflow', r.responseText);
                }
            });
        },

        render: function() {
            var c = _.template(workflowListItemTemplate, {
                workflow: this.model.toJSON()
            });
            $(this.el).html(c);
            return this;
        }
    });


    return workflowListView;
});
