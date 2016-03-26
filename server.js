var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    http = require('http');

var app = express();

var countries;

fs.readFile('contacts.json', 'utf8', function (err, data) {
    if (err) throw err;
    countries = JSON.parse(data);
});

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/contacts', function(req, res) {
    res.send(countries);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
