import React from 'react';

const Type = React.PropTypes;

export default React.createClass({

  displayName: "Day",

  propTypes: {
    onChangeDate: Type.func.isRequired,
    date: Type.object.isRequired,
    disabled: Type.bool,
    selected: Type.bool,
    week: Type.number.isRequired
  },

  getDefaultProps() {
    return {
      disabled: false,
      highlighted: false,
      selected: false
    };
  },

  classes() {
    var classes = [ "absolute",
                    "day",
                    "day-in-week-" + this.props.date.weekday(),
                    "week-" + this.props.week ];

    if (this.props.selected) classes.push('bc-blue-50 bg-grey-95 bw-1 b white pointer');
    else if (this.props.disabled) classes.push('disabled grey-75');
    else classes.push('grey-25 pointer');

    return classes.join(' ');
  },

  handleClick(e) {
    if (!this.props.disabled) this.props.onChangeDate(this.props.date);
  },

  render() {
    return (
      <div className={this.classes()}>
        <div className="semibold center c-fade h4"
           href="#"
           onClick={this.handleClick}>
          {this.props.date.date()}
        </div>
      </div>
    );
  }
});
