import React from 'react';

const {
  createClass,
  PropTypes : Type
} = React;

export default createClass({

  displayName: 'FieldSet',

  render() {
    return (
      <div className="field-set rounded-3 p2 bg-grey-10">
        {this.props.children}
      </div>
    );
  }
});
