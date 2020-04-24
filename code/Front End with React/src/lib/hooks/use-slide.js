"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SlideContext = void 0;

var _react = _interopRequireDefault(require("react"));

var _useDeck = require("./use-deck");

var _constants = require("../utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Performs logic operations for all of the slide domain level.
 * slideElements are dynamic elements within the slide that may
 * appear/ move around etc.
 * If remaining elements in slide, these are brought in one by one.
 * If not, we tell the deck to take us to the next slide.
 *
 * Note: Immediate is a React-Spring property that we pass to the animations
 * essentially it skips animations.
 */
// Initialise SlideContext.
var SlideContext = _react.default.createContext();

exports.SlideContext = SlideContext;

function useSlide(slideNum) {
  // Gets state, dispatch and number of slides off DeckContext.
  var _React$useContext = _react.default.useContext(_useDeck.DeckContext),
      deckContextState = _React$useContext.state,
      deckContextDispatch = _React$useContext.dispatch,
      slideElementMap = _React$useContext.slideElementMap,
      numberOfSlides = _React$useContext.numberOfSlides;

  if (slideNum === 'undefined') {
    throw new Error('Must provide slide number to useSlide. Provided undefined instead.');
  }

  var reverseDirection = deckContextState.reverseDirection,
      immediate = deckContextState.immediate;
  var slideElementsLength = slideElementMap[slideNum];
  var isActiveSlide = deckContextState.currentSlide === slideNum;

  var setNotes = _react.default.useCallback(function (notes) {
    deckContextDispatch({
      type: 'SET_NOTES',
      payload: {
        notes: notes,
        slideNumber: slideNum
      }
    });
  }, [deckContextDispatch, slideNum]);

  var currentSlideElement = isActiveSlide ? deckContextState.currentSlideElement : _constants.DEFAULT_SLIDE_ELEMENT_INDEX;
  return {
    state: {
      reverseDirection: reverseDirection,
      slideElementsLength: slideElementsLength,
      currentSlideElement: currentSlideElement,
      immediate: immediate,
      isActiveSlide: isActiveSlide,
      numberOfSlides: numberOfSlides
    },
    actions: {
      setNotes: setNotes
    }
  };
}

var _default = useSlide;
exports.default = _default;