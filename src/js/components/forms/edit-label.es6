import React from 'react';
import Icon from '../misc/icon';
import Popup from '../overlays/popup';
import FieldErrors from './field-errors';
import Colors from '../../../lib/_colors.json';
import OverlayClick from '../overlays/overlay-click';

const {
  createClass,
  PropTypes: Type
} = React;

export default createClass({

  displayName: 'EditLabel',

  propTypes: {
    label: Type.string.isRequired,
    placeholder: Type.string,
    isValid: Type.func,
    errorMessage: Type.string,
    onSave: Type.func.isRequired,
    onDelete: Type.func.isRequired
  },

  getInitialState() {
    return {
      isEditing: false,
      saveDisabled: true,
      hasErrors: false,
      textHeight: 34
    };
  },

  _triggerEdit(e) {
    e.stopPropagation();
    this.setState({ isEditing: true });
  },

  _handleSave() {
    const val = this.refs.labelInput.getDOMNode().value;

    if ( this.props.isValid ) {

      if ( this.props.isValid(val) ) {
        this.setState({ isEditing: false });
        this.props.onSave(val);
      } else {
        this.setState({ hasErrors: true });
      }

    } else {
      this.setState({ isEditing: false });
      this.props.onSave(val);
    }
  },

  _handleClose(e) {
    e.stopPropagation();
    if (this.refs.pop) {
      this.refs.pop.close();
    }
  },

  _handleDelete() {
    this.props.onDelete();
  },

  _handleKey(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this._handleSave();
    }

    const target = e.target;
    const height = target.scrollHeight;

    this.setState({ textHeight: height });
  },

  _checkContent(e) {
    const val = e.target.value.trim();

    if (val.length === 0) {
      this.setState({ saveDisabled: true });
    } else if ( this.state.saveDisabled ) {
      this.setState({ saveDisabled: false });
    }
  },

  _getSaveClasses() {
    let classes = ['px2', 'small', 'm0'];
    const { saveDisabled } = this.state;

    if (saveDisabled) {
      classes.push('grey-25');
    } else {
      classes.push('blue-70');
    }

    return classes;
  },

  _getTextClasses() {
    var classes = ["field-light", "mr2", "py1", "h3", "bold", "no-resize", "flex-grow"];

    if (this.state.hasErrors) {
      classes.push("bc-orange");
    }

    return classes.join(" ");
  },

  _showError() {
    return (
      <div className="fill">
        <FieldErrors errors={[this.props.errorMessage]} />
      </div>
    );
  },

  handleOutsideClick(e) {
    this._handleClose(e);
    this.setState({ isEditing: false });
  },

  render() {
    if(this.state.isEditing) {
      const textStyle = {
        borderColor: this.state.hasErrors ? Colors["orange"][""] : void 0,
        height: this.state.textHeight,
        width: "auto",
        overflow: 'hidden'
      };

      return (
        <OverlayClick onClick={this.handleOutsideClick}>
          <div className="flex flex-center flex-wrap" ref="wrapper">
            <textarea
              className={this._getTextClasses()}
              defaultValue={this.props.label}
              onKeyDown={this.state.saveDisabled ? void 0 : this._handleKey}
              onKeyUp={this._checkContent}
              placeholder={this.props.placeholder}
              ref="labelInput"
              style={textStyle}
            ></textarea>
            <Icon
              name="check"
              extraClasses={this._getSaveClasses()}
              onClick={this.state.saveDisabled ? void 0 : this._handleSave}
             />
            <Popup ref="pop">
              <Icon
                name="delete"
                extraClasses={["blue-70", "px2", "small", "m0"]}
              />
              <div className="white">
                <h4>Are you sure?</h4>
                {this.props.children}
                <div className="right-align">
                  <button className="button-link button-sm button-secondary mr2" onClick={this._handleClose} >Cancel</button>
                  <button className="button-danger button-sm" onClick={this._handleDelete} >Delete</button>
                </div>
              </div>
            </Popup>
            {this.state.hasErrors ? this._showError() : void 0}
          </div>
        </OverlayClick>
      );
    } else {
      return (
        <div ref="wrapper" className="flex flex-center hover-container" >
          <h3 className="blue-70 py1 m0">{this.props.label}</h3>
          <Icon name="pencil" ref="pencil" extraClasses={["blue-70", "py1", "ml1", "small", "m0", "hover-show"]} onClick={this._triggerEdit} />
        </div>
      );
    }
  }
});
