"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _constants = require("../utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background: #333;\n  border: 1px solid hsla(0, 0%, 0%, 0.4);\n  border-radius: 2px;\n  color: #fff;\n  box-shadow: inset 1px 1px 0 hsla(0, 0%, 100%, 0.1),\n    1px 1px 0 hsla(0, 0%, 0%, 0.1);\n  padding: 3px 20px;\n  font-size: 14px;\n  font-weight: bold;\n  font-family: ", ";\n\n  &:active {\n    box-shadow: inset 1px 1px 0 hsla(0, 0%, 0%, 0.25),\n      1px 1px 0 hsla(0, 0%, 0%, 0.1);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * This button is for internal controls like the presenter display.
 * It uses Formidable Spectacle-branded colors.
 */
var InternalButton = (0, _styledComponents.default)('button')(_templateObject(), _constants.SYSTEM_FONT);
var _default = InternalButton;
exports.default = _default;