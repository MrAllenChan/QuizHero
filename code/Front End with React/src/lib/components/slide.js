"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useSlide = _interopRequireWildcard(require("../hooks/use-slide"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _styledSystem = require("styled-system");

var _useAutofillHeight = _interopRequireDefault(require("../hooks/use-autofill-height"));

var _useDeck = require("../hooks/use-deck");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  flex: 1;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        pointer-events: none;\n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n        flex: 0 1 auto;\n        > div {\n          position: relative;\n        }\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    > div {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n      justify-content: flex-start;\n    }\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n  width: ", "px;\n  height: ", "px;\n  overflow: hidden;\n  display: flex;\n  @media print {\n    page-break-before: always;\n    height: 100vh;\n    width: 100vw;\n  }\n  &:before {\n    ", ";\n    content: ' ';\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: -1;\n    opacity: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SlideContainer = (0, _styledComponents.default)('div')(_templateObject(), _styledSystem.color, function (_ref) {
  var theme = _ref.theme;
  return theme.size.width || 1366;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.size.height || 768;
}, _styledSystem.background, function (_ref3) {
  var backgroundOpacity = _ref3.backgroundOpacity;
  return backgroundOpacity;
});
var SlideWrapper = (0, _styledComponents.default)('div')(_styledSystem.color, _styledSystem.space, (0, _styledComponents.css)(_templateObject2()));
var TemplateWrapper = (0, _styledComponents.default)('div')(function (_ref4) {
  var autoLayout = _ref4.autoLayout;
  return autoLayout ? (0, _styledComponents.css)(_templateObject3()) : (0, _styledComponents.css)(_templateObject4());
});
var InnerSlideRef = (0, _styledComponents.default)('div')(_templateObject5());
/**
 * Slide component wraps anything going in a slide and maintains
 * the slides' internal state through useSlide.
 */

var Slide = function Slide(props) {
  var children = props.children,
      slideNum = props.slideNum,
      backgroundColor = props.backgroundColor,
      backgroundImage = props.backgroundImage,
      backgroundOpacity = props.backgroundOpacity,
      backgroundPosition = props.backgroundPosition,
      backgroundRepeat = props.backgroundRepeat,
      backgroundSize = props.backgroundSize,
      textColor = props.textColor,
      template = props.template,
      scaleRatio = props.scaleRatio;

  var theme = _react.default.useContext(_styledComponents.ThemeContext);

  var _React$useContext = _react.default.useContext(_useDeck.DeckContext),
      state = _React$useContext.state;

  var _React$useState = _react.default.useState(scaleRatio || 1),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      ratio = _React$useState2[0],
      setRatio = _React$useState2[1];

  var _React$useState3 = _react.default.useState({
    x: 0,
    y: 0
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      origin = _React$useState4[0],
      setOrigin = _React$useState4[1];

  var slideRef = _react.default.useRef(null);

  var slideWrapperRef = _react.default.useRef(null);

  var contentRef = _react.default.useRef(null);

  var templateRef = _react.default.useRef(null);

  var slideWidth = theme.size.width || 1366;
  var slideHeight = theme.size.height || 768;

  var transformForWindowSize = _react.default.useCallback(function () {
    var clientWidth = slideRef.current.parentElement.clientWidth;
    var clientHeight = slideRef.current.parentElement.clientHeight;
    var useVerticalRatio = clientWidth / clientHeight > slideWidth / slideHeight;
    var newRatio = useVerticalRatio ? clientHeight / slideHeight : clientWidth / slideWidth;
    var clientRects = slideRef.current.getClientRects();

    if (!clientRects || clientRects.length === 0) {
      return;
    }

    setRatio(newRatio);
    setOrigin({
      x: useVerticalRatio ? "".concat((clientWidth - clientRects[0].width) / 2 / (1 - newRatio), "px") : 'left',
      y: useVerticalRatio ? 'top' : "".concat((clientHeight - clientRects[0].height) / 2 / (1 - newRatio), "px")
    });
  }, [slideHeight, slideWidth]);

  _react.default.useEffect(function () {
    var clientWidth = slideRef.current.parentElement.clientWidth;
    var clientHeight = slideRef.current.parentElement.clientHeight;
    var useVerticalRatio = clientWidth / clientHeight > slideWidth / slideHeight;
    var clientRects = slideRef.current.getClientRects();

    if (!clientRects || clientRects.length === 0) {
      return;
    }

    setOrigin({
      x: useVerticalRatio ? "".concat((clientWidth - clientRects[0].width) / 2 / (1 - ratio), "px") : 'left',
      y: useVerticalRatio ? 'top' : "".concat((clientHeight - clientRects[0].height) / 2 / (1 - ratio), "px")
    });
  }, [ratio, slideHeight, slideWidth, theme]);

  _react.default.useLayoutEffect(function () {
    if (!isNaN(scaleRatio)) {
      return;
    }

    transformForWindowSize();
    window.addEventListener('resize', transformForWindowSize); // eslint-disable-next-line consistent-return

    return function () {
      return window.removeEventListener('resize', transformForWindowSize);
    };
  }, [transformForWindowSize, scaleRatio]);

  var transforms = _react.default.useMemo(function () {
    return state.exportMode ? {} : {
      transform: "scale(".concat(ratio, ")"),
      transformOrigin: "".concat(origin.x, " ").concat(origin.y),
      position: 'absolute',
      top: 0,
      left: 0
    };
  }, [state.exportMode, origin, ratio]);

  var value = (0, _useSlide.default)(slideNum);
  var numberOfSlides = value.state.numberOfSlides;
  (0, _useAutofillHeight.default)({
    slideWrapperRef: slideWrapperRef,
    templateRef: templateRef,
    contentRef: contentRef,
    slideHeight: slideHeight
  });
  return _react.default.createElement(SlideContainer, {
    ref: slideRef,
    backgroundColor: state.printMode ? '#ffffff' : backgroundColor,
    backgroundImage: state.printMode ? undefined : backgroundImage,
    backgroundOpacity: backgroundOpacity,
    backgroundPosition: backgroundPosition,
    backgroundRepeat: backgroundRepeat,
    backgroundSize: backgroundSize,
    style: transforms
  }, _react.default.createElement(TemplateWrapper, {
    ref: templateRef
  }, typeof template === 'function' && template({
    slideNumber: slideNum,
    numberOfSlides: numberOfSlides
  })), _react.default.createElement(SlideWrapper, {
    ref: slideWrapperRef,
    padding: 2,
    color: textColor
  }, _react.default.createElement(_useSlide.SlideContext.Provider, {
    value: value
  }, _react.default.createElement(InnerSlideRef, {
    ref: contentRef
  }, children))));
};

Slide.propTypes = {
  backgroundColor: _propTypes.default.string,
  backgroundImage: _propTypes.default.string,
  backgroundOpacity: _propTypes.default.number,
  backgroundPosition: _propTypes.default.string,
  backgroundRepeat: _propTypes.default.string,
  backgroundSize: _propTypes.default.string,
  children: _propTypes.default.node.isRequired,
  scaleRatio: _propTypes.default.number,
  slideNum: _propTypes.default.number,
  template: _propTypes.default.func,
  textColor: _propTypes.default.string,
  transitionEffect: _propTypes.default.oneOfType([_propTypes.default.shape({
    from: _propTypes.default.object,
    enter: _propTypes.default.object,
    leave: _propTypes.default.object
  }), _propTypes.default.oneOf(['fade', 'slide', 'none'])])
};
Slide.defaultProps = {
  textColor: 'primary',
  backgroundColor: 'tertiary',
  backgroundOpacity: 1,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};
var _default = Slide;
exports.default = _default;