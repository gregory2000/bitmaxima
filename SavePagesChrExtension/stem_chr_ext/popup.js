window.addEventListener("load", windowLoaded, false);

function windowLoaded() {

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.captureVisibleTab(null, function(img) {
      var blob = dataURItoBlob(img);
      var tabUrl = tabs[0].url;
      
      /*
      *  THERE IS A BUG HERE! This URL will generate a "pdf" save, but there is no PDF there:
      *  http://stackoverflow.com/questions/4886423/favicon-for-pdf-files
      */
      var re = /pdf/;
      if (re.test(tabUrl)){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', tabUrl, true);
        xhr.responseType = 'arraybuffer';
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState == 4) {
            var pdfBlob = new Blob([this.response], {type: 'application/pdf'});
            uploadFile(pdfBlob, blob, tabs[0].title, tabUrl);
          }
        };
        xhr.send()
      }
      else {
        uploadFile('nopdf', blob, tabs[0].title, tabUrl);
      }
    });
  });
};

function uploadFile(pdfBlobFile, blobFile, title, url) {
    var fd = new FormData();
    fd.append("image", blobFile);
    fd.append("title", title);
    fd.append("url", url);
    fd.append("pdf", pdfBlobFile);

    $.ajax({
       url: "http://localhost:3000/submit_page",
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

function dataURItoPdfBlob(pdfURI) {
    var xhr = new XMLHttpRequest();
    alert(pdfURI);
    xhr.open('GET', 'pdfURI', true);
    xhr.responseType = 'arraybuffer';
    //alert('got here 2');
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState == 4) {
        //alert('got here too');
        var pdfBlob = new Blob([this.response], {type: 'application/pdf'});
        //document.getElementById("myImage").src=window.URL.createObjectURL(blob);
        //alert('got here too');
        //alert(pdfBlob);
        alert(pdfBlob);
        return pdfBlob;
        
      }
    };
    xhr.send();

}

function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}

function postUrl(tab){
	//alert(tab.description);
	var data = {'url': tab.url, title: tab.title};
 	$.ajax({
   		url: 'http://192.241.232.20:3000/submit_url',
   		type: 'POST',
   		contentType:'application/json',
   		data: JSON.stringify(data),
   		dataType:'json'
 	});
};
//192.241.232.20








