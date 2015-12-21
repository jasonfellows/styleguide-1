import Button from '../buttons/button';
import React from 'react';

export default React.createClass({

  displayName: 'ListEmptyState',

  propTypes: {
    buttonLabel: React.PropTypes.string,
    buttonLink: React.PropTypes.string,
    message: React.PropTypes.string.isRequired
  },

  renderButton() {
    if (!!this.props.buttonLabel && !!this.props.buttonLink) {
      return <Button extraClasses={['mx-auto']}
                     link={this.props.buttonLink}
                     label={this.props.buttonLabel} />;
    }
  },

  render() {
    return (
      <div className='center bw-1 bt bb bc-grey-25 empty-state mt3 py5'>
        <svg viewBox="-297 387 16.7 20" x="0px" y="0px" height="60px" width="60px" fill="#c4c7ca">
          <path d="M-280.3,392l-5-5H-297v20h16.7V392z M-282.1,392h-3.2v-3.2L-282.1,392z M-295.8,388.2h9.2v5h5v12.5h-14.2V388.2z" />
        </svg>
        <p className="py3 grey-25">
          {this.props.message}
        </p>
        {this.renderButton()}
      </div>
    );
  }
});
