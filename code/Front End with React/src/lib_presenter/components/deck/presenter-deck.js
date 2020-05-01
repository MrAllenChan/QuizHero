"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useDeck = require("../../hooks/use-deck");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _typography = require("../typography");

var _layout = require("../layout");

var queryString = _interopRequireWildcard(require("query-string"));

var _timer = require("./timer");

var _logo = _interopRequireDefault(require("../logo"));

var _logo2 = _interopRequireDefault(require("../logo.png"));

var _internalButton = _interopRequireDefault(require("../internal-button"));

var _constants = require("../../utils/constants");

require("broadcastchannel-polyfill");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  border-top: 1px solid black;\n  overflow-y: scroll;\n  background: #404040;\n  flex: 1;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  background: hsla(0, 0%, 100%, 0.1);\n  border-radius: 4px;\n  font-size: 0.7em;\n  padding: 1px 4px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n      flex: 0.8;\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  flex: 1;\n  width: 100%;\n  position: relative;\n\n  .spectacle-fullscreen-button {\n    display: none;\n  }\n\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  height: calc(50% - 1em);\n  width: 100%;\n  overflow: hidden;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 50%;\n  > :first-child {\n    margin-bottom: 0.5em;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  background: #383838;\n  width: 50%;\n  border-right: 1px solid black;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: row;\n  background-color: #282828;\n  overflow: hidden;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var PresenterDeckContainer = (0, _styledComponents.default)('div')(_templateObject());
var NotesColumn = (0, _styledComponents.default)('div')(_templateObject2());
var PreviewColumn = (0, _styledComponents.default)('div')(_templateObject3());
var SlideContainer = (0, _styledComponents.default)('div')(_templateObject4());
var SlideWrapper = (0, _styledComponents.default)('div')(_templateObject5(), function (_ref) {
  var small = _ref.small;
  return small && (0, _styledComponents.css)(_templateObject6());
});
var SlideCountLabel = (0, _styledComponents.default)('span')(_templateObject7());
var NotesContainer = (0, _styledComponents.default)('div')(_templateObject8());

var PresenterDeck = function PresenterDeck(props) {
  var _React$useContext = _react.default.useContext(_useDeck.DeckContext),
      _React$useContext$sta = _React$useContext.state,
      currentNotes = _React$useContext$sta.currentNotes,
      currentSlide = _React$useContext$sta.currentSlide,
      currentSlideElement = _React$useContext$sta.currentSlideElement,
      immediate = _React$useContext$sta.immediate,
      numberOfSlides = _React$useContext$sta.numberOfSlides;

  var isController = props.isController,
      isReceiver = props.isReceiver,
      startConnection = props.startConnection,
      terminateConnection = props.terminateConnection,
      children = props.children;

  var onStartConnection = _react.default.useCallback(function () {
    var urlParams = queryString.stringify({
      slide: currentSlide,
      slideElement: currentSlideElement,
      immediate: immediate || undefined
    });
    startConnection(urlParams);
  }, [currentSlide, currentSlideElement, immediate, startConnection]);

  var activeSlide = children.length > currentSlide ? children[currentSlide] : null;
  var nextSlide = children.length > currentSlide + 1 ? children[currentSlide + 1] : null; // const castButton = React.useMemo(() => {
  //   if (isReceiver || typeof window.navigator.presentation === 'undefined') {
  //     return null;
  //   }
  //   if (isController) {
  //     return (
  //       <InternalButton
  //         data-testid="Close Connection"
  //         onClick={terminateConnection}
  //       >
  //         Stop Casting
  //       </InternalButton>
  //     );
  //   }
  //   return (
  //     <InternalButton
  //       data-testid="Start Connection"
  //       onClick={onStartConnection}
  //     >
  //       Cast to Secondary Display
  //     </InternalButton>
  //   );
  // }, []);

  var castButton = _react.default.useMemo(function () {
    return _react.default.createElement(_internalButton.default, {
      onClick: function onClick() {
        window.open("/presenter?immediate=".concat(immediate, "&slide=").concat(currentSlide, "&slideElement=").concat(currentSlideElement), 'newWindow', 'menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1');
      }
    }, "Open a audience window");
  }, [currentSlide, currentSlideElement, immediate]);

  return _react.default.createElement(PresenterDeckContainer, null, _react.default.createElement(NotesColumn, null, _react.default.createElement(_layout.FlexBox, {
    justifyContent: "space-between",
    paddingTop: 10,
    paddingX: 15
  }, _react.default.createElement("img", {
    src: _logo2.default,
    width: "100"
  }), _react.default.createElement(_layout.FlexBox, {
    width: 0.75,
    flexDirection: "column",
    alignItems: "flex-end"
  }, _react.default.createElement(_typography.Text, {
    "data-testid": "use-browser-tab-text",
    fontSize: 15,
    fontFamily: _constants.SYSTEM_FONT,
    textAlign: "right",
    padding: "0px",
    margin: "0px 0px 10px"
  }, "Open a second browser window at ", window.location.host, "/presenter to use as the audience deck", "."), castButton)), _react.default.createElement(_layout.Box, {
    paddingRight: 15
  }, _react.default.createElement(_timer.Timer, null)), _react.default.createElement(NotesContainer, null, _react.default.createElement(_typography.Text, {
    fontFamily: _constants.SYSTEM_FONT,
    lineHeight: "1.2",
    fontSize: "1.5vw"
  }, currentNotes))), _react.default.createElement(PreviewColumn, null, _react.default.createElement(SlideContainer, null, _react.default.createElement(_typography.Text, {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: _constants.SYSTEM_FONT,
    textAlign: "center"
  }, "Current\xA0", _react.default.createElement(SlideCountLabel, null, "Slide ", activeSlide.props.slideNum + 1, " of ", numberOfSlides)), _react.default.createElement(SlideWrapper, null, activeSlide)), !!nextSlide && _react.default.createElement(SlideContainer, null, _react.default.createElement(_typography.Text, {
    fontSize: 20,
    fontFamily: _constants.SYSTEM_FONT,
    fontWeight: "bold",
    textAlign: "center"
  }, "Next\xA0", _react.default.createElement(SlideCountLabel, null, "Slide ", nextSlide.props.slideNum + 1, " of ", numberOfSlides)), _react.default.createElement(SlideWrapper, {
    small: true,
    "data-testid": "Next Slide"
  }, nextSlide))));
};

PresenterDeck.propTypes = {
  children: _propTypes.default.node.isRequired,
  isController: _propTypes.default.bool.isRequired,
  isReceiver: _propTypes.default.bool.isRequired,
  startConnection: _propTypes.default.func.isRequired,
  terminateConnection: _propTypes.default.func.isRequired
};
var _default = PresenterDeck;
exports.default = _default;