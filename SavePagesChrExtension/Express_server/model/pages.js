/**
 * Created by g42gregory on 9/16/13.
 */
var mongoose = require('mongoose');

exports.savePage = function savePage(pagedata, callback){
    var Page = mongoose.model( 'Page' );
    var page = new Page(pagedata);
    //console.log(page);
    page.save(function () {

    });
};// end exports.saveLink


exports.pagelist = function pagelist(callback){
var Page = mongoose.model( 'Page' );

Page.find( {}, function (err, pages) {
    if(err){
        console.log(err);
    }else{
        callback("",pages);
        //console.log(pages);
    }
});// end Page.find
};// end exports.pagelist