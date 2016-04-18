import React from 'react';
import Delivery from '../components/Delivery';
var FontAwesome = require('react-fontawesome');

const DeliveryContainer = React.createClass({
  contextTypes: {
    moveForwardDelivery: React.PropTypes.func,
    moveReverseDelivery: React.PropTypes.func
  },
  render: function() {
    return (
      <div className="delivery-container">
        <div className="delivery-left-container">
          <FontAwesome className="delivery-left" id="delivery-left" name='chevron-left' size='2x' onClick={this.context.moveReverseDelivery} />
        </div>
        <Delivery />
        <div className="delivery-right-container">
          <FontAwesome className="delivery-right" id="delivery-right" name='chevron-right' size='2x' onClick={this.context.moveForwardDelivery} />
        </div>
      </div>
    )
  }
});

export default DeliveryContainer;
