import React from 'react/addons';

const Type = React.PropTypes;
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const caretPositions = [
  "top-left", "top-center", "top-right",
  "right-top", "right-center", "right-bottom",
  "bottom-right", "bottom-center", "bottom-left",
  "left-bottom", "left-center", "left-top"
];

export default React.createClass({

  displayName: "Tooltip",

  propTypes: {
    animate: Type.bool,
    caretPosition: Type.oneOf(caretPositions),
    closeOverlay: Type.func,
    content: Type.node.isRequired,
    extraClasses: Type.array,
    handleClose: Type.func,
    height: Type.oneOf(['auto', Type.number]),
    width: Type.oneOf(['auto', Type.number]),
    zIndex: Type.number
  },

  getDefaultProps() {
    return {
      animate: true,
      bottom: null,
      caretPosition: 'top-right',
      closeOverlay: function() {},
      handleClose: function() {},
      height: 'auto',
      left: null,
      right: null,
      top: null,
      width: 'auto',
      zIndex: 300
    };
  },

  getInitialState() {
    return {
      height: this.props.height || null,
      width: this.props.width || null
    };
  },

  classes() {
    let classes = ['tooltip', 'absolute', 'rounded-3', 'p2', 'bg-blue-95'];
    classes.push(this.props.caretPosition);
    if (!!this.props.extraClasses) classes.push(this.props.extraClasses);
    return classes.join(' ');
  },

  direction() {
    switch (this.props.caretPosition) {
      case 'top-center':
      case 'top-left':
      case 'top-right':
        return 'top';
      case 'right-center':
      case 'right-top':
      case 'right-bottom':
        return 'right';
      case 'bottom-center':
      case 'bottom-left':
      case 'bottom-right':
        return 'bottom';
      case 'left-bottom':
      case 'left-center':
      case 'left-top':
        return 'left';
    }
  },

  style() {
    return {
      bottom: this.props.bottom,
      height: this.props.height,
      left: this.props.left,
      right: this.props.right,
      top: this.props.top,
      width: this.props.width,
      zIndex: this.props.zIndex
    };
  },

  triangleClasses() {
    let classes = ['absolute', 'bc-blue-95', 'blue-95'];
    classes.push(`triangle-${this.direction()}`);
    return classes.join(' ');
  },

  render() {
    return (
      <ReactCSSTransitionGroup transitionName={`anim-fade-${this.direction()}`}
                               transitionAppear={true} >
        <div className={this.classes()} style={this.style()}>
          <div className={this.triangleClasses() + ' absolute bc-blue-95 blue-95'}></div>
          {React.cloneElement(this.props.content, {closeTooltip: this.props.closeOverlay})}
          <div className="clearfix"></div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
});
