function _isUndefined(x) {
  return typeof x === "undefined";
}

function _isNull(x) {
  return x === null;
}

function _splitString(value, seperator, removeEmptyEntries) {
  var items = value.split(seperator);
  var results = [];
  for (var i = 0; i < items.length; i++) {
    if (items[i] === '')
      continue;

    results.push(items[i]);
  }

  return results;
}

function _toUpperCamelCase(value) {
  return value[0].toUpperCase() + value.substring(1, value.length);
}

function _replaceAll(str, value, replacement) {
  var tempString = str;
  while (tempString.includes(value)) {
    tempString = tempString.replace(value, replacement);
  }

  return tempString;
}

function _indexOf(array, item) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === item) {
      return i;
    }
  }

  return -1;
}

function _contains(array, item) {
  return _indexOf(array, item) !== -1;
}