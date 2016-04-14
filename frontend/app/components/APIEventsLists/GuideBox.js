import React from 'react';

const GuideboxList = React.createClass({

  render: function(){
    var Style = {
      border: '3px solid black'
    }
    return (
      <div className='resultList' style={Style}>
        <p>This is the guidebox container for results</p>
      </div>
    )
  }
})

export default GuideboxList;
