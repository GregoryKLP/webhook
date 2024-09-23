function sendData(data, endpoint) {
  if (document.location.href.search('appspot.com') == -1) {
    var xhr = new XMLHttpRequest();
    
    // Отправляем объект data напрямую, не сериализуя его в строку
    xhr.open('POST', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data)); // Преобразуем объект в JSON только на этапе отправки

    xhr.onload = function () {
      if (xhr.status.toString()[0] !== '2') {
        console.error(xhr.status + '> ' + xhr.statusText);
      }
    };
  }
}
