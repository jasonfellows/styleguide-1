import React from 'react/addons';

const {
  createClass,
  Children,
  PropTypes : Type
} = React;

const { cloneWithProps } = React.addons;

export default createClass({
  displayName: "FileInput",

  getInitialState() {
    return {
      previewing: false,
      fileName: null
    };
  },

  propTypes: {
    labelTitle: Type.string.isRequired,
    labelStyles: Type.arrayOf(Type.string).isRequired
  },

  getFile() {
    if (this.file) {
      return this.file;
    } else {
      return false;
    }
  },

  handleChange(e) {
    this.file = e.target.files[0];
    const fileName = this.file.name;

    this.setState({
      fileName: fileName,
      previewing: true
    });
  },

  handleRemove(e) {
    this.file = null;
    this.setState({
      fileName: null,
      previewing: false
    });
  },

  render() {
    if (this.state.previewing) {
      return (
        <div className="bg-grey-05 grey-75 px2 py1 inline-block rounded-2">
          <div className="flex flex-center">
            <span className="small mb0">{this.state.fileName}</span>
            <span className="inline-block icon-delete blue-50 small mb0 ml2" onClick={this.handleRemove}></span>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <label htmlFor="fileInput" className={this.props.labelStyles.join(' ')}>
            {this.props.icon ? <span className={`icon-${this.props.icon} mr1`}></span> : void 0}
            {this.props.labelTitle}
          </label>
          <input {...this.props} type="file" ref="fileInput" onChange={this.handleChange} id="fileInput" style={{height: 0, opacity: 0, width:0}} />
        </div>
      );
    }
  }
});
