"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToggleFullScreen = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useToggleFullScreen = function useToggleFullScreen() {
  return _react.default.useCallback(function () {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
    if ('requestFullscreen' in document.documentElement) {
      // Chrome/FF
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } else if ('webkitRequestFullScreen' in document.documentElement) {
      // Safari still doesn't support standard.
      if (!document.webkitIsFullScreen) {
        document.documentElement.webkitRequestFullScreen();
      } else {
        document.webkitCancelFullScreen();
      }
    }
  }, []);
};

exports.useToggleFullScreen = useToggleFullScreen;