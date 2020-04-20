"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DeckContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Performs logic operations for all of the deck domain level.
 * Note: Immediate is a React-Spring property that we pass to the animations
 * essentially it skips animations.
 */
var DeckContext = _react.default.createContext();

exports.DeckContext = DeckContext;

function useDeck(initialState) {
  function reducer(state, action) {
    switch (action.type) {
      case 'GO_TO_SLIDE':
        {
          var newState = _objectSpread({}, state, {
            currentSlideElement: action.payload.slideElementNumber,
            currentSlide: action.payload.slideNumber,
            immediate: action.payload.immediate,
            immediateElement: false,
            reverseDirection: action.payload.reverseDirection,
            presenterMode: action.payload.presenterMode,
            overviewMode: action.payload.overviewMode,
            exportMode: action.payload.exportMode,
            printMode: action.payload.printMode,
            resolvedInitialUrl: true
          });

          return newState;
        }

      case 'SET_NOTES':
        {
          return _objectSpread({}, state, {
            notes: _objectSpread({}, state.notes, _defineProperty({}, action.payload.slideNumber, action.payload.notes))
          });
        }

      case 'TOGGLE_MODE':
        {
          return _objectSpread({}, state, _defineProperty({}, action.payload.mode, !state[action.payload.mode]));
        }

      default:
        return _objectSpread({}, state);
    }
  }

  var _React$useReducer = _react.default.useReducer(reducer, initialState),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      state = _React$useReducer2[0],
      dispatch = _React$useReducer2[1]; // derived state


  var currentNotes = _react.default.useMemo(function () {
    return state.notes[state.currentSlide];
  }, [state.currentSlide, state.notes]);

  var allState = _react.default.useMemo(function () {
    return _objectSpread({}, state, {
      currentNotes: currentNotes
    });
  }, [currentNotes, state]);

  return {
    state: allState,
    dispatch: dispatch
  };
}

var _default = useDeck;
exports.default = _default;