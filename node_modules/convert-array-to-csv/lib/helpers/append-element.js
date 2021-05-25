"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendElement = void 0;

var _checkSpecialCharsAndEmpty = require("./check-special-chars-and-empty");

var separatorOrLineBreak = function separatorOrLineBreak(length, elementIdx, separator) {
  return length - 1 === elementIdx ? '\n' : separator;
};

var escapeDoubleQuotesInsideElement = function escapeDoubleQuotesInsideElement(element) {
  return element.replace(/"/g, '""');
};

var appendElement = function appendElement(element, lineLength, elementIdx, separator) {
  var includesSpecials = (0, _checkSpecialCharsAndEmpty.checkSpecialCharsAndEmpty)(element, separator);
  var thisElement = element;

  if (includesSpecials) {
    thisElement = escapeDoubleQuotesInsideElement(thisElement);
  }

  var afterElement = separatorOrLineBreak(lineLength, elementIdx, separator);
  return includesSpecials ? "\"".concat(thisElement, "\"").concat(afterElement) : "".concat(thisElement).concat(afterElement);
};

exports.appendElement = appendElement;