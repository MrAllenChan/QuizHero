"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SpectacleLogo;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function SpectacleLogo(props) {
  return React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: Math.floor(props.size * 1.012),
    height: props.size,
    viewBox: "0 0 601 595"
  }, React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, React.createElement("path", {
    fill: "#202020",
    d: "M342.277 19.4l195.971 87.165C575.801 123.268 600 160.515 600 201.616v211.961c0 41.1-24.199 78.348-61.752 95.051l-195.971 87.165a104.029 104.029 0 01-84.554 0L61.752 508.628C24.199 491.925 0 454.678 0 413.578V201.615c0-41.1 24.199-78.348 61.752-95.05L257.723 19.4a104.029 104.029 0 0184.554 0z",
    transform: "translate(.667 -10)"
  }), React.createElement("path", {
    stroke: "#FC6986",
    strokeWidth: "24.247",
    d: "M332.269 53.303a79.877 79.877 0 00-64.741 0L76.38 138.036c-24.842 11.012-40.858 35.632-40.858 62.805v213.702c0 27.174 16.016 51.793 40.858 62.805l191.148 84.734a79.877 79.877 0 0064.74 0l191.148-84.734c24.842-11.012 40.859-35.631 40.859-62.805V200.841c0-27.173-16.017-51.793-40.859-62.805L332.27 53.303z",
    opacity: ".499",
    transform: "translate(.667 -10)"
  }), React.createElement("path", {
    stroke: "#FC6986",
    strokeWidth: "24.007",
    d: "M337.399 30.368a92.026 92.026 0 00-74.798 0l-195.97 87.165c-33.221 14.775-54.628 47.725-54.628 84.083v211.961c0 36.358 21.407 69.308 54.627 84.084l195.971 87.164a92.026 92.026 0 0074.798 0l195.97-87.164c33.221-14.776 54.628-47.726 54.628-84.084v-211.96c0-36.359-21.407-69.309-54.627-84.084L337.399 30.368z",
    transform: "translate(.667 -10)"
  }), React.createElement("g", null, React.createElement("path", {
    fill: "#F14E74",
    d: "M157.997 216.514L50.114 111.686C36.908 98.854 38.448 77.149 53.33 66.33c14.884-10.82 35.883-5.501 43.882 11.116l65.348 135.75c1.392 2.891-2.266 5.55-4.564 3.318",
    transform: "translate(.667 -10) translate(130 145)"
  }), React.createElement("path", {
    fill: "#FC6986",
    d: "M162.555 213.17L97.09 77.479c-8.014-16.61.855-36.461 18.533-41.483 17.677-5.023 35.578 7.223 37.407 25.59l14.947 150.046c.318 3.196-4.027 4.43-5.422 1.54",
    transform: "translate(.667 -10) translate(130 145)"
  }), React.createElement("path", {
    fill: "#E13E65",
    d: "M154.775 221.155l-137.206-61.1c-16.795-7.48-22.786-28.39-12.52-43.697 10.267-15.307 31.805-17.577 45.008-4.743L157.924 216.46c2.297 2.233-.226 5.996-3.149 4.694",
    transform: "translate(.667 -10) translate(130 145)"
  }), React.createElement("path", {
    fill: "#FC6986",
    d: "M4.005 118.137c.736-1.507 6.489-12.257 22.256-14.9 7.154-1.198 17.406 1.147 25.97 10.593l99.313 96.342.715 4.147-97.933-76.994s-15.567-12.2-33.372-.767l-.043-.046a12.583 12.583 0 01-6.663 1.913c-7.015 0-12.702-5.715-12.702-12.763 0-2.818.92-5.413 2.46-7.525",
    transform: "translate(.667 -10) translate(130 145)"
  }), React.createElement("path", {
    fill: "#FF92AC",
    d: "M51.446 67.702c1.203-1.166 10.262-9.297 25.98-6.375 7.131 1.326 15.971 7.047 20.814 18.862l60.587 125.147-.736 4.144L92.23 102.992S81.739 86.186 61.12 90.828l-.025-.058a12.569 12.569 0 01-6.913-.486c-6.594-2.406-9.998-9.727-7.605-16.352a12.68 12.68 0 014.868-6.23M113.547 36.788c1.529-.678 12.82-5.18 26.577 3.002 6.24 3.71 12.58 12.138 13.08 24.907l14.01 138.455-2.11 3.635-25.356-122.76s-4.091-19.407-25.04-22.18l-.004-.062a12.587 12.587 0 01-6.323-2.85c-5.367-4.538-6.055-12.589-1.539-17.981a12.619 12.619 0 016.705-4.166",
    transform: "translate(.667 -10) translate(130 145)"
  }), React.createElement("path", {
    fill: "#FF92AC",
    d: "M151.276 53.953l-1.021 133.213s4.055 29.884 9.105 36.032l-23.665-10.511c-8.94-7.605-6.593-24.569-6.593-24.569l22.174-134.165z",
    transform: "translate(.667 -10) translate(130 145)"
  }), React.createElement("path", {
    fill: "#E13E65",
    d: "M168.916 224.707c-17.639 0-31.938-14.367-31.938-32.09L155.552 12.77c.711-6.88 6.48-12.106 13.364-12.106 6.883 0 12.653 5.226 13.364 12.106l18.574 179.847c0 17.723-14.3 32.09-31.938 32.09",
    transform: "translate(.667 -10) translate(130 145)"
  }), React.createElement("path", {
    fill: "#FF92AC",
    d: "M159.625 31.361L168.931 47.845 178.285 31.572",
    transform: "translate(.667 -10) translate(130 145)"
  }), React.createElement("path", {
    fill: "#FC6986",
    d: "M182.264 14.076c0 7.407-2.816 24.036-13.348 24.036-10.091 0-13.349-16.629-13.349-24.036S161.544.664 168.916.664s13.348 6.005 13.348 13.412M222.789 35.994c-15.437-4.386-31.043 4.398-35.97 18.926l16.575 101.17 37.927-78.611c8.013-16.61-.855-36.463-18.532-41.485M169.523 201.453c-1.096-.137-17.918-2.58-17.507-22.395l3.589-89.137a114.848 114.848 0 00-4.317-36.15l-14.32 138.864a7.42 7.42 0 00.074 2.034c.37 5.013 2.534 18.102 14.922 25.297 4.188 2.432 9.659 4.675 16.396 4.732l.001-.026c.107.003.21.016.318.016 6.397 0 11.583-5.21 11.583-11.64 0-6.14-4.737-11.16-10.74-11.595",
    transform: "translate(.667 -10) translate(130 145)"
  }), React.createElement("path", {
    fill: "#FF92AC",
    d: "M140.853 89.343s2.258 13.802-.282 29.306l2.54-7.94 2.446-18.908-4.704-2.458zM231.569 40.954a12.619 12.619 0 00-6.705-4.166c-1.528-.678-12.82-5.18-26.577 3.001-4.512 2.684-9.065 7.847-11.436 15.322l7.867 48.02 3.945-19.104s4.091-19.406 25.04-22.18l.004-.062a12.592 12.592 0 006.323-2.849c5.368-4.539 6.056-12.59 1.539-17.982",
    transform: "translate(.667 -10) translate(130 145)"
  }), React.createElement("path", {
    fill: "#F14E74",
    d: "M285.08 66.33c-14.883-10.82-35.883-5.5-43.881 11.116l-37.818 78.56 5.327 32.518s.024.156.058.44l79.532-77.278c13.206-12.832 11.665-34.537-3.218-45.356",
    transform: "translate(.667 -10) translate(130 145)"
  }), React.createElement("path", {
    fill: "#FF92AC",
    d: "M291.833 73.932a12.685 12.685 0 00-4.867-6.23c-1.204-1.166-10.262-9.298-25.981-6.374-7.131 1.325-15.971 7.045-20.813 18.86l-36.77 75.95 2.076 12.667 40.704-65.812s10.49-16.807 31.108-12.165l.025-.058c2.232.468 4.613.353 6.913-.487 6.595-2.405 10-9.726 7.605-16.351",
    transform: "translate(.667 -10) translate(130 145)"
  }), React.createElement("path", {
    fill: "#E13E65",
    d: "M333.362 116.358c-10.267-15.307-31.805-17.577-45.008-4.743l-79.587 77.358c.325 2.7 1.61 16.966-6.418 23.849l118.493-52.767c16.795-7.48 22.786-28.39 12.52-43.697",
    transform: "translate(.667 -10) translate(130 145)"
  }), React.createElement("path", {
    fill: "#FC6986",
    d: "M334.406 118.137c-.735-1.507-6.488-12.257-22.256-14.9-7.154-1.199-17.406 1.147-25.97 10.593l-77.415 75.128c.128 1.057.407 3.946.2 7.476l75.12-59.109s15.567-12.201 33.372-.767l.043-.046a12.58 12.58 0 006.664 1.913c7.015 0 12.702-5.715 12.702-12.763 0-2.818-.92-5.413-2.46-7.525",
    transform: "translate(.667 -10) translate(130 145)"
  })), React.createElement("text", {
    fill: "#FC6986",
    fontFamily: "Castledown-Bold, Castledown",
    fontSize: "52.014",
    fontWeight: "bold",
    letterSpacing: "3.853",
    transform: "translate(.667 -10)"
  }, React.createElement("tspan", {
    x: "143",
    y: "472"
  }, "SPECTACLE"))));
}

SpectacleLogo.propTypes = {
  size: _propTypes.default.number
};
SpectacleLogo.defaultProps = {
  size: 100
};