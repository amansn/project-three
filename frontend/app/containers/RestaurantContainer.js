import React from 'react';
import Restaurant from '../components/Restaurant';

const RestaurantContainer = React.createClass({
  render: function() {
    return (
      <div className="restaurant-container">
        <p>RestaurantContainer</p>
        <Restaurant />
      </div>
    )
  }
});

export default RestaurantContainer;
