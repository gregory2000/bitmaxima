/**
 * Created by g42gregory on 2/24/14.
 */

/* Update the relevant fields with the new data */
function setDOMInfo(info) {
    var Url = info.url;
    var Time = new Date().getTime();
    var Html = info.html;
    var Page = {url: Url, time: Time, html: Html}; //construct json rep representation of a page
    $.ajax({
        url: 'http://localhost:4000/submit_page_saved',
        type: 'POST',
        contentType:'application/json',
        dataType: 'json',
        data: JSON.stringify(Page)
    });
}

/* Once the DOM is ready... */
window.addEventListener("DOMContentLoaded", function() {
    /* ...query for the active tab... */
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        /* ...and send a request for the DOM info... */
        chrome.tabs.sendMessage(
            tabs[0].id,
            { from: "popup", subject: "DOMInfo" },
            /* ...also specifying a callback to be called
             *    from the receiving end (content script) */
            setDOMInfo);
    });
});


/*
window.addEventListener("load", windowLoaded, false);

function windowLoaded() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var Url = tabs[0].url;
        var Time = new Date().getTime();
        var Html = tabs[0].body.innerHTML;
        var Page = {url: Url, time: Time, html: Html}; //construct json rep representation of a page
        alert(Page);
        $.ajax({
            url: 'http://localhost:4000/submit_page_saved',
            type: 'POST',
            contentType:'application/json',
            dataType: 'json',
            data: JSON.stringify(Page)
        });
    });
};
*/
/*
$(document).ready(function(){
    var Url = $(location).attr('href');
    var Time = new Date().getTime();
    var Html = document.body.innerHTML;
    var Page = {url: Url, time: Time, html: Html}; //construct json rep representation of a page
    $.ajax({
        url: 'http://localhost:4000/submit_page_saved',
        type: 'POST',
        contentType:'application/json',
        dataType: 'json',
        data: JSON.stringify(Page)
    });
});
*/
