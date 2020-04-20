"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _normalizeNewline = _interopRequireDefault(require("normalize-newline"));

var _indentNormalizer = _interopRequireDefault(require("../../utils/indent-normalizer"));

var _useDeck2 = _interopRequireWildcard(require("../../hooks/use-deck"));

var _isComponentType = _interopRequireDefault(require("../../utils/is-component-type"));

var _useUrlRouting2 = _interopRequireDefault(require("../../hooks/use-url-routing"));

var _presenterDeck = _interopRequireDefault(require("./presenter-deck"));

var _audienceDeck = _interopRequireDefault(require("./audience-deck"));

var _theme = require("../../theme");

var _printDeck = require("./print-deck");

var _reactSpring = require("react-spring");

var _useTransitionPipe = require("../../hooks/use-transition-pipe");

var _usePresentation2 = _interopRequireWildcard(require("../../hooks/use-presentation"));

var _useKeyboardControls = _interopRequireDefault(require("../../hooks/use-keyboard-controls"));

var _useTouchControls = _interopRequireDefault(require("../../hooks/use-touch-controls"));

var _constants = require("../../utils/constants");

var _searchChildrenAppear = _interopRequireDefault(require("../../utils/search-children-appear"));

var _searchChildrenStepper = _interopRequireDefault(require("../../utils/search-children-stepper"));

var _overviewDeck = _interopRequireDefault(require("./overview-deck"));

var _index = require("../../index");

var _notes = require("../../utils/notes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  height: 100vh;\n  width: 100vw;\n  position: fixed;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var AnimatedDeckDiv = (0, _styledComponents.default)(_reactSpring.animated.div)(_templateObject());
AnimatedDeckDiv.displayName = 'AnimatedDeckDiv';
var defaultTransition = {
  slide: {
    from: {
      position: 'fixed',
      transform: 'translate(100%, 0%)'
    },
    enter: {
      position: 'fixed',
      transform: 'translate(0, 0%)'
    },
    leave: {
      position: 'fixed',
      transform: 'translate(-100%, 0%)'
    },
    config: {
      precision: 0
    }
  },
  fade: {
    enter: {
      opacity: 1
    },
    from: {
      opacity: 0
    },
    leave: {
      opacity: 0
    },
    config: {
      precision: 0
    }
  },
  none: {
    enter: {},
    from: {},
    leave: {},
    config: {
      precision: 0
    }
  }
};
var builtInTransitions = Object.keys(defaultTransition);
/**
 * Provides top level state/context provider with useDeck hook
 * Should wrap all the presentation components (slides, etc)
 *
 * Props = {
 *  loop: bool (pass in true if you want slides to loop)
 * transitionEffect: based off of react sprint useTransition
 * }
 *
 * Note: Immediate is a React-Spring property that we pass to the animations
 * essentially it skips animations.
 */

var initialState = {
  currentSlide: _constants.DEFAULT_SLIDE_INDEX,
  immediate: false,
  immediateElement: false,
  currentSlideElement: _constants.DEFAULT_SLIDE_ELEMENT_INDEX,
  reverseDirection: false,
  presenterMode: false,
  overviewMode: false,
  notes: {},
  resolvedInitialUrl: false
};

var mapMarkdownIntoSlides = function mapMarkdownIntoSlides(child, index) {
  if ((0, _isComponentType.default)(child, _index.Markdown.name) && Boolean(child.props.containsSlides)) {
    return child.props.children.split(/\n\s*---\n/).map(function (markdown, mdIndex) {
      var content = (0, _normalizeNewline.default)((0, _indentNormalizer.default)(markdown));
      var contentWithoutNotes = (0, _notes.removeNotes)(content);
      var notes = (0, _notes.isolateNotes)(content);
      return _react.default.createElement(_index.Slide, {
        key: "md-slide-".concat(index, "-").concat(mdIndex)
      }, _react.default.createElement(_index.Markdown, null, contentWithoutNotes), _react.default.createElement(_index.Notes, null, notes));
    });
  }

  return child;
};

var Deck = function Deck(props) {
  var children = props.children,
      loop = props.loop,
      keyboardControls = props.keyboardControls,
      animationsWhenGoingBack = props.animationsWhenGoingBack,
      backgroundColor = props.backgroundColor,
      textColor = props.textColor,
      template = props.template,
      transitionEffect = props.transitionEffect;

  if (_react.default.Children.count(children) === 0) {
    throw new Error('Spectacle must have at least one slide to run.');
  }

  var filteredChildren = _react.default.Children.map(children, mapMarkdownIntoSlides).reduce(function (acc, slide) {
    return acc.concat(slide);
  }, []).filter(function (child) {
    return (0, _isComponentType.default)(child, _index.Slide.name);
  });

  var numberOfSlides = filteredChildren.length;

  if (numberOfSlides === 0) {
    throw new Error('Spectacle must have at least one slide to run.');
  }

  var slideElementMap = _react.default.useMemo(function () {
    return filteredChildren.reduce(function (map, slide, index) {
      var appearElements = (0, _searchChildrenAppear.default)(slide.props.children);
      var stepperElements = (0, _searchChildrenStepper.default)(slide.props.children);
      map[index] = appearElements + stepperElements;
      return map;
    }, {});
  }, [filteredChildren]); // Initialise useDeck hook and get state and dispatch off of it


  var _useDeck = (0, _useDeck2.default)(_objectSpread({}, initialState, {
    numberOfSlides: numberOfSlides
  })),
      state = _useDeck.state,
      dispatch = _useDeck.dispatch;

  var themeContext = _react.default.useContext(_styledComponents.ThemeContext);

  _react.default.useLayoutEffect(function () {
    document.body.style.margin = '0';
    document.body.style.background = '#000';
    document.body.style.color = themeContext.colors[textColor] || textColor || themeContext.colors.primary;
  }, [backgroundColor, textColor, themeContext.colors]);

  var _usePresentation = (0, _usePresentation2.default)(),
      startConnection = _usePresentation.startConnection,
      terminateConnection = _usePresentation.terminateConnection,
      sendMessage = _usePresentation.sendMessage,
      errors = _usePresentation.errors,
      addMessageHandler = _usePresentation.addMessageHandler,
      isReceiver = _usePresentation.isReceiver,
      isController = _usePresentation.isController;

  var onUrlChange = _react.default.useCallback(function (update) {
    if (isController) {
      sendMessage({
        type: _usePresentation2.MSG_SLIDE_STATE_CHANGE,
        payload: update
      });
    }
  }, [sendMessage, isController]);

  var _useUrlRouting = (0, _useUrlRouting2.default)({
    dispatch: dispatch,
    currentSlide: state.currentSlide,
    currentSlideElement: state.currentSlideElement,
    currentPresenterMode: state.presenterMode,
    slideElementMap: slideElementMap,
    loop: loop,
    animationsWhenGoingBack: animationsWhenGoingBack,
    onUrlChange: onUrlChange
  }),
      navigateToNext = _useUrlRouting.navigateToNext,
      navigateToPrevious = _useUrlRouting.navigateToPrevious,
      navigateTo = _useUrlRouting.navigateTo,
      toggleMode = _useUrlRouting.toggleMode,
      goToSlide = _useUrlRouting.goToSlide;

  (0, _useKeyboardControls.default)({
    keyboardControls: keyboardControls,
    navigateToNext: navigateToNext,
    navigateToPrevious: navigateToPrevious,
    toggleMode: toggleMode
  });
  (0, _useTouchControls.default)({
    navigateToNext: navigateToNext,
    navigateToPrevious: navigateToPrevious
  });

  var _React$useContext = _react.default.useContext(_useTransitionPipe.TransitionPipeContext),
      runTransition = _React$useContext.runTransition;

  var slideTransitionEffect = filteredChildren[state.currentSlide].props.transitionEffect || {};

  var transitionRef = _react.default.useRef(null);

  var broadcastChannelRef = _react.default.useRef(null);

  _react.default.useEffect(function () {
    if (typeof MessageChannel !== 'undefined') {
      broadcastChannelRef.current = new BroadcastChannel('spectacle_presenter_mode_channel');
    }

    return function () {
      if (!broadcastChannelRef.current) {
        return;
      }

      broadcastChannelRef.current.close();
    };
  }, []);

  _react.default.useEffect(function () {
    if (broadcastChannelRef.current && typeof broadcastChannelRef.current.postMessage === 'function') {
      broadcastChannelRef.current.onmessage = function (message) {
        if (state.presenterMode) {
          return;
        }

        var _JSON$parse = JSON.parse(message.data),
            slide = _JSON$parse.slide,
            element = _JSON$parse.element;

        navigateTo({
          slideIndex: slide,
          elementIndex: element
        });
      };

      if (state.presenterMode) {
        var slideData = {
          slide: state.currentSlide,
          element: state.currentSlideElement
        };
        broadcastChannelRef.current.postMessage(JSON.stringify(slideData));
      }
    }
  }, [state.currentSlide, state.currentSlideElement, state.presenterMode, navigateTo]);

  _react.default.useEffect(function () {
    if (!transitionRef.current) {
      return;
    }

    runTransition(transitionRef.current);
  }, [transitionRef, state.currentSlide, runTransition]);

  var currentTransition = {};

  if (typeof slideTransitionEffect === 'string' && builtInTransitions.includes(slideTransitionEffect)) {
    currentTransition = defaultTransition[slideTransitionEffect];
  } else if (_typeof(slideTransitionEffect) === 'object' && Object.keys(slideTransitionEffect).length !== 0) {
    currentTransition = slideTransitionEffect;
  } else if (typeof transitionEffect === 'string' && builtInTransitions.includes(transitionEffect)) {
    currentTransition = defaultTransition[transitionEffect];
  } else if (_typeof(transitionEffect) === 'object' && Object.keys(transitionEffect).length !== 0) {
    currentTransition = transitionEffect;
  } else {
    currentTransition = defaultTransition['slide'];
  }

  var transitions = (0, _reactSpring.useTransition)(state.currentSlide, function (p) {
    return p;
  }, {
    ref: transitionRef,
    enter: currentTransition.enter,
    leave: currentTransition.leave,
    from: currentTransition.from,
    unique: true,
    immediate: state.immediate
  });
  var content = null;

  if (state.resolvedInitialUrl) {
    if (state.overviewMode) {
      var staticSlides = filteredChildren.map(function (slide, index) {
        return _react.default.cloneElement(slide, {
          slideNum: index,
          template: template
        });
      });
      content = _react.default.createElement(_overviewDeck.default, {
        goToSlide: goToSlide
      }, staticSlides);
    } else if (state.exportMode) {
      var _staticSlides = filteredChildren.map(function (slide, index) {
        return _react.default.cloneElement(slide, {
          slideNum: index,
          template: template
        });
      });

      content = _react.default.createElement(_printDeck.PrintDeck, null, _staticSlides);
    } else if (state.presenterMode) {
      var _staticSlides2 = filteredChildren.map(function (slide, index) {
        return _react.default.cloneElement(slide, {
          slideNum: index,
          template: template
        });
      });

      content = _react.default.createElement(_presenterDeck.default, {
        isController: isController,
        isReceiver: isReceiver,
        startConnection: startConnection,
        terminateConnection: terminateConnection
      }, _staticSlides2);
    } else {
      var animatedSlides = transitions.map(function (_ref) {
        var item = _ref.item,
            animatedStyleProps = _ref.props,
            key = _ref.key;
        return _react.default.createElement(AnimatedDeckDiv, {
          style: animatedStyleProps,
          key: key
        }, _react.default.cloneElement(filteredChildren[item], {
          slideNum: item,
          numberOfSlides: numberOfSlides,
          template: template
        }));
      });
      content = _react.default.createElement(_audienceDeck.default, {
        addMessageHandler: addMessageHandler
      }, animatedSlides);
    }
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_useDeck2.DeckContext.Provider, {
    value: {
      state: state,
      dispatch: dispatch,
      numberOfSlides: numberOfSlides,
      keyboardControls: keyboardControls,
      animationsWhenGoingBack: animationsWhenGoingBack,
      slideElementMap: slideElementMap,
      goToSlide: goToSlide
    }
  }, content));
};

Deck.propTypes = {
  animationsWhenGoingBack: _propTypes.default.bool.isRequired,
  backgroundColor: _propTypes.default.string,
  children: _propTypes.default.node.isRequired,
  keyboardControls: _propTypes.default.oneOf(['arrows', 'space']),
  loop: _propTypes.default.bool.isRequired,
  template: _propTypes.default.func,
  textColor: _propTypes.default.string,
  theme: _propTypes.default.object,
  transitionEffect: _propTypes.default.oneOfType([_propTypes.default.shape({
    from: _propTypes.default.object,
    enter: _propTypes.default.object,
    leave: _propTypes.default.object
  }), _propTypes.default.oneOf(['fade', 'slide', 'none'])])
};

var ConnectedDeck = function ConnectedDeck(props) {
  return _react.default.createElement(_styledComponents.ThemeProvider, {
    theme: (0, _theme.mergeTheme)(props.theme)
  }, _react.default.createElement(_useTransitionPipe.TransitionPipeProvider, null, _react.default.createElement(Deck, props)));
};

ConnectedDeck.propTypes = Deck.propTypes;
ConnectedDeck.defaultProps = {
  loop: false,
  keyboardControls: 'arrows',
  animationsWhenGoingBack: false
};
var _default = ConnectedDeck;
exports.default = _default;