'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('core-js/shim');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var D = _react2['default'].DOM;
var Type = _react2['default'].PropTypes;

exports['default'] = _react2['default'].createClass({
  displayName: "GridBlock",

  //propTypes: {
  //  colClass: Type.string.required
  //},

  colContent: function colContent() {
    return this.props.colContent || this.props.colClass;
  },

  render: function render() {
    return D.div({
      className: 'grid-block ' + this.props.colClass
    }, D.p({
      className: "col-class"
    }, '.' + this.colContent()));
  }
});
module.exports = exports['default'];
