function mergeData(textData, tableData) {
  let payload = {};

  if (textData) {
    try {
      const parsedData = JSON.parse(textData);
      if (typeof parsedData === 'object') {
        Object.assign(payload, parsedData);
      } else {
        console.error('Ошибка: данные не являются корректным JSON объектом');
        return null;
      }
    } catch (error) {
      console.error('Ошибка при парсинге JSON:', error);
      return null;
    }
  }

  if (tableData) {
    Object.assign(payload, tableData);
  }

  return payload;
}
