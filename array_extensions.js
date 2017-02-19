/**
 * gets the index of an element in the array. returns -1 if the item is not present
 *
 * @param item - item to look for
 */
Array.prototype.indexOf = function(item) {
  return _indexOf(this, item);
}

/**
 * indicates whether or not an item is present in the array or not.
 *
 * @param item - item to look for
 */
Array.prototype.contains = function(item) {
  return _contains(this, item);
}