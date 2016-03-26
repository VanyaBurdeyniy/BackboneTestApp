ContactList.Views.Contact = Backbone.View.extend({
  tagName: 'tr',
  template: _.template($('#template-contact').html()),

  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.append(html);
    return this;
  }

});
