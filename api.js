// TODO: Enrich, read from a file, so that re-build of the extension is not necessary.
const KNOWN_EXTENSIONS = [
  "com", "edu", "gov", "net", "tr", "dk", "www"
];


/**
 * Split string with the option removeEmptyEntries
 *
 * @param {String} value - string value to split
 * @param {String} seperator - seperator to split with
 * @param {boolean} removeEmptyEntries - indicates whether or not empty items will be removed from the result set
 */
function splitString(value, seperator, removeEmptyEntries) {
  if (typeof(value) !== "string") {
    return [];
  }

  if (typeof(seperator) !== "string") {
    return [];
  }
  
  removeEmptyEntries = (typeof removeEmptyEntries !== 'undefined') ?  removeEmptyEntries : true;

  return _splitString(value, seperator, removeEmptyEntries);
}

/**
 * Returns the UpperCamelCase version of the string
 *
 * @param {String} value - string value to get UpperCamelCase for of
 */
function toUpperCamelCase(value) {
  if (typeof value !== 'string'){
    return value;
  }

  return _toUpperCamelCase(value);
}

/**
 * Returns a new string with values replaced by the given replacement
 *
 * @param {String} str - string to process
 * @param {String} value - value to replace
 * @param {String} replacement - replacement
 */
function replaceAll(str, value, replacement) {
  if (typeof(str) !== "string") {
    return str;
  }

  if (typeof(value) !== "string") {
    return str;
  }

  if (typeof(replacement) !== "string") {
    return str;
  }

  return _replaceAll(str, value, replacement);
}

/**
 * gets the index of an element in an array. returns -1 if the item is not present
 *
 * @param {Array} array - Array to search
 * @param item - item to look for
 */
function indexOf(array, item) {
  if (typeof array === 'undefined' || array === null) {
    return -1;
  }

  return _indexOf(array, item);
}

/**
 * indicates whether or not an item is present in an array or not.
 *
 * @param {Array} array - Array to search
 * @param item - item to look for
 */
function contains(array, item) {
  if (typeof array === "undefined" || array === null) {
    return false;
  }

  return _contains(array, item);
}

/**
 * indicates whether or not a string is an extension or not
 *
 * @param {String} value - string to assert
 */
function isExtension(value) {
  if (typeof value === "undefined" || value === null) {
    return false;
  }
  
  return contains(KNOWN_EXTENSIONS, value);
}

/**
 * returns an array which contains the non-extension parts of the original string
 *
 * @param {String} hostname - full hostname
 */
function getExtensionlessHostname(hostname) {
  var parts = hostname.split(".");

  for (i = parts.length - 1; i >= 0; i--) {
    if (!isExtension(parts[i]))
      break;
    
    parts.splice(i, 1);
  }

  for (i = 0; i < parts.length; i++) {
    if (!isExtension(parts[i]))
      break;
    
    parts.splice(i, 1);
  }

  return parts;
}