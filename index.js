'use strict';

var deepval = function (obj, path, value, remove) {
  if (!obj) {
    return undefined;
  }
  if (!Array.isArray(path)) {
    path = path.split('.');
  }

  var pl = path.length - 1;
  for (var i = 0; i < pl; i++) {
    if (value !== undefined && (obj[path[i]] === undefined || obj[path[i]] === null)) {
      obj[path[i]] = {};
    } else if (!obj.hasOwnProperty(path[i]) || (obj[path[i]] === undefined || obj[path[i]] === null)) {
      return undefined;
    }
    obj = obj[path[i]];
  }

  if (value !== undefined) {
    if (remove) {
      return delete obj[path[pl]];
    } else {
      obj[path[pl]] = value;
    }
  }
  return obj[path[pl]];
};

module.exports = deepval;

module.exports.get = function (obj, path) {
  return deepval(obj, path);
};

module.exports.set = function (obj, path, value) {
  return deepval(obj, path, value);
};

module.exports.del = function (obj, path) {
  return deepval(obj, path, null, true);
};

module.exports.dotpath = function () {
  return Array.prototype.slice.call(arguments).join('.');
};
