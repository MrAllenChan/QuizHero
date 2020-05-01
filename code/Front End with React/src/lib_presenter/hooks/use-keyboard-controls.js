"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _debounce = _interopRequireDefault(require("../utils/debounce"));

var _useFullScreen = require("./use-full-screen");

var _detectPlatform = require("../utils/detect-platform");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useKeyboardControls = function useKeyboardControls(_ref) {
  var _ref$keyboardControls = _ref.keyboardControls,
      keyboardControls = _ref$keyboardControls === void 0 ? 'arrows' : _ref$keyboardControls,
      navigateToNext = _ref.navigateToNext,
      navigateToPrevious = _ref.navigateToPrevious,
      toggleMode = _ref.toggleMode;

  var keyPressCount = _react.default.useRef(0);

  var toggleFullScreen = (0, _useFullScreen.useToggleFullScreen)();

  _react.default.useEffect(function () {
    // Keep track of the number of next slide presses for debounce
    // Create ref for debounceing function
    var debouncedDispatch = (0, _debounce.default)(function () {
      var immediate = keyPressCount.current !== 1;
      navigateToNext({
        immediate: immediate
      });
      keyPressCount.current = 0;
    }, 200);

    function handleKeyDown(e) {
      if (keyboardControls === 'arrows') {
        if (e.key === 'ArrowLeft') {
          navigateToPrevious();
        }

        if (e.key === 'ArrowRight') {
          keyPressCount.current++;
          debouncedDispatch();
        }
      }

      if (keyboardControls === 'space') {
        if (e.code === 'Space') {
          keyPressCount.current++;
          debouncedDispatch();
          e.preventDefault();
        }
      }

      if (!!e.altKey && (0, _detectPlatform.isMacOS)()) {
        switch (e.key) {
          case 'ø':
            toggleMode('overviewMode');
            break;

          case 'π':
            toggleMode('presenterMode');
            break;

          case 'ƒ':
            toggleFullScreen();
            break;

          // default:
          //   null;
        }
      } else if (!!e.altKey && !!e.shiftKey && (0, _detectPlatform.isWindows)()) {
        switch (e.key) {
          case 'O':
            toggleMode('overviewMode');
            break;

          case 'P':
            toggleMode('presenterMode');
            break;

          case 'F':
            toggleFullScreen();
            break;

          // default:
          //   null;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return function () {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyboardControls, navigateToNext, navigateToPrevious, toggleFullScreen, toggleMode]);
};

var _default = useKeyboardControls;
exports.default = _default;