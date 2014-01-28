
$(document).ready(function(){
    $.ajaxSetup({
        url: 'http://localhost:3000/submit_telemetry',
        type: 'POST',
        contentType:'application/json',
        dataType: 'json'
    });

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
