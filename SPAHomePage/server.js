
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'app')));

// Show debug outputs in dev mode
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/model/:user/navSections', function(req, res) {
	res.sendfile('app/model/navSections.json');
});

app.post('/model/:user/navSections', function(req, res, next) {
	var content = req.body;
	if(content[content.length-1].level == 999)
		content.pop();
	var contentStr = JSON.stringify(content);
	console.log(contentStr);

	fs.writeFile('app/model/navSections.json', contentStr, function (err) {
  		if (err) {
  			res.send(500, err);
  			throw err;
  		}
  		else {
  			res.send(200);
  			console.log('It\'s saved!');
  		}
	});
});
 