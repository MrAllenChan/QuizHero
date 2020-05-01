"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CodePane;

var React = _interopRequireWildcard(require("react"));

var _prismReactRenderer = _interopRequireWildcard(require("prism-react-renderer"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _vsDark = _interopRequireDefault(require("prism-react-renderer/themes/vsDark"));

var _nightOwlLight = _interopRequireDefault(require("prism-react-renderer/themes/nightOwlLight"));

var _styledComponents = require("styled-components");

var _useDeck = require("../hooks/use-deck");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var spaceSearch = /\S|$/;
var lineNumberStyles = {
  padding: '0 1em',
  borderRight: '1px solid hsla(0, 0%, 100%, 0.25)',
  flex: '0 1 30px',
  alignSelf: 'stretch'
};

function CodePane(props) {
  var canvas = React.useRef(document.createElement('canvas'));
  var context = React.useRef(canvas.current.getContext('2d'));
  var scrollContainerRef = React.useRef(null);
  var lineRef = React.useRef(null);
  var themeContext = React.useContext(_styledComponents.ThemeContext);

  var _React$useContext = React.useContext(_useDeck.DeckContext),
      printMode = _React$useContext.state.printMode;

  var font = React.useMemo(function () {
    if (themeContext && themeContext.fonts && themeContext.fonts.monospace) {
      return themeContext.fonts.monospace;
    }

    var _navigator = navigator,
        platform = _navigator.platform;

    if (platform.toLowerCase().search('win') !== -1) {
      return 'Consolas';
    } else if (platform.toLowerCase().search('mac') !== -1) {
      return 'Menlo';
    } else {
      return 'monospace';
    }
  }, [themeContext]);
  var fontSize = React.useMemo(function () {
    if (props && props.fontSize) {
      return props.fontSize;
    }

    if (themeContext && themeContext.fontSizes && themeContext.fontSizes.monospace) {
      return themeContext.fontSizes.monospace;
    } // Default to 15px


    return 15;
  }, [themeContext, props.fontSize]);
  var preStyles = React.useMemo(function () {
    return {
      fontFamily: font,
      fontSize: fontSize,
      maxHeight: themeContext.size.maxCodePaneHeight || 200,
      overflow: 'scroll',
      margin: 0,
      padding: '0.5em 1em 0.5em 0'
    };
  }, [font, fontSize, themeContext]);
  var isLineDimmed = React.useCallback(function (lineNumber) {
    return lineNumber < props.highlightStart || lineNumber > props.highlightEnd;
  }, [props.highlightStart, props.highlightEnd]);
  var measureIndentation = React.useCallback(function (indentation) {
    if (indentation === 0) {
      return 0;
    }

    var string = ' '.repeat(indentation);
    context.current.font = "".concat(props.fontSize, "px ").concat(font);
    var measurement = context.current.measureText(string);
    return measurement.width;
  }, [props.fontSize, font]); // Auto-scroll to highlighted range

  React.useLayoutEffect(function () {
    var lineHeight = lineRef.current.clientHeight;
    var top = Math.max(0, (props.highlightStart - 1) * lineHeight);
    scrollContainerRef.current.scroll({
      top: top,
      behavior: 'smooth'
    });
  }, [lineRef.current, props.highlightStart]);
  return React.createElement(React.Fragment, null, React.createElement(_prismReactRenderer.default, _extends({}, _prismReactRenderer.defaultProps, {
    code: props.children,
    language: props.language,
    theme: printMode ? _nightOwlLight.default : props.theme
  }), function (_ref) {
    var className = _ref.className,
        style = _ref.style,
        tokens = _ref.tokens,
        getLineProps = _ref.getLineProps,
        getTokenProps = _ref.getTokenProps;
    return React.createElement("pre", {
      ref: scrollContainerRef,
      className: "".concat(className, " ").concat(props.autoFillHeight && 'spectacle-auto-height-fill'),
      style: _objectSpread({}, style, {}, preStyles)
    }, tokens.map(function (line, i) {
      var lineProps = getLineProps({
        line: line,
        key: i
      });
      var lineIndentation = line[0].content.search(spaceSearch);
      lineProps.style = _objectSpread({}, lineProps.style || {}, {
        whiteSpace: 'pre-wrap',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        opacity: isLineDimmed(i + 1) ? 0.5 : 1
      });

      if (line[0].content && !line[0].empty) {
        line[0].content = line[0].content.trimLeft();
      }

      return React.createElement("div", _extends({
        key: i
      }, lineProps, {
        ref: i === 0 ? lineRef : undefined
      }), React.createElement("div", {
        style: lineNumberStyles
      }, i + 1), React.createElement("div", {
        style: {
          textAlign: "left",
          marginLeft: measureIndentation(lineIndentation),
          flex: 1,
          paddingLeft: '0.25em'
        }
      }, line.map(function (token, key) {
        return React.createElement("span", _extends({
          key: key
        }, getTokenProps({
          token: token,
          key: key
        })));
      })));
    }));
  }));
}

CodePane.propTypes = {
  autoFillHeight: _propTypes.default.bool,
  children: _propTypes.default.string.isRequired,
  fontSize: _propTypes.default.number,
  language: _propTypes.default.string.isRequired,
  highlightEnd: _propTypes.default.number,
  highlightStart: _propTypes.default.number,
  theme: _propTypes.default.object
};
CodePane.defaultProps = {
  language: 'javascript',
  theme: _vsDark.default,
  highlightStart: -Infinity,
  highlightEnd: Infinity
};