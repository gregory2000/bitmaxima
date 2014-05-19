/**
 * Created by g42gregory on 2/24/14.
 */


/* Update the relevant fields with the new data */

function setDOMInfo(info) {
    var Url = info.url;
    var Title = info.title;
    var Time = new Date().toISOString(); //get dateTime in Solr format!
    var Html = info.html;
    var Code = info.hasCode;
    var Page = {url: Url, title: Title, time: Time, html: Html, code: Code}; //construct json rep representation of a page
    $.ajax({
        url: 'http://localhost:4000/submit_page_saved',
        type: 'POST',
        contentType:'application/json',
        dataType: 'json',
        data: JSON.stringify(Page)
    });
    //chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    //    chrome.tabs.captureVisibleTab(null, function(img) {
    //        var blob = dataURItoBlob(img);
    //        var tabUrl = tabs[0].url;
    //        uploadFile(blob, tabUrl);

    //    });
    //});
}

function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}

function uploadFile(blobFile, url) {
    //alert('got here');

    var fd = new FormData();

    fd.append("image", blobFile);
    fd.append("url", url);

    $.ajax({
        url: "http://localhost:4000/submit_preview",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(response) {
            // .. do something
        },
        error: function(jqXHR, textStatus, errorMessage) {
            console.log(errorMessage); // Optional
        }
    });
}

//... Once the DOM is ready...
window.addEventListener("DOMContentLoaded", function() {
    // ...query for the active tab...
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            { from: "popup", subject: "DOMInfo" },
            // ...also specifying a callback to be called
            //    from the receiving end (content script)
            setDOMInfo);
    });

});


window.addEventListener("load", windowLoaded, false);

function windowLoaded() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

        chrome.tabs.captureVisibleTab(null, {format:'jpeg', quality: 0}, function(img) {

            var blob = dataURItoBlob(img);
            var tabUrl = tabs[0].url;

            uploadFile(blob, tabUrl);

        });
    });
};

/*
function uploadFile(blobFile, url) {
    var fd = new FormData();
    fd.append("image", blobFile);
    fd.append("url", url);

    $.ajax({
        url: "http://localhost:4000/submit_preview",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(response) {
            // .. do something
        },
        error: function(jqXHR, textStatus, errorMessage) {
            console.log(errorMessage); // Optional
        }
    });
}

function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}
*/














