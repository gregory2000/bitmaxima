/* Inform the backgrund page that
 * this tab should have a page-action */


$(document).ready(function(){
    var Url = $(location).attr('href');
    var blacklist = [
        'mail.google.com',
        'mail.live.com',
        'mail.yahoo.com'
    ];
    var save = true;
    for(var i = 0; i < blacklist.length; i++){
        if(Url.indexOf(blacklist[i]) !== -1){
            save = false;
        }
    }

    chrome.runtime.sendMessage({
        from: "content",
        subject: "showPageAction"
    });

    /* Listen for message from the popup */
    chrome.runtime.onMessage.addListener(function(msg, sender, response) {
        /* First, validate the message's structure */
        if (msg.from && (msg.from === "popup")
            && msg.subject && (msg.subject === "DOMInfo")) {
            /* Collect the necessary data
             * (For your specific requirements `document.querySelectorAll(...)`
             *  should be equivalent to jquery's `$(...)`)*/
            var domInfo = {
                html: document.body.innerText,
                url: document.URL,
                title: document.title
            };
            /* Directly respond to the sender (popup),
             * through the specified callback */
            response(domInfo);
        }
    });

    $.ajaxSetup({
        url: 'http://localhost:4000/submit_telemetry',
        type: 'POST',
        contentType:'application/json',
        dataType: 'json'
    });

    if(save){
        $(window).scroll(function(){
            var Time = new Date().toISOString(); //get dateTime in Solr format!
            var scrollPoint = {url: Url, time: Time, type: 'scroll'}; //scroll type = 0
            $.ajax({
                data: JSON.stringify(scrollPoint)
            });
            //alert("scrolled!");
        });

        $(window).mousemove(function(){
            var moveTime = new Date().toISOString(); //get dateTime in Solr format!
            var movePoint = {url: Url, time: moveTime, type: 'move'}; //move type = 1
            $.ajax({
                data: JSON.stringify(movePoint)
            });
            //alert("moved!");
        });
    }

});





