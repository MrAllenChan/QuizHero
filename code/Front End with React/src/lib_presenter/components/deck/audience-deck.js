"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useDeck = require("../../hooks/use-deck");

var _usePresentation = require("../../hooks/use-presentation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AudienceDeck = function AudienceDeck(props) {
  var addMessageHandler = props.addMessageHandler;

  var _React$useContext = _react.default.useContext(_useDeck.DeckContext),
      dispatch = _React$useContext.dispatch;

  var onMessageReceived = _react.default.useCallback(function (message) {
    // The PresentationDeck will send messages to
    // keep the AudienceDeck in sync.
    if (message.type === _usePresentation.MSG_SLIDE_STATE_CHANGE) {
      dispatch({
        type: 'GO_TO_SLIDE',
        payload: message.payload
      });
    }
  }, [dispatch]);

  _react.default.useEffect(function () {
    addMessageHandler(onMessageReceived);
  }, [addMessageHandler, onMessageReceived]);

  return _react.default.createElement(_react.default.Fragment, null, props.children);
};

AudienceDeck.propTypes = {
  addMessageHandler: _propTypes.default.func.isRequired,
  children: _propTypes.default.node.isRequired
};
var _default = AudienceDeck;
exports.default = _default;