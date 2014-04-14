
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var hbs = require('hbs');
//var ejs = require('ejs');
var user = require('./routes/user');
var search = require('./routes/search');
var submit_preview = require('./routes/submit_preview');
var http = require('http');
var path = require('path');
var db = require('./model/db');

var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'html');
app.engine('html', hbs.__express);


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/public/docs' }));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

//app.use(express.static(__dirname + '/public/'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/search', search.results);
app.get('/users', user.list);
app.post('/submit_page_saved', db.page_save);
app.post('/submit_telemetry', db.telemetry);
app.post('/submit_preview', submit_preview.submit);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
