import React from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';

const SearchFormContainer = React.createClass ({
  SearchAllAjaxCall: function(){
    axios.get('http://localhost:3000/')
    .then(function(response){
      console.log(response);
      this.setState({
        ajaxReturn: response.data
      });
    }.bind(this))
    .catch(function(err){
      console.warn(err);
    })
  },

  render: function(){
    return(
      <div className='search-form-container'>
        <SearchForm
          SearchAllAjaxCall={this.SearchAllAjaxCall}
          />
      </div>
    )
  }
})


export default SearchFormContainer;
