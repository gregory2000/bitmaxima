/**
 * Created by g42gregory on 2/24/14.
 */
var mongo = require('mongodb');
var qs = require('querystring');
var request = require('request');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('ptkb', server, {w: 1});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'ptkb' database");
        db.collection('pages_saved_log', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'pages_saved_log' collection doesn't exist.");
            }
        });
    }
});

exports.page_save = function(req, res){
    var document = {url: req.body.url, time: req.body.time, html: req.body.html};
    db.collection('pages_saved_log', {}, function(err, collection){
        collection.insert(
            document,
            {safe: true},
            function(err, result) {
                if (err) {
                    console.log('Error updating: ' + err);
                    //res.send({'error':'An error has occurred'});
                } else {
                    console.log('' + result + ' document(s) updated');
                    res.send('done');
                }
            }
        );

    });

    db.collection('pages_saved_dedup', {}, function(err, collection){
        var Url = req.body.url;
        var Time = req.body.time;
        var Html = req.body.html;

        collection.update(
            {url: Url},
            {url: Url, time: Time, html: Html},
            {upsert: true},
            function(err, result) {
                if (err) {
                    console.log('Error updating wine: ' + err);
                    //res.send({'error':'An error has occurred'});
                } else {
                    console.log('' + result + ' document(s) updated');
                    res.send('done');
                }
            }
        );

    });

    var doc = [{"id": req.body.url, "price": req.body.time, "name": req.body.html}];
    var doc_str = JSON.stringify(doc);

    var options = {
        url: 'http://localhost:8983/solr/update/json?commit=true',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: doc_str
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }

    request(options, callback);





    /*
    $.post('superman', { field1: "hello", field2 : "hello2"},
        function(returnedData){
            console.log(returnedData);
        });
        */

};














/*
exports.get_text = function(req, res) {
    db.collection('page_text', {}, function(err, collection) {
        collection.findOne({"pageId": 0, "itemId": 0}, function(err, data0) {

            collection.findOne({"pageId": 1, "itemId": 0}, function(err, data1) {

                collection.findOne({"pageId": "2", "itemId": "0"}, function(err, data2) {

                    console.log(data2);

                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
                    res.header("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

                    var data = [data0, data1, data2];
                    console.log(data);

                    res.send(data);
                });

            });


             datacursor.toArray(function(err, alldata){
             console.log(alldata);
             res.send(alldata);
             });



        });
    });
};


exports.update = function(req, res) {
    var pageId = req.body.pageId;
    var itemId = req.body.itemId;
    var text = req.body.text;

    console.log(req.body);
    console.log(pageId + ' ' + itemId + ' ' + text);
    res.send(200);
    db.collection('page_text', {}, function(err, collection) {
        collection.update(
            {"pageId": pageId, "itemId": itemId},
            {"pageId": pageId, "itemId": itemId, "text": text},
            {upsert: true},
            function(err, result) {
                if (err) {
                    console.log('Error updating wine: ' + err);
                    //res.send({'error':'An error has occurred'});
                } else {
                    console.log('' + result + ' document(s) updated');
                    //res.send(text);
                }
            }
        );
    });
}
*/