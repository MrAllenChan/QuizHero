"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Circle = void 0;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _useDeck = require("../hooks/use-deck");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  @media print {\n    display: none;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: ", "px;\n  height: ", "px;\n  display: inline-block;\n  border: 1px solid ", ";\n  background: ", ";\n  margin: ", "px;\n  border-radius: 50%;\n  pointer-events: all;\n  cursor: pointer;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Circle = (0, _styledComponents.default)('div')(_templateObject(), function (_ref) {
  var size = _ref.size;
  return size;
}, function (_ref2) {
  var size = _ref2.size;
  return size;
}, function (_ref3) {
  var color = _ref3.color;
  return color;
}, function (_ref4) {
  var color = _ref4.color,
      active = _ref4.active;
  return active ? color : 'transparent';
}, function (_ref5) {
  var size = _ref5.size;
  return size / 3;
});
exports.Circle = Circle;
var Container = (0, _styledComponents.default)('div')(_templateObject2());

var Progress = function Progress(props) {
  var _React$useContext = React.useContext(_useDeck.DeckContext),
      numberOfSlides = _React$useContext.numberOfSlides,
      state = _React$useContext.state,
      goToSlide = _React$useContext.goToSlide;

  return React.createElement(Container, {
    className: "spectacle-progress-indicator"
  }, Array(numberOfSlides).fill(0).map(function (_, idx) {
    return React.createElement(Circle, {
      key: "progress-circle-".concat(idx),
      color: props.color,
      active: state.currentSlide === idx,
      size: props.size,
      onClick: function onClick() {
        return goToSlide(idx);
      },
      "data-testid": "Progress Circle"
    });
  }));
};

Progress.propTypes = {
  color: _propTypes.default.string,
  size: _propTypes.default.number
};
Progress.defaultProps = {
  color: '#fff',
  size: 10
};
var _default = Progress;
exports.default = _default;