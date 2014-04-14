/**
 * Created by g42gregory on 2/24/14.
 * Store data into a database and send pages to the search index
 */
var mongo = require('mongodb');
var qs = require('querystring');
var request = require('request');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('ptkb', server, {w: 1});

//declare variables to store collections
var pages_saved_log_coll;
var pages_saved_dedup_coll;
var url_coll; //URL collection variable
var move_scrl_coll; //move and scroll collection variable
var previews; //jpeg images of previews mapping Web Site URLs to local disk Paths
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'ptkb' database");
        db.collection('pages_saved_log', {}, function(err, collection) {
            pages_saved_log_coll = collection;
            console.log("Connected to 'pages_saved_log' collection");
        });
        db.collection('pages_saved_dedup', {}, function(err, collection) {
            pages_saved_dedup_coll = collection;
            console.log("Connected to 'pages_saved_dedup' collection");
        });
        db.collection('telemetry_url', {}, function(err, collection){
            url_coll = collection;
            console.log("Connected to 'telemetry_url' collection");
        });
        db.collection('telemetry_move_scrl', {}, function(err, collection){
            move_scrl_coll = collection;
            console.log("Connected to 'telemetry_move_scrl' collection");
        });
        db.collection('previews', {}, function(err, collection){
            previews = collection;
            console.log("Connected to 'telemetry_move_scrl' collection");
        });
    }
});

exports.img_path = function(url, callback){
    //console.log(url);
    previews.findOne({url: url}, function(err, doc) {
        if(doc == null){
            callback("#");
        }
        else{
            callback(doc.imgPath);
        }
    });
};


exports.preview_save = function(preview, callback){
    //console.log(preview);
    previews.update(
        {url: preview.url},
        {url: preview.url, imgPath: preview.imgPath},
        {upsert: true},
        function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                //res.send({'error':'An error has occurred'});
            } else {
                //console.log('' + result + ' document(s) updated');
                callback();
            }
        }
    );
};

exports.telemetry = function(req, res){
    var URL = req.body.url;
    url_coll.findOne({ 'url': URL }, function (err, url_returned) {
        if (err) return handleError(err);
        var ID;
        if (url_returned === null){
            url_coll.count(function( err, count){
                ID = count; //IDs start with 0!
                var urlItem = {
                    url: URL,
                    id: ID
                };

                url_coll.insert(
                    urlItem,
                    {safe: true},
                    function(err, result) {
                        if (err) {
                            console.log('Error updating: ' + err);
                            //res.send({'error':'An error has occurred'});
                        } else {
                            //console.log('' + result + ' document(s) updated');
                            //res.send('done');
                        }
                    }
                );

                var telemetry = {
                    urlID: ID,
                    time: req.body.time,
                    type: req.body.type
                };
                //console.log(telemetry);

                move_scrl_coll.insert(
                    telemetry,
                    {safe: true},
                    function(err, result) {
                        if (err) {
                            console.log('Error updating: ' + err);
                            //res.send({'error':'An error has occurred'});
                        } else {
                            //console.log('' + result + ' document(s) updated');
                            //res.send('done');
                        }
                    }
                );
                res.send("saved telemetry!"); //<- This response can happen before the callbacks return! MUST REWORK LATER!
            });
        }
        else {
            ID = url_returned.id;
            var telemetry = {
                urlID: ID,
                time: req.body.time,
                type: req.body.type
            };
            //console.log(telemetry);
            move_scrl_coll.insert(
                telemetry,
                {safe: true},
                function(err, result) {
                    if (err) {
                        console.log('Error updating: ' + err);
                        //res.send({'error':'An error has occurred'});
                    } else {
                        //console.log('' + result + ' document(s) updated');
                        //res.send('done');
                    }
                }
            );
            res.send("saved telemetry!");
        }
    });
};

exports.page_save = function(req, res){
    var document = {url: req.body.url, title: req.body.title, time: req.body.time, html: req.body.html, code: req.body.code};
    //console.log('doc: ' + document);

    pages_saved_log_coll.insert(
        document,
        {safe: true},
        function(err, result) {
            if (err) {
                console.log('Error updating: ' + err);
                //res.send({'error':'An error has occurred'});
            } else {
                //console.log('' + result + ' document(s) updated');
                res.send('done');
            }
        }
    );

    pages_saved_dedup_coll.update(
        {url: req.body.url},
        {url: req.body.url, title: req.body.title, time: req.body.time, html: req.body.html, code: req.body.code},
        {upsert: true},
        function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                //res.send({'error':'An error has occurred'});
            } else {
                //console.log('' + result + ' document(s) updated');
                res.send('done');
            }
        }
    );

    var doc = [{"id": req.body.url, "title": req.body.title, "time": req.body.time, "content": req.body.html, "code": req.body.code}];
    var doc_str = JSON.stringify(doc);

    //console.log(doc_str);

    var options = {
        url: 'http://localhost:8983/solr/update/json?commit=true',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: doc_str
    };

    function callback(error, response, body) {
        //console.log(response);
        //console.log(error);

        if (!error && response.statusCode == 200) {
            //console.log(body);
        }
    }

    request(options, callback);

};


