import React from 'react';
import Location from '../components/Location';

const LocationContainer = React.createClass({
  render: function() {
    return (
      <div className="location-container">
        <Location />
      </div>
    )
  }
});

export default LocationContainer;
