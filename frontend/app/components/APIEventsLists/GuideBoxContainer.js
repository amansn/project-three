import React from 'react';
import axios from 'axios';
import GuideBoxList from './GuideBox';




const GuideBoxContainer = React.createClass({

  getInitialState: function(){
    return {
      ajaxReturn: [],
      Return: "ajax return title",
      index: 0,
      objectArray: []
    };
  },




ajaxCall: function(){
    axios.get('https://api-public.guidebox.com/v1.43/US/rKDqDZiPpmsCg2VsdbhDlPMmRr500AC1/shows/all/1/250/all/all')
    .then(function(response){
      console.log(response.data);

      // response.data.results.map(function(title){
      //   objectArray.push(title)
      //   return objectArray
      // })

      // objectArrayPush: function(){
      //   var tempArray = [];
      //   var results = response.data.results;
      //   for (var i = 0; i < results.length; i++) {
      //     tempArray.push(results[i].title)
      //     }
      //     this.setState({
      //       objectArray: tempArray
      //     })
      //     console.log(this.state.objectArray);
      //   }

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

  IndexStateChange: function(){
    var tempIndex = this.state.index;
    tempIndex++;
      this.setState({
      index: tempIndex,

      });
      axios.get('https://api-public.guidebox.com/v1.43/US/rKDqDZiPpmsCg2VsdbhDlPMmRr500AC1/shows/all/1/250/all/all')
      .then(function(response){
        console.log(response.data);

        // response.data.results.map(function(title){
        //   objectArray.push(title)
        //   return objectArray
        // })

        // objectArrayPush: function(){
        //   var tempArray = [];
        //   var results = response.data.results;
        //   for (var i = 0; i < results.length; i++) {
        //     tempArray.push(results[i].title)
        //     }
        //     this.setState({
        //       objectArray: tempArray
        //     })
        //     console.log(this.state.objectArray);
        //   }

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

    return (
      <div className='guidebox-container'>
        <GuideBoxList
          Return={this.state.Return}
          ajaxCall={this.ajaxCall}
          IndexStateChange={this.IndexStateChange}/>
      </div>
    )
  }
})

export default GuideBoxContainer;
