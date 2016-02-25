// Generated by IcedCoffeeScript 1.7.1-b
(function() {
  var append, log, original, qs, url, _type,
    __slice = [].slice;

  log = function() {
    var x;
    x = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return console.log.apply(console, x);
  };

  url = require('url');

  qs = require('querystring');

  _type = function(obj) {
    if (obj === 'undefined' || obj === null) {
      return false;
    }
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  };

  module.exports = append = function() {
    var append_obj, k, obj, objs, parts, url_parts, url_str, v, x, _i, _j, _len, _len1;
    url_str = arguments[0], objs = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    url_parts = url.parse(url_str);
    append = [];
    try {
      append.push(qs.parse(url_parts.query));
    } catch (_error) {}
    for (_i = 0, _len = objs.length; _i < _len; _i++) {
      obj = objs[_i];
      if (_type(obj) === 'string' && obj.indexOf('://') > -1) {
        parts = url.parse(obj);
        try {
          append.push(qs.parse(parts.query));
        } catch (_error) {}
        continue;
      }
      if (_type(obj) === 'string') {
        if (obj.substr(0, 1) === '?') {
          obj = obj.substr(1);
        }
        if (!obj.trim()) {
          continue;
        }
        try {
          append.push(qs.parse(obj));
        } catch (_error) {}
        continue;
      }
      if (_type(obj) === 'object' && obj) {
        append.push(obj);
        continue;
      }
    }
    if (!append.length) {
      return url_str;
    }
    append_obj = {};
    for (_j = 0, _len1 = append.length; _j < _len1; _j++) {
      x = append[_j];
      for (k in x) {
        v = x[k];
        append_obj[k] = v;
      }
    }
    return url.resolve(url_str, '?' + qs.stringify(append_obj));
  };

  if (process.env.TAKY_DEV) {
    log(/test/);
    original = 'http://landing-page.com/?s1=sid1&sid2=sid3';
    log(append("http://click-url.com/?affid=1", original, {
      object_format_sid: "Hello Friends"
    }));

    /*
    http://click-url.com/?affid=1&s1=sid1&sid2=sid3&object_format_sid=Hello%20Friends
     */
    process.exit(0);
  }

}).call(this);