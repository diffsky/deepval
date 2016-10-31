'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var hasDeep = function(key) {
  return !!(key && this[key]);
};

var deepval = function(obj, path, value, remove, ignoreOwn) {
  path = path.split('.');
  var pl = path.length - 1;

  for (var i = 0; i < pl; i += 1) {
    if (typeof value !== 'undefined' && typeof obj[path[i]] === 'undefined') {
      obj[path[i]] = {};
    } else if (!(ignoreOwn ? hasDeep : hasOwn).call(obj, path[i])) {
      return undefined;
    }
    obj = obj[path[i]];
  }

  if (typeof value !== 'undefined') {
    if (remove) {
      return delete obj[path[pl]];
    } else {
      obj[path[pl]] = value;
    }
  }
  return obj[path[pl]];
};

module.exports = deepval;

module.exports.get = function(obj, path) {
  return deepval(obj, path);
};

module.exports.set = function(obj, path, value) {
  return deepval(obj, path, value);
};

module.exports.del = function(obj, path) {
  return deepval(obj, path, null, true);
};

module.exports.dotpath = function() {
  return Array.prototype.slice.call(arguments).join('.');
};

module.exports.deep = function(obj, path, value, remove) {
  return deepval(obj, path, value, remove, true);
};
