import React from 'react';


//Make a GuideBoxContaienr thats render has the GuideBox component in it.


const GuideBoxList = React.createClass({
  render: function(){
    var ListStyle = {
      border: '3px solid black'
    }
    return(
      <div className='resultList' style={ListStyle}>
        <p>This is the guidebox container for results</p>
        <button
          onClick={this.props.ajaxCall}>Shows
        </button>
        <div>
          <h1>{this.props.ReturnTitle}</h1>
          <img src={this.props.ReturnImage} alt="Image"/>
          <br></br>
          <button
            onClick={this.props.IndexStateChange}
            >

            Next
          </button>
        </div>
      </div>
    )
  }
})



export default GuideBoxList;
