"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useSlide = require("../hooks/use-slide");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notes = function Notes(_ref) {
  var children = _ref.children;

  var _React$useContext = _react.default.useContext(_useSlide.SlideContext),
      setNotes = _React$useContext.actions.setNotes;

  _react.default.useEffect(function () {
    setNotes(children);
  }, [setNotes, children]);

  return null;
};

Notes.propTypes = {
  children: _propTypes.default.node.isRequired
};
var _default = Notes;
exports.default = _default;