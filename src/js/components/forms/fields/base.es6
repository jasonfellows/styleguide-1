import ContextualHelp from '../../overlays/contextual-help';
import FieldErrors from '../field-errors';
import React from 'react';

const Type = React.PropTypes;

class Field extends React.Component {

  constructor() {
    super();
    this.state = {
      errors: this.props.errors || [],
      value: this.props.initialValue
    };
    this._bind('_handleBlur', '_handleChange', '_handleFocus', '_handleKeyUp');
  },

  componentDidMount() {
    initErrors = this.isValid();

    if (!!this.props.defaultValue && initErrors.length > 0) {
      this.setState({
        errors: ['Invalid value']
      });
    }
  },

  _bind(...handlers) {
    handlers.forEach((handler) => this[handler] = this[handler].bind(this));
  },

  _containerClasses() {
    let classes = ['???-field'];
    if (this.disabled()) classes.push('disabled');
    classes.push(this.props.extraClasses);
    return classes.join(' ');
  },

  _contextualHelp() {
    if (this.props.contextualHelp) {
      return (
        <ContextualHelp className="px2 mb1" >
          {this.props.contextualHelp}
        </ContextualHelp>
      );
    }
  },

  _disabled() {
    return this.props.disabled || !this.isValid();
  },

  _handleBlur() {
    this.props.onBlur();
  },

  _handleChange() {
    this.props.onChange();
  },

  _handleFocus() {
    this.props.onFocus();
  },

  _handleKeyUp() {
    this.props.onKeyUp();
  },

  _inputClasses() {
    let classes = ['relative', 'fit', 'pr4'];
    if (this.state.errors.length > 0) classes.push('bc-orange bw-2');
    return classes.join(' ');
  },

  _isValid() {
    return true;
  },

  _label() {
    if (this.props.label) {
      return (
        <label className="px2 mb1 relative" >
          {this.props.label}
        </label>
      );
    }
  },

  render() {
    return (
      <div className={this._containerClasses()}>
        {this._label()}
        {this._contextualHelp()}
        <input type="???" className={this._inputClasses()} readonly={this.props.readOnly} value={this.state.value} />
        <div className="clearfix"></div>
        <FieldErrors errors={this.state.errors} />
      </div>
    );
  }
});

Field.propTypes = {
  disabled: Type.bool,
  errors: Type.array,
  initialtValue: Type.oneOfType([Type.object, Type.string, Type.number]),
  label: Type.string,
  name: Type.string,
  onBlur: Type.func,
  onChange: Type.func,
  onFocus: Type.func,
  onKeyUp: Type.func,
  placeholder: Type.string,
  readOnly: Type.bool
};

Field.defaultProps = {
  disabled: false,
  errors: [],
  onBlur: function() {},
  onChange: function() {},
  onFocus: function() {},
  onKeyUp: function() {},
  readOnly: false
};

module.exports = Field;
