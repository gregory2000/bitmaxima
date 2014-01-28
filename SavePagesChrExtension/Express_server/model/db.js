/**
 * Created by g42gregory on 9/16/13.
 */
var mongoose = require( 'mongoose' );

var pageSchema = new mongoose.Schema({
    title: String,
    url: String,
    imgPath: String,
    pdfPath: String
});

var urlSchema = new mongoose.Schema({
    url: String,
    id: Number
});

var telemetrySchema = new mongoose.Schema({
    urlID: Number,
    time: Number,
    type: String
});


var pdfSchema = new mongoose.Schema({
    pdfPath: String
});

mongoose.model('Page', pageSchema);
mongoose.model('Pdf', pdfSchema);
mongoose.model('Telemetry', telemetrySchema);
mongoose.model('Url', urlSchema);

mongoose.connect( 'mongodb://localhost/test' );

