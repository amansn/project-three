import React from 'react';


//Make a GuideBoxContaienr thats render has the GuideBox component in it.


const GuideBoxList = React.createClass({
  render: function(){
    var ListStyle = {
      border: '3px solid black',
      display: 'flex',
      justifyContent: 'space-around'
    }

    return(
      <div className='resultList' style={ListStyle}>

        <div>
          <button
            onClick={this.props.ajaxCallShows}>Shows
          </button>
          <h1>{this.props.ReturnTitle}</h1>
          <img src={this.props.ReturnImage}/>
          <br></br>
          <button
            onClick={this.props.ShowIndexStateChange}
            >

            Next
          </button>
        </div>
        <div>
          <button
            onClick={this.props.ajaxCallMovies}>Movies</button>
          <h1>{this.props.ReturnMovieTitle}</h1>
          <img src={this.props.ReturnMovieImage} alt="Movie Image"/>
          <br></br>
          <button
            onClick={this.props.MovieIndexStateChange}>
            Next
          </button>
        </div>
      </div>
    )
  }
})



export default GuideBoxList;
