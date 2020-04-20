"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useUrlRouting;

var React = _interopRequireWildcard(require("react"));

var _history = require("history");

var queryString = _interopRequireWildcard(require("query-string"));

var _constants = require("../utils/constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useUrlRouting(options) {
  var dispatch = options.dispatch,
      slideElementMap = options.slideElementMap,
      currentSlide = options.currentSlide,
      currentSlideElement = options.currentSlideElement,
      currentPresenterMode = options.currentPresenterMode,
      currentOverviewMode = options.currentOverviewMode,
      currentExportMode = options.currentExportMode,
      currentPrintMode = options.currentPrintMode,
      loop = options.loop,
      animationsWhenGoingBack = options.animationsWhenGoingBack,
      onUrlChange = options.onUrlChange,
      customHistory = options.customHistory;
  var history = React.useRef(customHistory || (0, _history.createBrowserHistory)());
  var numberOfSlides = React.useMemo(function () {
    return Object.getOwnPropertyNames(slideElementMap).length;
  }, [slideElementMap]);
  var countSlideElements = React.useCallback(function (slideNumber) {
    return slideElementMap[slideNumber];
  }, [slideElementMap]);
  var isSlideOutOfBounds = React.useCallback(function (proposedSlideNumber) {
    return isNaN(proposedSlideNumber) || numberOfSlides - 1 < proposedSlideNumber;
  }, [numberOfSlides]);
  var isSlideElementOutOfBounds = React.useCallback(function (proposedSlideElementNumber, slideElementsLength) {
    var val = isNaN(proposedSlideElementNumber) || proposedSlideElementNumber >= slideElementsLength || proposedSlideElementNumber < _constants.DEFAULT_SLIDE_ELEMENT_INDEX;

    return val;
  }, []);
  var stateFromUrl = React.useCallback(function (url) {
    var query = queryString.parse(url);
    var immediate = Boolean(query.immediate);
    var presenterMode = Boolean(query.presenterMode);
    var exportMode = Boolean(query.exportMode);
    var printMode = Boolean(query.printMode);
    var overviewMode = Boolean(query.overviewMode);
    var proposedSlideNumber = parseInt(query.slide, 10);
    var proposedSlideElementNumber = parseInt(query.slideElement, 10);
    var slideNumber = isSlideOutOfBounds(proposedSlideNumber) ? _constants.DEFAULT_SLIDE_INDEX : proposedSlideNumber;
    var slideElementsLength = countSlideElements(slideNumber);
    var slideElementNumber = isSlideElementOutOfBounds(proposedSlideElementNumber, slideElementsLength) ? _constants.DEFAULT_SLIDE_ELEMENT_INDEX : proposedSlideElementNumber;

    if (overviewMode && presenterMode) {
      throw new Error('Presenter Mode and Overview Mode cannot be used at the same time.');
    }

    return {
      immediate: immediate,
      presenterMode: presenterMode,
      overviewMode: overviewMode,
      proposedSlideNumber: proposedSlideNumber,
      proposedSlideElementNumber: proposedSlideElementNumber,
      slideNumber: slideNumber,
      slideElementNumber: slideElementNumber,
      exportMode: exportMode,
      printMode: printMode
    };
  }, [countSlideElements, isSlideElementOutOfBounds, isSlideOutOfBounds]);
  var goToSlide = React.useCallback(function (slideNumber) {
    var immediate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var qs = queryString.stringify({
      presenterMode: currentPresenterMode || undefined,
      overviewMode: currentOverviewMode || undefined,
      exportMode: currentExportMode || undefined,
      immediate: immediate,
      slide: slideNumber,
      slideElement: _constants.DEFAULT_SLIDE_ELEMENT_INDEX,
      printMode: currentPrintMode || undefined
    });
    history.current.push("?".concat(qs));
  }, [currentPresenterMode, currentOverviewMode, currentExportMode, currentPrintMode]);
  var onHistoryChange = React.useCallback(function () {
    var _stateFromUrl = stateFromUrl(window.location.search),
        slideNumber = _stateFromUrl.slideNumber,
        slideElementNumber = _stateFromUrl.slideElementNumber,
        proposedSlideNumber = _stateFromUrl.proposedSlideNumber,
        proposedSlideElementNumber = _stateFromUrl.proposedSlideElementNumber,
        presenterMode = _stateFromUrl.presenterMode,
        overviewMode = _stateFromUrl.overviewMode,
        immediate = _stateFromUrl.immediate,
        exportMode = _stateFromUrl.exportMode,
        printMode = _stateFromUrl.printMode;
    /**
     * If the proposed URL slide index is out-of-bounds or is not a valid
     * integer, navigate to the first slide. Do nothing if the proposed slide
     * number is the same as the current slide.
     */


    if (proposedSlideNumber !== slideNumber || proposedSlideElementNumber !== slideElementNumber) {
      var qs = queryString.stringify({
        slide: slideNumber,
        slideElement: slideElementNumber,
        immediate: immediate || undefined,
        presenterMode: presenterMode || undefined,
        overviewMode: overviewMode || undefined,
        exportMode: exportMode || undefined,
        printMode: printMode || undefined
      });
      history.current.replace("?".concat(qs));
      return;
    }

    var reverseDirection = slideNumber < currentSlide || slideElementNumber < currentSlideElement;
    var update = {
      slideNumber: slideNumber,
      slideElementNumber: slideElementNumber,
      reverseDirection: reverseDirection,
      immediate: immediate
    };
    dispatch({
      type: 'GO_TO_SLIDE',
      payload: _objectSpread({}, update, {
        presenterMode: presenterMode,
        overviewMode: overviewMode,
        exportMode: exportMode,
        printMode: printMode
      })
    });
    onUrlChange(update);
  }, [stateFromUrl, currentSlide, currentSlideElement, dispatch, onUrlChange]);
  var nextSafeSlide = React.useCallback(function () {
    if (currentSlide + 1 > numberOfSlides - 1 && loop) {
      return _constants.DEFAULT_SLIDE_INDEX;
    }

    return Math.min(currentSlide + 1, numberOfSlides - 1);
  }, [currentSlide, loop, numberOfSlides]);
  /**
   * This method will navigate to whatever index is specified. It is for
   * internal use only, such as presenter mode, as it does not check bounds.
   */

  var navigateTo = React.useCallback(function (_ref) {
    var slideIndex = _ref.slideIndex,
        elementIndex = _ref.elementIndex,
        _ref$immediate = _ref.immediate,
        immediate = _ref$immediate === void 0 ? false : _ref$immediate;
    var qs = queryString.stringify({
      slide: slideIndex,
      slideElement: elementIndex,
      immediate: immediate || undefined,
      presenterMode: currentPresenterMode || undefined,
      overviewMode: currentOverviewMode || undefined,
      exportMode: currentExportMode || undefined,
      printMode: currentPrintMode || undefined
    });
    history.current.push("?".concat(qs));
  });
  var navigateToNext = React.useCallback(function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        immediate = _ref2.immediate;

    var slideElementsLength = countSlideElements(currentSlide);
    var atLastElement = currentSlideElement + 1 === slideElementsLength || slideElementsLength === 0;
    var atLastSlide = currentSlide + 1 === numberOfSlides || numberOfSlides === 0;
    var nextSafeSlideIndex = currentSlide;
    var nextSafeSlideElementIndex = _constants.DEFAULT_SLIDE_ELEMENT_INDEX;

    if (atLastElement && atLastSlide) {
      if (!loop) {
        return;
      }

      nextSafeSlideIndex = _constants.DEFAULT_SLIDE_INDEX;
      nextSafeSlideElementIndex = _constants.DEFAULT_SLIDE_ELEMENT_INDEX;
    } else if (atLastElement) {
      // advance to the next safe slide
      nextSafeSlideIndex = nextSafeSlide();
      nextSafeSlideElementIndex = _constants.DEFAULT_SLIDE_ELEMENT_INDEX;
    } else {
      // advance to the next slide element
      nextSafeSlideElementIndex = currentSlideElement + 1;
    }

    var qs = queryString.stringify({
      slide: nextSafeSlideIndex,
      slideElement: nextSafeSlideElementIndex,
      immediate: immediate || undefined,
      presenterMode: currentPresenterMode || undefined,
      overviewMode: currentOverviewMode || undefined,
      exportMode: currentExportMode || undefined,
      printMode: currentPrintMode || undefined
    });
    history.current.push("?".concat(qs));
  }, [countSlideElements, currentSlide, currentSlideElement, numberOfSlides, currentPresenterMode, currentOverviewMode, currentExportMode, currentPrintMode, loop, nextSafeSlide]);
  var previousSafeSlide = React.useCallback(function () {
    if (currentSlide - 1 < 0 && loop) {
      return numberOfSlides - 1;
    }

    return Math.max(0, currentSlide - 1);
  }, [currentSlide, loop, numberOfSlides]);
  var navigateToPrevious = React.useCallback(function () {
    var immediate = !animationsWhenGoingBack;
    var slideElementsLength = countSlideElements(currentSlide);
    var atNoElement = currentSlideElement === _constants.DEFAULT_SLIDE_ELEMENT_INDEX || slideElementsLength === 0;
    var atFirstSlide = currentSlide === 0 || numberOfSlides === 0;
    var previousSafeSlideIndex = currentSlide;
    var previousSafeSlideElementIndex = _constants.DEFAULT_SLIDE_ELEMENT_INDEX;

    if (atNoElement && atFirstSlide) {
      if (!loop) {
        return;
      }

      previousSafeSlideIndex = numberOfSlides - 1;
    } else if (currentSlideElement < 0) {
      // back up to the previous safe slide
      previousSafeSlideIndex = previousSafeSlide();
      previousSafeSlideElementIndex = countSlideElements(previousSafeSlideIndex) - 1;
    } else {
      // back up to the previous slide element
      previousSafeSlideElementIndex = currentSlideElement - 1;
    }

    var qs = queryString.stringify({
      slide: previousSafeSlideIndex,
      slideElement: previousSafeSlideElementIndex,
      immediate: immediate || undefined,
      presenterMode: currentPresenterMode || undefined,
      overviewMode: currentOverviewMode || undefined,
      exportMode: currentExportMode || undefined
    });
    history.current.push("?".concat(qs));
  }, [animationsWhenGoingBack, countSlideElements, currentSlide, currentSlideElement, numberOfSlides, currentPresenterMode, currentOverviewMode, currentExportMode, loop, previousSafeSlide]);
  React.useEffect(function () {
    var removeHistoryListener = history.current.listen(onHistoryChange);
    return function () {
      removeHistoryListener();
    };
  }, [onHistoryChange]);
  /**
   * In order for Deck to render the correct type of sub-deck,
   * we need for certain state from the url to be written to the
   * DeckContext. For example, we need to know whether or not this
   * browser is in presenter mode.
   */

  React.useEffect(function () {
    onHistoryChange();
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  var toggleMode = React.useCallback(function (s) {
    return dispatch({
      type: 'TOGGLE_MODE',
      payload: {
        mode: s
      }
    });
  }, [dispatch]);
  return {
    navigateToNext: navigateToNext,
    navigateToPrevious: navigateToPrevious,
    navigateTo: navigateTo,
    toggleMode: toggleMode,
    goToSlide: goToSlide
  };
}