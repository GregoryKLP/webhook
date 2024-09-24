function sendData(data, endpoint) {
    if (document.location.href.search('appspot.com') == -1) {
        var xhr = new XMLHttpRequest();
        
        // Если не требуется строка, отправляем объект напрямую
        xhr.open('POST', endpoint);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data); // Отправляем объект как есть

        xhr.onload = function () {
            if (xhr.status.toString()[0] !== '2') {
                console.error(xhr.status + '> ' + xhr.statusText);
            }
        };
    }
}
