/**
 * Created by g42gregory on 11/26/13.
 */
var mongoose = require('mongoose');

exports.saveTelemetry = function saveTelemetry(telemetrydata, callback){
    var Telemetry = mongoose.model( 'Telemetry' );
    var telemetry = new Telemetry(telemetrydata);
    //console.log(scroll);
    telemetry.save(function () {

    });
};// end exports.saveLink
