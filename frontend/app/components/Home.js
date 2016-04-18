import React from 'react';
import KEYS from '../config/KEYS';
import axios from 'axios';
import DeliveryContainer from '../containers/DeliveryContainer';
import LocationContainer from '../containers/LocationContainer';
import WatchContainer from '../containers/WatchContainer';
require("../styles/home.css");

const Home = React.createClass({
  getInitialState: function() {
    return {
      test: 'test',
      locationInput: '',
      deliveryAjaxReturn: {
        merchants: []
      },
      deliveryMerchantsArray: [],
      deliveryChoice: {
        ordering: {
          minimum: '',
          delivery_charge: ''
        },
        summary: {
          cuisines: [],
          url: {
            complete: ''
          },
          star_ratings: 0
        },
        favorites: 0
      },
      locationSuccess: false,
      latitude: 0,
      longitude: 0,
      currentDeliveryInt: 0,
      currentDeliveryFavs: 0,
      favsAjaxReturn: [],
      watchAjaxReturn: {},
      watchArray: [],
      watchChoice: {
        details: {
          genres: [
            {
              title: ''
            }
          ],
          subscription_web_sources: [],
          purchase_web_sources: []
        },
        favorited: false,
        favorites: 0
      },
      currentWatchFavs: 0,
      currentWatchInt: 0,
      currentWatchDetailsReturn: {},
      favsWatchAjaxReturn: []
    }
  },
  locationInputFuncHandler: function(e) {
    this.setState({
      locationInput: e.target.value,
    });
  },
  locationInputFuncHandlerAuto: function(e) {
    this.setState({
      locationInput: e.target.value,
    });
  },
  getChildContext: function() {
    return {
      locationInput: this.state.locationInput,
      locationInputFunc: this.locationInputFuncHandler,
      deliveryAjaxCall: this.deliveryAjaxRun,
      deliveryAjaxReturn: this.state.deliveryAjaxReturn,
      deliveryMerchantsArray: this.state.deliveryMerchantsArray,
      deliveryChoice: this.state.deliveryChoice,
      locationSuccess: this.state.locationSuccess,
      currentDeliveryInt: this.state.currentDeliveryInt,
      moveForwardDelivery: this.moveForwardDelivery,
      moveReverseDelivery: this.moveReverseDelivery,
      favoriteFunction: this.favoriteFunction,
      pullFavoritesNum: this.pullFavoritesNum,
      currentDeliveryFavs: this.state.currentDeliveryFavs,
      favsAjaxReturn: this.state.favsAjaxReturn,
      moveForwardWatch: this.moveForwardWatch,
      moveReverseWatch: this.moveReverseWatch,
      watchAjaxCall: this.watchAjaxCall,
      watchAjaxReturn: this.state.watchAjaxReturn,
      watchArray: this.state.watchArray,
      watchChoice: this.state.watchChoice,
      favoriteWatchFunction: this.favoriteWatchFunction,
      currentWatchFavs: this.state.currentWatchFavs,
      pullWatchFavoritesNum: this.pullWatchFavoritesNum,
      ajaxRun: this.ajaxRun,
      currentWatchDetailsReturn: this.state.currentWatchDetailsReturn,
      favsWatchAjaxReturn: this.state.favsWatchAjaxReturn
    }
  },
  childContextTypes: {
    locationInput: React.PropTypes.string,
    locationInputFunc: React.PropTypes.func,
    deliveryAjaxCall: React.PropTypes.func,
    deliveryAjaxReturn: React.PropTypes.object,
    deliveryMerchantsArray: React.PropTypes.array,
    deliveryChoice: React.PropTypes.object,
    locationSuccess: React.PropTypes.bool,
    currentDeliveryInt: React.PropTypes.number,
    moveForwardDelivery: React.PropTypes.func,
    moveReverseDelivery: React.PropTypes.func,
    favoriteFunction: React.PropTypes.func,
    pullFavoritesNum: React.PropTypes.func,
    currentDeliveryFavs: React.PropTypes.number,
    favsAjaxReturn: React.PropTypes.array,
    moveForwardWatch: React.PropTypes.func,
    moveReverseWatch: React.PropTypes.func,
    watchAjaxCall: React.PropTypes.func,
    watchAjaxReturn: React.PropTypes.object,
    watchArray: React.PropTypes.array,
    watchChoice: React.PropTypes.object,
    favoriteWatchFunction: React.PropTypes.func,
    currentWatchFavs: React.PropTypes.number,
    pullWatchFavoritesNum: React.PropTypes.func,
    ajaxRun: React.PropTypes.func,
    currentWatchDetailsReturn: React.PropTypes.object,
    favsWatchAjaxReturn: React.PropTypes.array
  },
  ajaxRun: function() {
    //Use this to run both ajax functions for results
    this.deliveryAjaxRun();
    this.watchAjaxCall();
  },
  deliveryAjaxRun: function() {
    console.log("running delivery ajax call");
    axios.get('https://sandbox.delivery.com/merchant/search/delivery?client_id=' + KEYS.DELIVERY_ID + '&address=' + this.state.locationInput)
    .then(function(response) {
      console.log("response.data", response.data);
      this.setState({
        deliveryAjaxReturn: response.data,
        deliveryMerchantsArray: response.data.merchants,
        locationSuccess: true
      });
      //Randomly select a restaurant as an offeredChoice
      if (this.state.deliveryAjaxReturn.merchants.length) {
        //Shuffle the array of delivery results

        this.shuffleDeliveryResults(this.state.deliveryMerchantsArray);
        this.setState({
          deliveryChoice: this.state.deliveryMerchantsArray[this.state.currentDeliveryInt],
          locationSuccess: true
        });

      } else {
        console.log("No merchants");
      }
    }.bind(this))
    .catch(function(err){
      console.warn('Error:', err);
      return err;
    })
  },
  shuffleDeliveryResults: function(array) {
    /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   **/
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    this.setState({
      deliveryMerchantsArray: array
    }, function() {
      this.pullFavoritesNum();
    });
    console.log("state", this.state.deliveryMerchantsArray);
  },
  shuffleWatchResults: function(array) {
    /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   **/
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    this.setState({
      watchArray: array
    }, function() {
      this.pullWatchFavoritesNum();
    });
    console.log("new watchArray after shuffle", this.state.watchArray);
  },
  moveForwardDelivery: function() {
    if(this.state.currentDeliveryInt === this.state.deliveryMerchantsArray.length - 1) {
      this.setState({
        currentDeliveryInt: 0
      }, function() {
        this.setState({
          deliveryChoice: this.state.deliveryMerchantsArray[this.state.currentDeliveryInt]
        });
      });
    } else {
      this.setState({
        currentDeliveryInt: this.state.currentDeliveryInt + 1
      }, function() {
        this.setState({
          deliveryChoice: this.state.deliveryMerchantsArray[this.state.currentDeliveryInt]
        });
      });
    }
  },
  moveReverseDelivery: function() {
    if(this.state.currentDeliveryInt === 0) {
      this.setState({
        currentDeliveryInt: this.state.deliveryMerchantsArray.length - 1
      }, function() {
        this.setState({
          deliveryChoice: this.state.deliveryMerchantsArray[this.state.currentDeliveryInt]
        });
      });
    } else {
      this.setState({
        currentDeliveryInt: this.state.currentDeliveryInt - 1
      }, function() {
        this.setState({
          deliveryChoice: this.state.deliveryMerchantsArray[this.state.currentDeliveryInt]
        });
      });
    }
  },
  updateLatLngFunc: function(lat,long) {
    this.setState({
      latitude: lat,
      longitude: long,
    });
  },
  componentDidMount: function() {
    let tempLatitude;
    let tempLongitude;
    let tempAddress;
    let postAjaxLocationInput = this.locationInputFuncHandlerAuto;
    let tempAddressEvent = {
      target: {
        value: ''
      }
    }
    let updateLatLngFuncTemp = this.updateLatLngFunc;

    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ position.coords.latitude + ',' + position.coords.longitude + '&key=' + KEYS.GEOCODING_KEY)
      .then(function(response) {
        console.log("response.data", response.data);
        tempLatitude = position.coords.latitude;
        tempLongitude = position.coords.longitude;
        tempAddress = response.data.results[0].formatted_address;
        document.getElementById('location-input').value = response.data.results[0].formatted_address;
        tempAddressEvent = {
          target: {
            value: response.data.results[0].formatted_address
          }
        }
        console.log(tempAddressEvent);
        postAjaxLocationInput(tempAddressEvent);
        updateLatLngFuncTemp(tempLatitude,tempLongitude);
      }.bind(this))
      .catch(function(err) {
        console.warn('Error:', err);
        return err;
      })
    });
  },
  showDeliveryAndWatch: function() {
    if (this.state.locationSuccess) {
      return(
        <div className="home">
          <DeliveryContainer />
          <div><p className="plus">&#43;</p></div>
          <WatchContainer />
        </div>
        )
    } else {
      return (
        <p></p>
        )
    }
  },
  favoriteFunction: function() {
    console.log('fav fxn');
    let tempArray = this.state.deliveryMerchantsArray;

    if (tempArray[this.state.currentDeliveryInt].favorited === true) {
      tempArray[this.state.currentDeliveryInt].favorited = false;
      this.deliveryFavRemove();
    } else {
      tempArray[this.state.currentDeliveryInt].favorited = true;
      this.deliveryFavAdd();
    }
    this.setState({
      deliveryMerchantsArray: tempArray
    });
  },
  deliveryFavAdd: function() {
    axios.post('http://localhost:3000/delivery/' + this.state.deliveryChoice.id + '/add', {})
    .then(function(response) {
      console.log("Response.data:", response.data);
      let tempArray = this.state.deliveryMerchantsArray;
      if (!tempArray[this.state.currentDeliveryInt].favorites) {
        tempArray[this.state.currentDeliveryInt].favorites = 0;
      }
      tempArray[this.state.currentDeliveryInt].favorites += 1;
      this.setState({
        deliveryMerchantsArray: tempArray
      });
    }.bind(this))
    .catch(function(err) {
      console.warn("Error");
      return err;
    })
  },
  deliveryFavRemove: function() {
    axios.post('http://localhost:3000/delivery/' + this.state.deliveryChoice.id + '/remove', {})
    .then(function(response) {
      console.log("Response.data:", response.data);
      let tempArray = this.state.deliveryMerchantsArray;
      tempArray[this.state.currentDeliveryInt].favorites -= 1;
      this.setState({
        deliveryMerchantsArray: tempArray
      });
    }.bind(this))
    .catch(function(err) {
      console.warn("Error");
      return err;
    })
  },
  pullFavoritesNum: function() {
    console.log("running pullFavoritesNum");
    axios.get('http://localhost:3000/delivery/')
    .then(function(response) {
      console.log("Response.data:", response.data);
      this.setState({
        favsAjaxReturn: response.data
      }, function() {
        console.log("favsAjaxReturn:", this.state.favsAjaxReturn);
        for (let i = 0; i < this.state.favsAjaxReturn.length; i++) {
          for (let j = 0; j < this.state.deliveryMerchantsArray.length; j++) {
            if (this.state.favsAjaxReturn[i].id === this.state.deliveryMerchantsArray[j].id) {
              let tempArray = this.state.deliveryMerchantsArray;
              tempArray[j].favorites = this.state.favsAjaxReturn[i].favorites;
              this.setState({
                deliveryMerchantsArray: tempArray
              })
            }
          }
        }
      });
    }.bind(this))
    .catch(function(err) {
      console.warn("Error");
      return err;
    })
  },
  moveForwardWatch: function() {
    if(this.state.currentWatchInt === this.state.watchArray.length - 1) {
      this.setState({
        currentWatchInt: 0
      }, function() {
        this.setState({
          deliveryChoice: this.state.watchArray[this.state.currentWatchInt]
        }, function() {
          this.watchDetailsAjaxCall();
        });
      });
    } else {
      this.setState({
        currentWatchInt: this.state.currentWatchInt + 1
      }, function() {
        this.setState({
          watchChoice: this.state.watchArray[this.state.currentWatchInt]
        }, function() {
          this.watchDetailsAjaxCall();
        });
      });
    }
  },
  moveReverseWatch: function() {
    if(this.state.currentWatchInt === 0) {
      this.setState({
        currentWatchInt: this.state.watchArray.length - 1
      }, function() {
        this.setState({
          watchChoice: this.state.watchArray[this.state.currentWatchInt]
        }, function() {
          this.watchDetailsAjaxCall();
        });
      });
    } else {
      this.setState({
        currentWatchInt: this.state.currentWatchInt - 1
      }, function() {
        this.setState({
          watchChoice: this.state.watchArray[this.state.currentWatchInt]
        }, function() {
          this.watchDetailsAjaxCall();
        });
      });
    }
  },
  watchAjaxCall: function() {
    console.log("running watch ajax call");
    let randomMoviesStartNum = Math.floor(Math.random() * 74000);
    //Ajax call for movies
    axios.get('https://api-public.guidebox.com/v1.43/US/' + KEYS.GUIDEBOX_KEY + '/movies/all/' + randomMoviesStartNum + '/250/all/all')
    .then(function(response) {
      console.log("response.data", response.data);
      this.setState({
        watchAjaxReturn: response.data,
        watchArray: response.data.results,
      }, function() {
        //Randomly select a restaurant as an offeredChoice
        if (this.state.watchArray.length) {
          //Shuffle the array of watch results
          this.shuffleWatchResults(this.state.watchArray);
          this.setState({
            watchChoice: this.state.watchArray[this.state.currentWatchInt]
          }, function() {
            var tempWatchArray = this.state.watchArray;
            for (var i = 0; i < this.state.watchArray.length; i++) {
              tempWatchArray[i].details = {
                genres: [
                  {
                    title: ''
                  }
                ],
                trailers: {
                  web: []
                },
                subscription_web_sources: [],
                purchase_web_sources: []
              }
            }
            this.setState({
              watchArray: tempWatchArray
            });
            this.watchDetailsAjaxCall();
          });
        } else {
          console.log("No movies");
        }
      });

    }.bind(this))
    .catch(function(err){
      console.warn('Error:', err);
      return err;
    })
  },
  watchDetailsAjaxCall: function() {
    //This function runs another API call to guidebox that gets more details on the current movie
    axios.get('https://api-public.guidebox.com/v1.43/US/' + KEYS.GUIDEBOX_KEY + '/movie/' + this.state.watchChoice.id)
    .then(function(response) {
      console.log("watchDetailsAjaxCall response.data", response.data);
      let tempWatchChoice = this.state.watchChoice;
      tempWatchChoice.details = response.data;
      this.setState({
        watchChoice: tempWatchChoice
      }, function() {
        let tempArray = this.state.watchArray;
        tempArray[this.state.currentWatchInt] = tempWatchChoice;
        this.setState({
          watchArray: tempArray
        });
      });
    }.bind(this))
    .catch(function(err){
      console.warn('Error:', err);
      return err;
    })
  },
  favoriteWatchFunction: function() {
    console.log('fav fxn for watch');
    let tempArray = this.state.watchArray;

    if (tempArray[this.state.currentWatchInt].favorited === true) {
      tempArray[this.state.currentWatchInt].favorited = false;
      this.deliveryWatchRemove();
    } else {
      tempArray[this.state.currentWatchInt].favorited = true;
      this.deliveryWatchAdd();
    }
    this.setState({
      watchArray: tempArray
    });
  },
  pullWatchFavoritesNum: function() {
    console.log("running pullWatchFavoritesNum");
    axios.get('http://localhost:3000/watch/')
    .then(function(response) {
      console.log("Response.data:", response.data);
      this.setState({
        favsWatchAjaxReturn: response.data
      }, function() {
        console.log("favsAjaxReturn:", this.state.favsWatchAjaxReturn);
        for (let i = 0; i < this.state.favsWatchAjaxReturn.length; i++) {
          for (let j = 0; j < this.state.watchArray.length; j++) {
            if (this.state.favsWatchAjaxReturn[i].id === this.state.watchArray[j].id) {
              let tempArray = this.state.watchArray;
              tempArray[j].favorites = this.state.favsWatchAjaxReturn[i].favorites;
              this.setState({
                watchArray: tempArray
              })
            }
          }
        }
      });
    }.bind(this))
    .catch(function(err) {
      console.warn("Error");
      return err;
    })
  },
  deliveryWatchAdd: function() {
    axios.post('http://localhost:3000/watch/' + this.state.watchChoice.id + '/add', {})
    .then(function(response) {
      console.log("Response.data:", response.data);
      let tempArray = this.state.watchArray;
      if (!tempArray[this.state.currentWatchInt].favorites) {
        tempArray[this.state.currentWatchInt].favorites = 0;
      }
      tempArray[this.state.currentWatchInt].favorites += 1;
      this.setState({
        watchArray: tempArray
      });
    }.bind(this))
    .catch(function(err) {
      console.warn("Error");
      return err;
    })
  },
  deliveryWatchRemove: function() {
    axios.post('http://localhost:3000/watch/' + this.state.watchChoice.id + '/remove', {})
    .then(function(response) {
      console.log("Response.data:", response.data);
      let tempArray = this.state.watchArray;
      tempArray[this.state.currentWatchInt].favorites -= 1;
      this.setState({
        watchArray: tempArray
      });
    }.bind(this))
    .catch(function(err) {
      console.warn("Error");
      return err;
    })
  },
  render: function() {
    return (
      <div className="home">
        <LocationContainer />
        {this.showDeliveryAndWatch()}
        <div className="authors">
          <p className="authors-by"></p>
          <p className="author">Aman Nagpal</p>
          <p className="author">Jonathan Schupak</p>
          <p className="author">Matthew Jaikaran</p>
        </div>
      </div>
    )
  }
});

export default Home;
