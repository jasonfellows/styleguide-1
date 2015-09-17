'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _barsActionBar = require('./bars/action-bar');

var _barsActionBar2 = _interopRequireDefault(_barsActionBar);

var _storesViewStore = require('./stores/view-store');

var _storesViewStore2 = _interopRequireDefault(_storesViewStore);

var _actionsViewActions = require('./actions/view-actions');

var _actionsViewActions2 = _interopRequireDefault(_actionsViewActions);

var createClass = _react2['default'].createClass;
var createElement = _react2['default'].createElement;
var render = _react2['default'].render;

var View = createClass({

  displayName: "View",

  getInitialState: function getInitialState() {
    return _storesViewStore2['default'].getState();
  },

  componentDidMount: function componentDidMount() {
    _storesViewStore2['default'].listen(this.onChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    _actionsViewActions2['default'].scrollWatch(false);
    _storesViewStore2['default'].unlisten(this.onChange);
  },

  onChange: function onChange(state) {
    this.setState(state);
  },

  actionBar: function actionBar() {
    var action = this.state.bars.action;

    if (action.use === true && action.visible === true) {
      return _react2['default'].createElement(_barsActionBar2['default'], _extends({ key: 'action-bar' }, action));
    } else {
      return null;
    }
  },

  render: function render() {
    return this.actionBar();
  }

});

module.exports = View;