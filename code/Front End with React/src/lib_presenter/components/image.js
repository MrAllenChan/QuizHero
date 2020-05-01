"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullSizeImage = exports.Image = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledSystem = require("styled-system");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = (0, _styledComponents.default)('img')((0, _styledSystem.compose)(_styledSystem.layout, _styledSystem.position));
exports.Image = Image;
var FullSizeImage = (0, _styledComponents.default)(Image);
exports.FullSizeImage = FullSizeImage;
FullSizeImage.defaultProps = {
  maxWidth: '100%',
  maxHeight: '100%'
};