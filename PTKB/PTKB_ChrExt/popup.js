/**
 * Created by g42gregory on 2/24/14.
 */

/* Update the relevant fields with the new data */
function setDOMInfo(info) {
    var Url = info.url;
    var Title = info.title;
    var Time = new Date().toISOString(); //get dateTime in Solr format!
    var Html = info.html;
    var Page = {url: Url, title: Title, time: Time, html: Html}; //construct json rep representation of a page
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



