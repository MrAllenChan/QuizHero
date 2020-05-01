"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = searchChildrenForAppear;

var _isComponentType = _interopRequireDefault(require("../utils/is-component-type"));

var _appear = _interopRequireDefault(require("../components/appear"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function searchChildrenForAppear(children) {
  var _ref, _children$props;

  var isSingleChild = (_ref = children === null || children === void 0 ? void 0 : (_children$props = children.props) === null || _children$props === void 0 ? void 0 : _children$props.children) !== null && _ref !== void 0 ? _ref : false;

  if (!Array.isArray(children) && !isSingleChild) {
    return 0;
  }

  return (isSingleChild ? [children] : children).reduce(function (memo, current) {
    if ((0, _isComponentType.default)(current, _appear.default.name)) {
      memo += 1;
    } else {
      var _current$props;

      memo += searchChildrenForAppear(current === null || current === void 0 ? void 0 : (_current$props = current.props) === null || _current$props === void 0 ? void 0 : _current$props.children);
    }

    return memo;
  }, 0);
}