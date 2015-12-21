import React from 'react';

const Type = React.PropTypes;

export default React.createClass({

  displayName: "NumberField",

  propTypes: {
    disabled: Type.bool,
    extraClasses: Type.arrayOf(Type.string),
    fieldColor: Type.oneOf(['light', 'dark']),
    label: Type.string,
    readOnly: Type.bool,
    units: Type.string
  },

  getDefaultProps() {
    return {
      readOnly: false,
      fieldColor: 'light',
      inactive: false
    }
  },

  label() {
    if(this.props.label) {
      return <label className="px2 mb1">{this.props.label}</label>;
    }
  },

  units(){
    if(this.props.units) {
      return <span className={this.unitsClasses()}>{this.props.units}</span>
    }
  },

  unitsClasses() {
    var classes = ['units'];
    classes.push('grey-50');
    return classes.join(' ');
  },

  iconClasses() {
    var classes = ['icon', 'icon-arrow-double'];
    this.props.disabled ? classes.push('grey-25') : classes.push('blue-70');
    return classes.join(' ');
  },

  fieldClasses() {
    var classes = [];
    classes.push('field-'+this.props.fieldColor);
    return classes.join(' ');
  },

  classes() {
    var classes = ['number-field'];
    if(this.props.disabled) {
      classes.push('disabled');
    }
    classes.push(this.props.extraClasses)
    return classes.join(' ');
  },

  render() {
    return  <div className={this.classes()}>
        {this.label()}
        <br/>
        <input
          className={this.fieldClasses()}
          disabled={this.props.disabled}
          type="number"
          readOnly={this.props.readOnly}
        ></input>
        <span className={this.iconClasses()}></span>
        {this.units()}
      </div>
  }
});
