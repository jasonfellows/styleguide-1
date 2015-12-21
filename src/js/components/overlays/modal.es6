import React from 'react';

const Type = React.PropTypes;

export default React.createClass({

  displayName: "Modal",

  propTypes: {
    zIndex: Type.number,
    contentColumns: Type.number,
    contentHeight: Type.number,
    contentMinHeight: Type.number,
    disableClickBackground: Type.bool,
    closeModal: Type.func,
    isOpen: Type.bool
  },

  getInitialState() {
    return {
      isOpen: this.props.isOpen || false
    }
  },

  getDefaultProps() {
    return {
      zIndex: 1000,
      contentColumns: 9,
      disableClickBackground: false
    }
  },

  clickBackground() {
    if(!this.props.disableClickBackground) {
      this.props.closeModal()
    }
  },

  clickContent(e) {
    // keeps the content click from bubbling up to outside click
    e.stopPropagation()
  },

  modalBackgroundClasses() {
    var classes = [
      'anim-fade',
      'ease-out',
      'modal-background',
      'top-0',
      'bottom-0',
      'left-0',
      'right-0',
      'fixed',
      'flex',
      'flex-center'
    ];

    return classes.join(' ')
  },

  modalContentClasses() {
    var classes = [
      'modal-content',
      'mx-auto',
      'bg-white',
      'relative',
      'float-none',
      'rounded-3',
      'overflow-hidden'
    ];

    classes.push('col-'+this.props.contentColumns);

    return classes.join(' ');
  },

  render() {
    return <div ref="modal" style={{zIndex: this.props.zIndex}} className={this.modalBackgroundClasses()} onClick={this.clickBackground}>
        <div className="container fill">
          <div onClick={this.clickContent} className={this.modalContentClasses()} style={{height: this.props.contentHeight, minHeight: this.props.contentMinHeight}}>
            {this.props.children}
          </div>
        </div>
      </div>
  }
});
