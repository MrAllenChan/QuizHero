"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = exports.FlexBox = exports.Box = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledSystem = require("styled-system");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Box = (0, _styledComponents.default)('div')((0, _styledSystem.compose)(_styledSystem.space, _styledSystem.layout, _styledSystem.position, _styledSystem.color, _styledSystem.border));
exports.Box = Box;
var FlexBox = (0, _styledComponents.default)('div')((0, _styledSystem.compose)(_styledSystem.layout, _styledSystem.space, _styledSystem.flexbox, _styledSystem.position, _styledSystem.border, _styledSystem.color));
exports.FlexBox = FlexBox;
FlexBox.defaultProps = {
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex'
};
var Grid = (0, _styledComponents.default)('div')((0, _styledSystem.compose)(_styledSystem.layout, _styledSystem.grid, _styledSystem.position));
exports.Grid = Grid;
Grid.defaultProps = {
  display: 'grid'
};