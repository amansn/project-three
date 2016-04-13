import React from 'react';
import KEYS from '../config/KEYS';
import axios from 'axios';
import RestaurantContainer from '../containers/RestaurantContainer';
import LocationContainer from '../containers/LocationContainer';

const Home = React.createClass({
  getInitialState: function() {
    return {
      restaurantsAjaxReturn: []
    }
  },
  ajaxRun: function() {
    //Run Google Places API call for Restaurants
  },
  render: function() {
    return (
      <div className="home">
        <p>Home</p>
        <LocationContainer />
        <RestaurantContainer />
      </div>
    )
  }
});

export default Home;
