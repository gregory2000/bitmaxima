/**
 * Created by g42gregory on 1/25/14.
 */
var db = require('../model/db');

exports.text = function(req, res){
    db.text(function(err, text){
        res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.header("Access-Control-Allow-Methods", "GET, POST");
        // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross

        res.send('pages', {
            title: 'List of web pages visited',
            pagetitle: 'Web pages',
            text: text
        });
    });
};


