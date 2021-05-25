"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertArrayOfArraysToCSV = void 0;

var _appendElement = require("../helpers/append-element");

var _valueOrEmpty = require("../helpers/value-or-empty");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var convertArrayOfArraysToCSV = function convertArrayOfArraysToCSV(data, _ref) {
  var header = _ref.header,
      separator = _ref.separator;

  var array = _toConsumableArray(data);

  var csv = '';

  if (header) {
    header.forEach(function (headerEl, i) {
      var thisHeaderEl = (0, _valueOrEmpty.valueOrEmpty)(headerEl);
      csv += (0, _appendElement.appendElement)(thisHeaderEl, header.length, i, separator);
    });
  }

  array.forEach(function (row) {
    row.forEach(function (value, i) {
      var thisValue = (0, _valueOrEmpty.valueOrEmpty)(value);
      csv += (0, _appendElement.appendElement)(thisValue, row.length, i, separator);
    });
  });
  return csv;
};

exports.convertArrayOfArraysToCSV = convertArrayOfArraysToCSV;