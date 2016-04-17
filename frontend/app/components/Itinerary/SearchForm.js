import React from 'react';

const SearchForm = React.createClass({

  render: function(){
    var FormStyle = {
      border: '5px solid blue'
    }
    return (
      <div className='search-form' style={FormStyle}>
        <p>Search Form Container</p>
        <input
          className='search-all'
          type='radio'
          onChange={this.radioVal}
          />
        <label>Search All</label>
        <br></br>
        <input
          className='find-day'
          type='radio'
          onChange={this.radioVal}
          />
        <label>Find by day</label>
        <br></br>
        <input
          className='find-event'
          type='radio'
          onChange={this.radioVal}
          />
        <label>Find a specific Event</label>
        <div className='results-container'>
          This is where the results will go.
        </div>
      </div>
    )
  }
})

export default SearchForm;
