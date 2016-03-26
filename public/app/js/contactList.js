$(function() {
    var contacts = [];

    $.ajax({
        url: '/contacts',
        method: 'GET',
        success: function(data) {
            data.forEach(function(r){
                contacts.push({
                    id: r.id,
                    name: r.name,
                    tel: r.tel,
                    email: r.email
                });
            });
            ContactList.start({
                contacts: contacts
            });
        },
        dataType: 'json'
    });
});