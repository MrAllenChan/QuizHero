"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMacOS = exports.isWindows = void 0;

var isWindows = function isWindows() {
  return navigator.platform.toLowerCase().includes('win32');
};

exports.isWindows = isWindows;

var isMacOS = function isMacOS() {
  return navigator.platform.toLowerCase().includes('macintel');
};

exports.isMacOS = isMacOS;