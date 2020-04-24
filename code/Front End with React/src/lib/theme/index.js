"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeTheme = void 0;

var _defaultTheme = _interopRequireDefault(require("./default-theme"));

var _printTheme = _interopRequireDefault(require("./print-theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mergeKeys = function mergeKeys(base, override) {
  return Object.keys(override || {}).reduce(function (merged, key) {
    merged[key] = _objectSpread({}, merged[key], {}, override[key]);
    return merged;
  }, _objectSpread({}, base));
};

var mergeTheme = function mergeTheme(theme) {
  var isPrintMode = window.location.search.includes('printMode');
  var merged = mergeKeys(_defaultTheme.default, theme); // if is print mode then do the above for printTheme else return the
  // above merged themes

  return isPrintMode ? mergeKeys(merged, _printTheme.default) : merged;
};

exports.mergeTheme = mergeTheme;