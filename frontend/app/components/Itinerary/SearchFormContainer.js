import React from 'react';
import SearchForm from './SearchForm';

const SearchFormContainer = React.createClass({
  render: function(){
    return(
      <div className='search-form-container'>
        <SearchForm />
      </div>
    )
  }
})

export default SearchFormContainer;
