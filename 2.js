function sendData(data, endpoint) {
  var xhr = new XMLHttpRequest();
  
  xhr.open('POST', endpoint);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onerror = function () {
    log('Ошибка при отправке данных: запрос завершился с ошибкой.');
  };
  
  xhr.onload = function () {
    if (xhr.status.toString()[0] !== '2') {
      log('Ошибка при отправке данных: статус', xhr.status, '—', xhr.statusText);
    } else {
      log('Данные успешно отправлены на', endpoint, 'с ответом:', xhr.responseText);
    }
  };
  
  log('Отправляем данные на вебхук...');
  xhr.send(JSON.stringify(data));
}
