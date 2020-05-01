"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = searchChildrenForStepper;

var _isComponentType = _interopRequireDefault(require("./is-component-type"));

var _stepper = _interopRequireDefault(require("../components/stepper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function searchChildrenForStepper(children) {
  if (!Array.isArray(children)) {
    return 0;
  }

  return children.reduce(function (memo, current) {
    var _current$props, _current$props$childr;

    if ((0, _isComponentType.default)(current, _stepper.default.name)) {
      var values = current.props.values;
      memo += Array.isArray(values) ? values.length : 0;
    } else if ((current === null || current === void 0 ? void 0 : (_current$props = current.props) === null || _current$props === void 0 ? void 0 : (_current$props$childr = _current$props.children) === null || _current$props$childr === void 0 ? void 0 : _current$props$childr.length) > 0) {
      memo += searchChildrenForStepper(current.props.children);
    }

    return memo;
  }, 0);
}