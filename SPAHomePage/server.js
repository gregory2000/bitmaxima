
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var GitHubApi = require("github");
var async = require('async');

var github = new GitHubApi({
    version: "3.0.0"
});

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
	var filename = 'app/model/nav/' + req.params.user +'.json';
    
	fs.readFile(filename, null, function (err,data) {
        var sections = [];
	    if (err) {
	        res.json(200, sections);
	    }
	    else {
            var jsonData = JSON.parse(data);
	        for (var i in jsonData) 
	            if(jsonData[i].label) {
                    jsonData[i].editable = false;
	                sections.push(jsonData[i]);
                }
	        res.send(200, sections);
	    }
	});
});

app.post('/model/:user/navSections', function(req, res, next) {
	var content = req.body;
	while(content[content.length-1].level == 999)
		content.pop();
	var contentStr = JSON.stringify(content);
	var saveFile = 'app/model/nav/' + req.params.user +'.json';

	fs.writeFile(saveFile, contentStr, function (err) {
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

app.get('/model/github/:username', function(req, res) {	
	var username = req.params.username;
    var userData = {};

    async.parallel([
        function(callback){
            github.user.getFrom({user: username}, 
            function(err, userInfo) {
                if(err)
                    callback(err, userInfo);
                else {
                    userData.fullName = userInfo.name;
                    userData.gravatarImageId = userInfo.gravatar_id;
                    userData.email = userInfo.email;
                    userData.location = userInfo.location;
                    userData.company = userInfo.company;
                    userData.bio = userInfo.bio;
                    callback(null, '.');
                }
            })
        },
        function(callback) {
            github.repos.getFromUser({user: username}, 
            function(err, userRepos) {
                if(err)
                    callback(err, userRepos);
                else {
                    var repos = [];
                    userRepos.forEach(function(repo) {
                        if(repo.owner.login == username)
                            repos.push({
                                "name": repo.name,
                                "description": repo.description,
                                "isForked": repo.forked,
                                "homepage": repo.homepage,
                                "forks": repo.forks,
                                "watchers": repo.watchers,
                                "language": repo.language,
                                "github_url": repo.github_url
                            });
                    });

                    repos.sort(function(r1, r2){
                        // TODO oversimplified
                        var score1 = r1.watchers * (r1.isForked == true ? 1 : r1.forks);
                        var score2 = r2.watchers * (r2.isForked == true ? 1 : r2.forks);
                        return score2-score1;    
                    });
                    userData.repos = repos;
                    callback(null, '.');
                }
            })
        }
    ], function(err, results) {
        if(err) {
            res.send(500, err);
  			throw err;
  		}
  		else 
            res.send(200, userData);
    });
});
 