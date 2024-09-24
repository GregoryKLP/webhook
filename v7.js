function sendData(data, tableData, endpoint) {
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
    var merged = [];

    // Проверяем, является ли data массивом
    if (Array.isArray(data)) {
        merged = [...data];
    }

    // Добавляем данные из таблицы в каждый элемент массива
    merged.forEach(function(item) {
        for (var key in tableData) {
            if (tableData.hasOwnProperty(key)) {
                item[key] = tableData[key];
            }
        }
    });

    return merged;
}
