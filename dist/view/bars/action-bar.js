"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var createClass = _reactAddons2["default"].createClass;
var PropTypes = _reactAddons2["default"].PropTypes;
var cloneWithProps = _reactAddons2["default"].addons.cloneWithProps;

var ActionBar = createClass({

  displayName: "ActionBar",

  propTypes: {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    actions: PropTypes.node
  },

  title: function title() {
    if (this.props.title) {
      return _reactAddons2["default"].createElement(
        "div",
        { className: "flex-auto" },
        _reactAddons2["default"].createElement(
          "h3",
          { className: "m0 inline" },
          this.props.title
        ),
        _reactAddons2["default"].createElement(
          "span",
          { className: "ml2" },
          this.props.subtitle
        )
      );
    }
  },

  description: function description() {
    if (this.props.description) {
      return _reactAddons2["default"].createElement("div", { className: "flex-auto right-align", dangerouslySetInnerHTML: { __html: this.props.description } });
    }
  },

  actions: function actions() {
    if (this.props.actions.length > 0) {

      var actions = this.props.actions;

      actions = actions.map(function (action, i) {
        return cloneWithProps(action, { key: "action-" + i, size: "sm" });
      });

      return actions;
    }
  },

  render: function render() {

    return _reactAddons2["default"].createElement(
      "div",
      { className: "fixed top-0 fill anim-drop", style: { background: 'rgba(255,255,255,0.95)', zIndex: 99, boxShadow: '0 2px 5px rgba(20,33,45, 0.1)' } },
      _reactAddons2["default"].createElement(
        "div",
        { className: "flex flex-center p2 mt0 mb0 mx-auto", style: { width: 944 } },
        this.title(),
        this.description(),
        _reactAddons2["default"].createElement(
          "div",
          { className: "ml2" },
          this.actions()
        )
      )
    );
  }
});

module.exports = ActionBar;