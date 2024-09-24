function sendData(data, tableData, endpoint) {
    // Слияние данных из текстового поля (data) и таблицы (tableData)
    var mergedData = mergeObjects(data, tableData);

    // Преобразуем объект в строку JSON
    var stringifiedData = JSON.stringify(mergedData);

    if (document.location.href.search('appspot.com') == -1) {
        var xhr = new XMLHttpRequest();
        
        xhr.open('POST', endpoint);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(stringifiedData);

        xhr.onload = function () {
            if (xhr.status.toString()[0] !== '2') {
                console.error(xhr.status + '> ' + xhr.statusText);
            }
        };
    }
}

// Функция для слияния данных
function mergeObjects(data, tableData) {
    var merged = {};

    // Сначала добавляем данные из таблицы
    for (var key in tableData) {
        if (tableData.hasOwnProperty(key)) {
            merged[key] = tableData[key];
        }
    }

    // Затем добавляем или перезаписываем данные из текстового поля
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            merged[key] = data[key];
        }
    }

    return merged;
}
