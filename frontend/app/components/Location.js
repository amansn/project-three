import React from 'react';

const Location = React.createClass({
  contextTypes: {
    locationInputFunc: React.PropTypes.func,
    deliveryAjaxCall: React.PropTypes.func,
    ajaxRun: React.PropTypes.func
  },
  handleLocation: function(e) {
    this.context.locationInputFunc(e);
  },
  componentDidMount: function() {
  },
  render: function() {
    return(
      <div className="location">
        <form>
          <label className="enter-location">
            <input type="text" id="location-input" placeholder="Enter your location" onChange={this.handleLocation}></input>
            <br />
            <button type="button" onClick={this.context.ajaxRun}>Search</button>
          </label>
        </form>
      </div>
    )
  }
});

export default Location;
