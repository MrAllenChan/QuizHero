"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAutofillHeight;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getNodeFullHeight = function getNodeFullHeight(node) {
  var style = getComputedStyle(node);
  var nextSiblingMarginTop = 0;

  if (node.nextSibling) {
    nextSiblingMarginTop = parseFloat(getComputedStyle(node.nextSibling).marginTop);
  }

  var height = node.offsetHeight + parseFloat(style.marginTop) - nextSiblingMarginTop + parseFloat(style.marginBottom);
  return height;
};

var isCurrentNodeAutoFill = function isCurrentNodeAutoFill(current) {
  return current.classList.contains('spectacle-auto-height-fill') || current.tagName.toLowerCase().includes('pre') && current.childNodes && current.childNodes[0].classList.contains('spectacle-auto-height-fill');
};

function useAutofillHeight(_ref) {
  var slideWrapperRef = _ref.slideWrapperRef,
      contentRef = _ref.contentRef,
      templateRef = _ref.templateRef,
      slideHeight = _ref.slideHeight;
  React.useLayoutEffect(function () {
    if (!contentRef.current.hasChildNodes()) {
      return;
    }

    var childNodes = [].slice.call(contentRef.current.childNodes);
    var metrics = childNodes.reduce(function (memo, current) {
      var currentNodeIsAutoFill = isCurrentNodeAutoFill(current);
      var nodeHeight = currentNodeIsAutoFill ? 0 : getNodeFullHeight(current);
      return {
        totalHeight: nodeHeight + memo.totalHeight,
        numberAutoFills: currentNodeIsAutoFill ? memo.numberAutoFills + 1 : memo.numberAutoFills
      };
    }, {
      totalHeight: 0,
      autoFillsHeight: 0,
      numberAutoFills: 0
    });

    if (templateRef.current.hasChildNodes()) {
      var templateChildNodes = [].slice.call(templateRef.current.childNodes);
      metrics.templateHeight = templateChildNodes.reduce(function (memo, current) {
        return memo + getNodeFullHeight(current);
      }, 0);
    } else {
      metrics.templateHeight = 0;
    }

    var slideWrapperStyle = getComputedStyle(slideWrapperRef.current);
    var totalSlideSpace = slideHeight - (parseFloat(slideWrapperStyle.paddingTop) + parseFloat(slideWrapperStyle.paddingBottom));
    var emptySpace = totalSlideSpace - (metrics.totalHeight + metrics.templateHeight);
    childNodes.forEach(function (node) {
      if (!isCurrentNodeAutoFill(node)) {
        return;
      }

      if (node.childNodes[0] && node.childNodes[0].tagName.toLowerCase() === 'pre') {
        node = node.childNodes[0];
      }

      node.style.maxHeight = "".concat(emptySpace / metrics.numberAutoFills, "px");
    });
  }, [slideWrapperRef, contentRef, templateRef, slideHeight]);
}