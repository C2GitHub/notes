function Ajax(url) {
    const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
     
    xhr.open('get', url, true);

    xhr.send();
    xhr.onreadyStateChange = function() {
        if (xhr.readyState === 4 && xhr.status === 200 || xhr.status === 304) {
            console.log(xhr.responseText);
        }
    }
}