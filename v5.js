function sendData(data, endpoint) {
    if (document.location.href.search('appspot.com') == -1) {
        var xhr = new XMLHttpRequest();
        
        var stringifiedData = JSON.stringify(data); // Преобразуем объект в строку
        xhr.open('POST', endpoint);
        xhr.setRequestHeader('Content-Type', 'application/json'); // Устанавливаем заголовок
        xhr.send(stringifiedData); // Отправляем строку JSON

        xhr.onload = function () {
            if (xhr.status.toString()[0] !== '2') {
                console.error(xhr.status + '> ' + xhr.statusText);
            }
        };
    }
}
