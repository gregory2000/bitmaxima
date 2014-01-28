
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var db = require('./model/db');
var submit_page = require('./routes/submit_page');
var submit_telemetry = require('./routes/submit_telemetry');
var page = require('./routes/page');
var pdf = require('./routes/pdf');
var ng_page = require('./routes/ng_page');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/public/docs' }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//routes
app.get('/', routes.index);
app.post('/submit_page', submit_page.submit); //set up file directory here
app.post('/submit_telemetry', submit_telemetry.submitTelemetry); //set up file directory here
app.get('/pages', page.list);
app.get('/pdfs', pdf.list);
app.get('/api_pages', ng_page.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
