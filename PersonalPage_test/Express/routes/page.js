/**
 * Created by g42gregory on 9/16/13.
 */
var pagedata = require('../model/pages');

exports.list = function(req, res){

    pagedata.pagelist(function(err, pagelist){
        res.render('pages', {
            title: 'List of web pages visited',
            pagetitle: 'Web pages',
            pages: pagelist
        });
    });

};