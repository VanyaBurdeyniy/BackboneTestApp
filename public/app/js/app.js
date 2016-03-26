window.ContactList = {
  Models: {},
  Collections: {},
  Views: {},

  start: function(data) {
    var contacts = new ContactList.Collections.Contacts(data.contacts),
        router = new ContactList.Router();

    router.on('route:home', function() {
      router.navigate('contacts', {
        trigger: true,
        replace: true
      });
    });

    router.on('route:contacts', function() {
      var contactsView = new ContactList.Views.Contacts({
        collection: contacts
      });

      $('.main-container').html(contactsView.render().$el);
    });

    Backbone.history.start();
  }
};
