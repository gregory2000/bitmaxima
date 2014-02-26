/* Inform the backgrund page that
 * this tab should have a page-action */
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
            url: document.URL
        };
        /* Directly respond to the sender (popup),
         * through the specified callback */
        response(domInfo);
    }
});




/*
$(document).ready(function(){
    $.ajaxSetup({
        url: 'http://localhost:3000/submit_alltech',
        type: 'POST',
        contentType:'application/json',
        dataType: 'json'
    });

    if($('pre').length != 0 || $('code').length != 0){
        var Url = $(location).attr('href');
        var Time = new Date().getTime();
        var HTML = document.body.innerHTML;
        var site = {url: Url, time: Time, html: HTML};
        $.ajax({
            data: JSON.stringify(scrollPoint)
        });
    }
});
*/

/*
window.onload=function(){
    var text = document.body.innerHTML;
    alert(text);
}
*/

/*
$(document).ready(function(){
    $.ajaxSetup({
        url: 'http://localhost:3000/submit_telemetry',
        type: 'POST',
        contentType:'application/json',
        dataType: 'json'
    });

    var text = document.body.innerHTML;
    //alert(text);

    if($('pre').length != 0 || $('code').length != 0){
        $(window).scroll(function(){
            var Url = $(location).attr('href');
            var Time = new Date().getTime();
            var scrollPoint = {url: Url, time: Time, type: 'scroll'}; //scroll type = 0
            $.ajax({
                data: JSON.stringify(scrollPoint)
            });
            //alert("scrolled!");
        });

        $(window).mousemove(function(){
            var moveUrl = $(location).attr('href');
            var moveTime = new Date().getTime();
            var movePoint = {url: moveUrl, time: moveTime, type: 'move'}; //move type = 1
            $.ajax({
                data: JSON.stringify(movePoint)
            });
            //alert("moved!");
        });

    }
    
});
*/

