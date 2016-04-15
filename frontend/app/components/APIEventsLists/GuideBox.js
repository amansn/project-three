import React from 'react';
import axios from 'axios';


const GuideboxList = React.createClass({

  getInitialState: function(){
    return {
      ajaxReturn: [],
      Return: "ajax return title",
      index: 0
    };
  },

ajaxCall: function(){
    axios.get('https://api-public.guidebox.com/v1.43/US/rKDqDZiPpmsCg2VsdbhDlPMmRr500AC1/shows/all/1/250/all/all')
    .then(function(response){
      console.log(response.data);


      this.setState({
        ajaxReturn: response.data,
        Return: response.data.results[this.state.index].title
      });


      // console.log(this.state.ajaxReturn);
      // console.log(this.state.ajaxReturn.results[0].title);

    }.bind(this))
    .catch(function(err){
      console.warn('error');
      return err;
    })
  },

  render: function(){
    var ListStyle = {
      border: '3px solid black'
    }



    return (
      <div className='resultList' style={ListStyle}>
        <p>This is the guidebox container for results</p>
        <button
          onClick={this.ajaxCall}>Shows
        </button>
        <div>
          <h1>{this.state.Return}</h1>
        </div>
      </div>
    )
  }
})

export default GuideboxList;
