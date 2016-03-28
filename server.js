var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    http = require('http');

var app = express();

var contacts;

fs.readFile('contacts.json', 'utf8', function (err, data) {
    if (err) throw err;
    contacts = JSON.parse(data);
});

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
});

app.post('/sort', function(req, res) {

    if (req.body.name == 'name') {
        contacts.sort(function(a, b){
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });
    }

    if (req.body.name == 'number') {
        contacts.sort(function(a, b){
            if(a.tel < b.tel) return -1;
            if(a.tel > b.tel) return 1;
            return 0;
        });
    }

    if (req.body.name == 'email') {
        contacts.sort(function(a, b){
            if(a.email < b.email) return -1;
            if(a.email > b.email) return 1;
            return 0;
        });
    }
    res.send(contacts);
});

app.get('/contacts', function(req, res) {
    res.send(contacts);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
