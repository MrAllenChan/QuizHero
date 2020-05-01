"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSpring = require("react-spring");

var _useTransitionPipe = require("../hooks/use-transition-pipe");

var _useSlide = require("../hooks/use-slide");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * SlideElementWrapper provides a component for animating slideElements
 * Anything wrapped inside will be affected by the transition.
 *
 * It is currently using useSpring but ideally we will be able to switch
 * to whatever react-spring hook a user desires!
 *
 * Note: Immediate is a React-Spring property that we pass to the animations
 * essentially it skips animations.
 */
var Appear = function Appear(_ref) {
  var elementNum = _ref.elementNum,
      transitionEffect = _ref.transitionEffect,
      children = _ref.children;

  var _React$useContext = _react.default.useContext(_useSlide.SlideContext),
      _React$useContext$sta = _React$useContext.state,
      currentSlideElement = _React$useContext$sta.currentSlideElement,
      reverseDirection = _React$useContext$sta.reverseDirection,
      immediate = _React$useContext$sta.immediate;

  var _React$useContext2 = _react.default.useContext(_useTransitionPipe.TransitionPipeContext),
      signal = _React$useContext2.signal;

  var activeElement = elementNum === currentSlideElement;
  var upcomingElement = elementNum > currentSlideElement && !reverseDirection || elementNum < currentSlideElement && reverseDirection;
  var previousElement = elementNum < currentSlideElement && !reverseDirection || elementNum > currentSlideElement && reverseDirection;

  var _useSpring = (0, _reactSpring.useSpring)(function () {
    if ((activeElement || upcomingElement) && !previousElement) {
      return reverseDirection ? transitionEffect.to : transitionEffect.from;
    } else if (previousElement) {
      return reverseDirection ? transitionEffect.from : transitionEffect.to;
    } else {
      return transitionEffect.to;
    }
  }),
      _useSpring2 = _slicedToArray(_useSpring, 2),
      styleProps = _useSpring2[0],
      set = _useSpring2[1];

  _react.default.useEffect(function () {
    if (activeElement && !reverseDirection) {
      set(_objectSpread({}, transitionEffect.to, {
        immediate: immediate
      }));
    } else if (reverseDirection && previousElement) {
      set(_objectSpread({}, transitionEffect.from, {
        immediate: immediate
      }));
    }
  }, [activeElement, elementNum, immediate, previousElement, reverseDirection, set, signal, transitionEffect, upcomingElement]);

  return _react.default.createElement(_reactSpring.animated.div, {
    style: styleProps
  }, children);
};

Appear.propTypes = {
  children: _propTypes.default.node.isRequired,
  elementNum: _propTypes.default.number.isRequired,
  transitionEffect: _propTypes.default.shape({
    from: _propTypes.default.object.isRequired,
    to: _propTypes.default.object.isRequired
  })
};
Appear.defaultProps = {
  transitionEffect: {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  }
};
var _default = Appear;
exports.default = _default;