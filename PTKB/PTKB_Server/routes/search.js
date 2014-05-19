/**
 * Created by g42gregory on 3/31/14.
 */
var request = require('request');
var db = require('../model/db');
var async = require("async");


exports.results = function(req, res){
    var options = {
        url: 'http://localhost:8983/solr/collection1/select',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        qs: {
            "df": "content",
            "indent": "true",
            "q": req.query.q,
            "start": 0,
            "rows": 10,
            "hl.fl": "content",
            "wt": "json",
            "hl": "true",
            "hl.tag.pre": "<b>",
            "hl.tag.post": "</b>",
            "hl.snippets": 3
        }
    };

    function solrCallback(error, request, resSolr) {
        var response = JSON.parse(resSolr)
        var docs = response.response.docs;
        var highlighting = response.highlighting;

        //construct pages JSON object
        var items = new Array();
        async.each(docs, function(doc, callback) {
            var id = doc.id;
            var highlight = highlighting[id].content;
            (function(){
                var temp_doc = doc;
                var temp_id = id;
                var temp_highlight = highlight;
                db.img_path(temp_id, function(path){
                    items.push({'doc': temp_doc, 'highlight': temp_highlight, 'imgPath': path});
                    //console.log(items.length);
                    callback();
                });
            })();

        }, function(err){
            // if any of the file processing produced an error, err would equal that error
            if( err ) {
                // One of the iterations produced an error.
                // All processing will now stop.
                //console.log('A file failed to process');
            } else {
                //console.log('All files have been processed successfully');
                //console.log(items.length);
                return res.render('search', {items: items});
            }
        });
    }
    request(options, solrCallback);
};