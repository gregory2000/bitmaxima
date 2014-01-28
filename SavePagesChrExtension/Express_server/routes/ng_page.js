/**
 * Created by g42gregory on 11/7/13.
 */
var pagedata = require('../model/pages');

exports.list = function(req, res){
    pagedata.pagelist(function(err, pagelist){
        res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.header("Access-Control-Allow-Methods", "GET, POST");
        // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross

        res.send('pages', {
            title: 'List of web pages visited',
            pagetitle: 'Web pages',
            pages: pagelist
        });
    });
};