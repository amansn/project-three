import React from 'react';
import Watch from '../components/Watch';
var FontAwesome = require('react-fontawesome');

const WatchContainer = React.createClass({
  contextTypes: {
    moveForwardWatch: React.PropTypes.func,
    moveReverseWatch: React.PropTypes.func
  },
  render: function() {
    return (
      <div className="watch-container">
        <div className="watch-left-container">
          <FontAwesome className="watch-left" id="watch-left" name='chevron-left' size='2x' onClick={this.context.moveReverseWatch} />
        </div>
        <Watch />
        <div className="watch-right-container">
          <FontAwesome className="watch-right" id="watch-right" name='chevron-right' size='2x' onClick={this.context.moveForwardWatch} />
        </div>
      </div>
    )
  }
});

export default WatchContainer;
