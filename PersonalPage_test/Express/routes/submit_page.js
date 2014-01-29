/**
 * Created by g42gregory on 9/16/13.
 */
var pagedata = require('../model/pages');
var pdfdata = require('../model/pdfs');
var fs = require('fs');

/*
 * POST web site URL.
 */

exports.submit = function(req, res){
    //add .jpg extension to the file
    //console.log(req);

    var oldPath = req.files.image.path;
    var newPath = oldPath + '.jpg';
    fs.rename(oldPath, newPath);

    var relativePath = newPath.substring(__dirname.length);

    if (req.body.pdf != 'nopdf'){
        var pdfOldPath = req.files.pdf.path;
        var pdfNewPath = pdfOldPath + '.pdf';
        fs.rename(pdfOldPath, pdfNewPath);
        var pdfRelativePath = pdfNewPath.substring(__dirname.length);

        var pdf = {
            pdfPath: pdfRelativePath
        }
        pdfdata.savePdf(pdf, function(){});
        console.log(pdf);

    }
    else{
        var pdfRelativePath = null;
    }

    var page = {
        title: req.body.title,
        url: req.body.url,
        imgPath: relativePath,
        pdfPath: pdfRelativePath
    };

    console.log(page);

    pagedata.savePage(page, function(){});
    res.send("saved page!");
};


