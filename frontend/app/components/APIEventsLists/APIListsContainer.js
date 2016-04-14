import React from 'react';
import GuideboxList from './GuideBox';

const APIListsContainer = React.createClass({
  render: function(){
    return (
      <div className='api-lists-container'>
        <GuideboxList />
      </div>
    )
  }
})

export default APIListsContainer;
