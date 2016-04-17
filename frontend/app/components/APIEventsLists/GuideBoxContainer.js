import React from 'react';
import axios from 'axios';
import GuideBoxList from './GuideBox';
import guideBoxKey from './apiKeys'




const GuideBoxContainer = React.createClass({

  getInitialState: function(){
    return {
      ajaxReturn: [],
      ReturnTitle: "",
      ReturnImage: '',
      ShowIndex: 0,
      MovieIndex: 0,
      objectArray: [],
      ReturnMovieTitle: 'this is the movie title',
      ReturnMovieImage: []
    };
  },




ajaxCallShows: function(){
    axios.get('http://api-public.guidebox.com/v1.43/US/' + guideBoxKey + '/shows/all/1/250/netflix/all')
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
        ReturnTitle: response.data.results[this.state.ShowIndex].title,
        ReturnImage: response.data.results[this.state.ShowIndex].artwork_448x252
      });



      // console.log(this.state.ajaxReturn);
      // console.log(this.state.ajaxReturn.results[0].title);

    }.bind(this))


    .catch(function(err){
      console.warn('error');
      return err;
    })
  },

  ajaxCallMovies: function(){
    axios.get('https://api-public.guidebox.com/v1.43/US/' + guideBoxKey + '/movies/all/1/250/netflix/all')
    .then(function(response){
      // console.log(response.data.results[this.state.MovieIndex].poster_240x342);
      this.setState({
        ReturnMovieTitle: response.data.results[this.state.MovieIndex].title,
        ReturnMovieImage: response.data.results[this.state.MovieIndex].poster_240x342
      })
    }.bind(this))
  },

  ShowIndexStateChange: function(){
    var tempIndex = this.state.ShowIndex;
    tempIndex++;
      this.setState({
      ShowIndex: tempIndex,
      });
      axios.get('http://api-public.guidebox.com/v1.43/US/' + guideBoxKey + '/shows/all/1/250/netflix/all')
      .then(function(response){
        console.log(response.data);
        this.setState({
          ajaxReturn: response.data,
          ReturnTitle: response.data.results[this.state.ShowIndex].title,
          ReturnImage: response.data.results[this.state.ShowIndex].artwork_448x252
        });
      }.bind(this))
      .catch(function(err){
        console.warn('error');
        return err;
      })
   },

   MovieIndexStateChange: function(){
     var temp = this.state.MovieIndex;
     temp++;
     this.setState({
       MovieIndex: temp
     });
     axios.get('https://api-public.guidebox.com/v1.43/US/' + guideBoxKey + '/movies/all/1/250/netflix/all')
     .then(function(response){
       // console.log(response.data.results[this.state.MovieIndex].poster_240x342);
       this.setState({
         ReturnMovieTitle: response.data.results[this.state.MovieIndex].title,
         ReturnMovieImage: response.data.results[this.state.MovieIndex].poster_240x342
       })
     }.bind(this))
   },


  render: function(){

    return (
      <div className='guidebox-container'>
        <GuideBoxList
          ReturnTitle={this.state.ReturnTitle}
          ReturnImage={this.state.ReturnImage}
          ajaxCallShows={this.ajaxCallShows}
          ShowIndexStateChange={this.ShowIndexStateChange}
          ajaxCallMovies={this.ajaxCallMovies}
          MovieIndexStateChange={this.MovieIndexStateChange}
          ReturnMovieTitle={this.state.ReturnMovieTitle}
          ReturnMovieImage={this.state.ReturnMovieImage}
          />
      </div>
    )
  }
})

export default GuideBoxContainer;
