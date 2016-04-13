import React from 'react';

const Location = React.createClass({
  submitLocation: function() {
    let locationInput = document.getElementById('location-input').value;
    console.log(locationInput);
  },
  render: function() {
    return(
      <form>
        <label>Enter your location:
          <br />
          <input type="text" id="location-input" onChange={this.submitLocation}></input>&nbsp;
          <button type="button">Go</button>
        </label>
      </form>
    )
  }
});

export default Location;
