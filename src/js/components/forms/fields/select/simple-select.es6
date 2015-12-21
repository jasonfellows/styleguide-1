import React from 'react';
import _ from 'underscore';
import Overlay from '../../../overlays/overlay-click';

const Type = React.PropTypes;

export default React.createClass({

  displayName: "SimpleSelect",

  propTypes: {
    disabled: Type.bool,
    fieldColor: Type.oneOf(['light', 'dark']),
    hasError: Type.bool,
    includeBlank: Type.bool,
    name: Type.string,
    onChange: Type.func,
    options: Type.oneOfType([Type.object, Type.array]).isRequired,
    placeholder: Type.string,
    value: Type.oneOfType([Type.string, Type.number])
  },

  getDefaultProps() {
    return {
      fieldColor: 'light',
      hasError: false,
      onChange: function() {},
      options: []
    };
  },

  getInitialState() {
    return {
      show_options: false,
      value: this.props.value || null
    };
  },

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick);
  },

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value != prevState.value) this.props.onChange();
  },

  arrowClasses() {
    let classes = ['h6', 'ml1', 'relative'];
    classes.push(this.props.disabled ? 'grey-50' : 'blue-70');
    classes.push(this.state.show_options ? 'icon-arrow-up' : 'icon-arrow-down');
    return classes.join(' ');
  },

  onClickOption(option) {
    this.setState({
      value: option,
      show_options: false
    });
  },

  onClickOptionEmpty() {
    this.setState({
      value: null,
      show_options: false
    });
  },

  onDocumentClick(e) {
    if (!this.getDOMNode().contains(e.target)) {
      this.setState({show_options: false})
    }
  },

  onClickValue() {
    if (!this.props.disabled) this.setState({show_options: !this.state.show_options});
  },

  optionsArray() {
    let options = this.props.options;
    return (typeof options === 'object' && Array.isArray(options)) ? options : false;
  },

  optionsClasses() {
    let classes = ['absolute', 'bb', 'bl', 'br', 'bw-1', 'left-0', 'right-0', 'rounded-bottom-2'];
    classes.push(this.state.show_options ? 'bc-grey-50' : 'bc-grey-25');
    return classes.join(' ');
  },

  optionsObject() {
    let options = this.props.options;
    return (typeof options === 'object' && !Array.isArray(options)) ? options : false;
  },

  renderOptions() {
    if (!this.props.disabled) {
      let optionClasses = 'simple-select-option bg-white nowrap option pointer py1 px3';

      let emptyOption = (
        <div className={optionClasses+" grey-50"} onClick={this.onClickOptionEmpty}>
          {this.props.placeholder ? this.props.placeholder : "--"}
        </div>
      );

      if (this.optionsObject()) {
        var options = this.renderOptionsFromObject(optionClasses);
      } else {
        var options = this.renderOptionsFromArray(optionClasses)
      }

      if (this.state.show_options) {
        return (
          <div className={this.optionsClasses()} style={{zIndex: 1000}}>
            {this.props.includeBlank ? emptyOption : false}
            {options}
          </div>
        );
      }
    } else {
      return false;
    }
  },

  renderOptionsFromArray(classes) {
    return this.props.options.map((option, index) => {
      return (
        <div className={classes + ' grey-75'}
             key={index}
             onClick={this.onClickOption.bind(this, option)}>
          {option}
        </div>
      );
    });
  },

  renderOptionsFromObject(classes) {
    return Object.keys(this.props.options).map((key, index) => {
      return (
        <div className={classes + ' grey-75'}
             key={index}
             onClick={this.onClickOption.bind(this, key)}>
          {this.props.options[key]}
        </div>
      );
    });
  },

  renderValue() {
    let value = this.optionsArray() ? this.state.value : this.props.options[this.state.value];
    let arrowStyle = {top: 1, right: 3, fontSize: '12px', height: '19px'};

    return (
      <div ref='simpleSelectValue' className={this.valueClasses()} onClick={this.onClickValue}>
        <div className='nowrap mr1'>
          {value ? value : this.props.placeholder}
        </div>
        <div className={this.arrowClasses()} style={arrowStyle} />
      </div>
    );
  },

  valueBorderClass() {
    if (this.props.hasError) {
      return 'bc-orange bc-orange-hover';
    } else if (this.props.disabled) {
      if (this.props.fieldColor == 'dark') {
        return 'bc-grey-10';
      } else {
        return 'bc-grey-10';
      }
    } else if (this.state.show_options) {
      return 'bc-grey-50';
    } else {
      return this.props.fieldColor == 'light' ? 'bc-grey-25' : 'bc-white';
    }
  },

  valueClasses() {
    let classes = ['simple-select', 'b', 'bw-1', 'flex', 'flex-justify', 'p1', 'grey-75'];
    classes.push(this.valueBorderClass());
    classes.push(this.state.show_options ? 'rounded-top-2' : "rounded-2");
    if (this.props.disabled) {
      classes.push('disabled');
      classes.push(this.props.fieldColor == 'light' ? 'grey-10 bg-grey-10' : 'grey-50 bg-grey-15');
    } else {
      classes.push('pointer bg-white');
    }
    return classes.join(' ');
  },

  render() {
    return (
      <div className="relative simple-select">
        <input type="hidden"
               name={this.props.name}
               value={this.state.value}
               disabled={this.props.disabled} />
        {this.renderValue()}
        {this.renderOptions()}
      </div>
    );
  }
});
