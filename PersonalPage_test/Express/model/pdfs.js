/**
 * Created by g42gregory on 10/18/13.
 */
var mongoose = require('mongoose');

exports.savePdf = function savePdf(pdfdata, callback){
    var Pdf = mongoose.model( 'Pdf' );
    var pdf = new Pdf(pdfdata);
    //console.log(page);
    pdf.save(function () {

    });
};// end exports.saveLink

exports.pagelist = function pagelist(callback){
    var Pdf = mongoose.model( 'Pdf' );

    Pdf.find( {}, function (err, pdfs) {
        if(err){
            console.log(err);
        }else{
            callback("", pdfs);
            //console.log(pages);
        }
    });// end Pdf.find
};// end exports.pagelist