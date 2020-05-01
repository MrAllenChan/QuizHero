"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableBody = exports.TableHeader = exports.TableRow = exports.TableCell = exports.Table = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledSystem = require("styled-system");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = (0, _styledComponents.default)('table')((0, _styledSystem.compose)(_styledSystem.color, _styledSystem.typography, _styledSystem.space, _styledSystem.border, _styledSystem.layout));
exports.Table = Table;
Table.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin',
  width: 1
};
var TableHeader = (0, _styledComponents.default)('thead')((0, _styledSystem.compose)(_styledSystem.color, _styledSystem.typography, _styledSystem.space, _styledSystem.border, _styledSystem.layout));
exports.TableHeader = TableHeader;
TableHeader.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  fontWeight: 'bold',
  textAlign: 'left',
  margin: 'listMargin'
};
var TableBody = (0, _styledComponents.default)('tbody')((0, _styledSystem.compose)(_styledSystem.color, _styledSystem.typography, _styledSystem.space, _styledSystem.border, _styledSystem.layout));
exports.TableBody = TableBody;
TableBody.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin',
  width: 1
};
var TableRow = (0, _styledComponents.default)('tr')((0, _styledSystem.compose)(_styledSystem.color, _styledSystem.typography, _styledSystem.space, _styledSystem.border, _styledSystem.layout));
exports.TableRow = TableRow;
TableRow.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin'
};
var TableCell = (0, _styledComponents.default)('td')((0, _styledSystem.compose)(_styledSystem.color, _styledSystem.typography, _styledSystem.space, _styledSystem.border, _styledSystem.layout));
exports.TableCell = TableCell;
TableCell.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin'
};