/**
 * Created by g42gregory on 4/9/14.
 */
var db = require('../model/db');
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

    var preview = {
        url: req.body.url,
        imgPath: relativePath
    };

    //console.log(preview);

    db.preview_save(preview, function(){
        res.send("saved page!");
    });

};