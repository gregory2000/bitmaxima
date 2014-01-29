/**
 * Created by g42gregory on 11/26/13.
 */
var mongoose = require('mongoose');
var teledata = require('../model/telemetry');

/*
 * POST web site URL.
 */

var Url = mongoose.model('Url');

exports.submitTelemetry = function(req, res){

    var URL = req.body.url;

    Url.findOne({ 'url': URL }, function (err, urls) {
        if (err) return handleError(err);
        var ID;
        //console.log(urls);
        if (urls === null){
            Url.count({}, function( err, count){
                ID = count; //IDs start with 0!
                var urlPoint = {
                    url: URL,
                    id: ID
                };
                var url = new Url(urlPoint);
                url.save(function () {

                });
                var telemetry = {
                    urlID: ID,
                    time: req.body.time,
                    type: req.body.type
                };
                console.log(telemetry);

                teledata.saveTelemetry(telemetry, function(){});
                res.send("saved telemetry!");
            })
        }
        else {
            ID = urls.id;
            var telemetry = {
                urlID: ID,
                time: req.body.time,
                type: req.body.type
            };
            console.log(telemetry);

            teledata.saveTelemetry(telemetry, function(){});
            res.send("saved telemetry!");
        };
    });

};





