"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Indent to smallest non-empty whitespace level and trim start / end of string.
var indentNormalizer = function indentNormalizer(val) {
  var prefix = null;
  return (val || '').split('\n').filter(function (line) {
    var _slice = (line.match(/^([ ]*)([^ ]+)/) || []).slice(1),
        _slice2 = _slicedToArray(_slice, 2),
        cur = _slice2[0],
        remainder = _slice2[1];

    return remainder ? (prefix = null === prefix || cur.length < prefix.length ? cur : prefix, !0) : null !== prefix;
  }).map(function (line) {
    return prefix ? line.replace(prefix, '') : line;
  }).join('\n').trimRight();
};

var _default = indentNormalizer;
exports.default = _default;