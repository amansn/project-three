import React from 'react';
import SearchForm from './SearchForm';

// const FormAjaxCalls: React.createClass({
//   SearchAllAjaxCall: function(){
//     axios.get('http://localhost:3000/')
//     .then(function(response){
//       console.log(response);
//       this.setState({
//         ajaxReturn: response.data
//       })
//     }.bind(this))
//     .catch(function(err){
//       console.warn(err);
//     })
//   }
//
// })

const SearchFormContainer = React.createClass({
  render: function(){
    return(
      <div className='search-form-container'>
        <SearchForm
          />
      </div>
    )
  }
})

export default SearchFormContainer;
