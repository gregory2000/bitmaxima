var mongo = require('mongodb');
var qs = require('querystring');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('pagetext', server, {w: 1});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'pagetext' database");
        db.collection('page_text', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'page_text' collection doesn't exist.");
            }
        });
    }
});

exports.get_text = function(req, res) {
    db.collection('page_text', {}, function(err, collection) {
        collection.find({"pageId": 0, "itemId": 0}, function(err, datacursor) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.header("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

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
            });
    });
}





