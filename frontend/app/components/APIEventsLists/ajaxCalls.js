const AjaxCalls = React.createClass({
  getInitialState: function(){
    return {
      ajaxReturn: []
    };
  },


  const getTVShows = function(){
    axios.get('http://api-public.guidebox.com/v1.43/US/' + guideBoxKey + '/shows/all/1/1000/all/all')
    .then(function(response){
      console.log(response.data);
      this.setState({
        ajaxReturn: response.data
      });
    }.bind(this))
    .catch(function(err){
      console.warn('error');
      return err;
    })
  },
  render: function(){
    return(
      <div className='get-shows'>

      </div>
    )
  }
})
