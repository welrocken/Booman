/**
 * Returns the UpperCamelCase version of the string
 *
 */
String.prototype.toUpperCamelCase = function() {
  return _toUpperCamelCase(this);
}

/**
 * Split string with the option removeEmptyEntries
 *
 * @param {String} seperator - seperator to split with
 * @param {boolean} removeEmptyEntries - indicates whether or not empty items will be removed from the result set
 */
String.prototype.split2 = function(seperator, removeEmptyEntries) {
  if (typeof seperator != "string") {
    return [];
  }

  return _splitString(this, seperator);
}

/**
 * Returns a new string with values replaced by the given replacement
 *
 * @param {String} value - value to replace
 * @param {String} replacement - replacement
 */
String.prototype.replaceAll = function(seperator, removeEmptyEntries) {
  if (typeof(value) !== "string") {
    return this;
  }

  if (typeof(replacement) !== "string") {
    return this;
  }

  return _replaceAll(this, value, replacement);
}