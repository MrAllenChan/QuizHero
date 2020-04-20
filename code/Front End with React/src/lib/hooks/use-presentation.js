"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MSG_SLIDE_STATE_CHANGE = exports.default = void 0;

var _react = require("react");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getReceiver() {
  return window.navigator && window.navigator.presentation && window.navigator.presentation.receiver;
}

function usePresentation() {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      connection = _useState2[0],
      setConnection = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      errors = _useState4[0],
      setErrors = _useState4[1];

  var requestRef = (0, _react.useRef)(null); // Open to suggestions for better error handling

  var addError = function addError(e) {
    return setErrors(function (es) {
      return [].concat(_toConsumableArray(es), [e]);
    });
  }; // Create a presentation request and store it as a ref


  (0, _react.useEffect)(function () {
    if (!window.PresentationRequest) {
      addError(new Error('Browser does not support Presentation API'));
    }

    return terminateConnection;
  }, [connection, terminateConnection]); // Add a message handler

  var addMessageHandler = (0, _react.useCallback)(function (handler) {
    var receiver = getReceiver();

    if (receiver) {
      var handleConnectionList = function handleConnectionList(list) {
        list.connections.forEach(function (listConnection) {
          var oldHandler = listConnection.onmessage || function () {};

          listConnection.onmessage = function (event) {
            var parsedData = JSON.parse(event.data);
            handler(parsedData);
            oldHandler(event);
          };
        });
      };

      receiver.connectionList.then(handleConnectionList).catch(addError);
    }
  }, []);
  var terminateConnection = (0, _react.useCallback)(function () {
    if (connection) {
      connection.terminate();
      setConnection(null);
    }
  }, [connection]); // Opens the display selection dialog box

  var startConnection = (0, _react.useCallback)(function (urlParams) {
    requestRef.current = new PresentationRequest(["/?".concat(urlParams)]);
    var request = requestRef && requestRef.current;

    if (request) {
      request.start().then(function (requestConnection) {
        requestConnection.onclose = function () {
          return setConnection(null);
        }; // Detect user closing presentation window


        setConnection(requestConnection);
      }).catch(function (e) {
        return addError(new Error('User (probably) exited display selection dialog box', e));
      });
    }
  }, []); // Send a message from the controller to the presenter

  var sendMessage = (0, _react.useCallback)(function (msg) {
    // This may throw if message isn't stringify-able
    try {
      if (connection) {
        connection.send(JSON.stringify(msg));
      } else {
        addError(new Error('Cannot send message before starting a conection'));
      }
    } catch (e) {
      console.log('error', e);
      addError(e);
    }
  }, [connection]);
  return {
    startConnection: startConnection,
    terminateConnection: terminateConnection,
    sendMessage: sendMessage,
    errors: errors,
    addMessageHandler: addMessageHandler,
    isReceiver: Boolean(getReceiver()),
    isController: Boolean(connection)
  };
}

var _default = usePresentation;
exports.default = _default;
var MSG_SLIDE_STATE_CHANGE = 'MSG_SLIDE_STATE_CHANGE';
exports.MSG_SLIDE_STATE_CHANGE = MSG_SLIDE_STATE_CHANGE;