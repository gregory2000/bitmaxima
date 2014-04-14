/**
 * Created by g42gregory on 3/31/14.
 */
var request = require('request');
var db = require('../model/db');



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
            "rows": 100,
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
        var docsLength = docs.length;
        for (var i = 0; i < docsLength; i++) {
            var doc = docs[i];
            var id = doc.id;
            var highlight = highlighting[id].content;
            (function(){
                var temp_doc = doc;
                var temp_id = id;
                var temp_highlight = highlight;
                db.img_path(temp_id, function(path){
                    items.push({'doc': temp_doc, 'highlight': temp_highlight, 'imgPath': path});
                });
            })();

        }

        return res.render('search', {items: items});

    }
    request(options, solrCallback);


};