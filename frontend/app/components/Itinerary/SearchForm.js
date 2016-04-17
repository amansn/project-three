import React from 'react';

const SearchForm = React.createClass({

  render: function(){
    var FormStyle = {
      border: '5px solid blue'
    }
    return (
      <div className='search-form' style={FormStyle}>
        <p>Search Form Container</p>
        <label>Search for EVERYTHING</label>
      <button
          className='search-all'
          type='button'
          onClick={this.props.SearchAllAjaxCall}
          >Search All</button>
        <br></br>
        <br></br>
        <label>Search for particular day</label><span>  </span>
        <input
          className='find-day'
          type='text'
          onChange={this.DayInput}
          />
        <button>Search</button>
        <br></br>
        <br></br>
        <label>Search for a specific event</label><span>  </span>
        <input
          className='find-event'
          type='text'
          onChange={this.EventInput}
          />
        <button>Search</button>
        <div className='results-container'>
          This is where the results will go.
        </div>
      </div>
    )
  }
})

export default SearchForm;
