import React from 'react';

import axios from 'axios';
import RestaurantContainer from '../containers/RestaurantContainer';
import LocationContainer from '../containers/LocationContainer';
import APIListsContainer from './APIEventsLists/APIListsContainer';
import SearchFormContainer from './Itinerary/SearchFormContainer';

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
        <br></br>
        <RestaurantContainer />
        <br></br>
        <APIListsContainer />
        <br></br>
        <SearchFormContainer />
      </div>
    )
  }
});

export default Home;
