ContactList.Collections.Contacts = Backbone.Collection.extend({
  model: ContactList.Models.Contact,
  url: '/contacts',
  fetch: function() {
    var collection = this;
    $.ajax({
      type : 'GET',
      url : this.url,
      dataType : 'json',
      success : function(data) {
        collection.reset(data)
      }
    });
  }
});