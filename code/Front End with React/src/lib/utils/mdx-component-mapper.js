"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _ = require("../");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var mdxComponentMap = {
  p: _.Text,
  h1: function h1(props) {
    return React.createElement(_.Heading, _extends({}, props, {
      fontSize: "h1"
    }));
  },
  h2: function h2(props) {
    return React.createElement(_.Heading, _extends({}, props, {
      fontSize: "h2"
    }));
  },
  h3: function h3(props) {
    return React.createElement(_.Heading, _extends({}, props, {
      fontSize: "h3"
    }));
  },
  h4: function h4(props) {
    return React.createElement(_.Heading, _extends({}, props, {
      fontSize: "h4"
    }));
  },
  blockquote: _.Quote,
  ul: _.UnorderedList,
  ol: _.OrderedList,
  li: _.ListItem,
  img: _.Image,
  a: _.Link,
  codeblock: function codeblock(props) {
    return React.createElement(_.CodePane, _extends({
      autoFillHeight: true
    }, props));
  },
  code: function code(props) {
    return React.createElement(_.CodePane, _extends({
      autoFillHeight: true
    }, props));
  },
  inlineCode: _.CodeSpan,
  table: _.Table,
  tr: _.TableRow,
  td: _.TableCell
};
var _default = mdxComponentMap;
exports.default = _default;