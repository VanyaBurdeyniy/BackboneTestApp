ContactList.Views.Contacts = Backbone.View.extend({
  template: _.template($('#template-contacts').html()),
  events: {
    "click .name": "name"
  },

  initialize: function() {
    this.collection.on('add', this.render, this);
    this.collection.on('reset', this.render, this);
    this.render();
  },

  renderOne: function(contact) {
    var itemView = new ContactList.Views.Contact({model: contact});
    this.$('.contacts-container').append(itemView.render().$el);
  },

  name: function(ev, e) {
    var name = $(ev.target).attr('name');
    var nameToSort = {
      'name':name
    };

    $.ajax({
      url: '/sort',
      data: nameToSort,
      method: 'POST',
      success: function(data) {
        var contacts = [];

        data.forEach(function(r){
          contacts.push({
            id: r.id,
            name: r.name,
            tel: r.tel,
            email: r.email
          });
        });
      },
      dataType: 'json'
    });

    this.collection.fetch(function(){});
  },

  render: function() {
    var html = this.template();
    this.$el.html(html);

    this.collection.each(this.renderOne, this);

    return this;
  }
});