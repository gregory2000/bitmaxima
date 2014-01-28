/**
 * Created by g42gregory on 10/18/13.
 */
var pdfdata = require('../model/pdfs');

exports.list = function(req, res){

    pdfdata.pagelist(function(err, pdflist){
        res.render('pdfs', {
            title: 'List of research papers',
            pagetitle: 'Research papers',
            pdfs: pdflist
        });
    });

};
