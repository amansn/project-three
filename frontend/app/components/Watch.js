import React from 'react';
var Rating = require('react-rating');
var fa = require("fontawesome");
var FontAwesome = require('react-fontawesome');

const Watch = React.createClass({
  contextTypes: {
    watchAjaxCall: React.PropTypes.func,
    watchAjaxReturn: React.PropTypes.object,
    watchArray: React.PropTypes.array,
    watchChoice: React.PropTypes.object,
    favoriteWatchFunction: React.PropTypes.func,
    currentWatchFavs: React.PropTypes.number,
    pullWatchFavoritesNum: React.PropTypes.func,
    favoriteWatchFunction: React.PropTypes.func,
  },
  renderWatchChoice: function() {
    let watchDisplay;

    if (!this.context.watchArray.length) {
      return (
        <div className="watch">
          <p>No results</p>
        </div>
      )
    } else {

      let genresList = '';
      if (this.context.watchChoice.details.genres.length !== 0) {
        for (let i = 0; i < this.context.watchChoice.details.genres.length - 1; i++) {
          genresList += this.context.watchChoice.details.genres[i].title + ', ';
        }
        genresList += this.context.watchChoice.details.genres[this.context.watchChoice.details.genres.length - 1].title;
        }

      let trailerURL = '';
      let trailerTag;
      if (this.context.watchChoice.details.trailers.web.length !== 0) {
        trailerURL = this.context.watchChoice.details.trailers.web[0].link;
        trailerTag = (<a href={trailerURL} className="trailer-button" target="_blank">Watch Trailer</a>)
      }

      let releaseYear = '';
      if (this.context.watchChoice.release_year !== null & this.context.watchChoice.release_year !== 0) {
        releaseYear = ' (' + this.context.watchChoice.release_year + ')';
      }

      let purchaseList;
      if (this.context.watchChoice.details.purchase_web_sources.length) {

        let purchaseItems = this.context.watchChoice.details.purchase_web_sources.map((service) => {
          return <li><a href={service.link} target="_blank">{service.display_name}</a></li>
        })

        purchaseList = (
          <div className="purchase-list">
            <p>Purchase:</p>
            <ul>
              {purchaseItems}
            </ul>
          </div>
        )
      }

      let streamingList;
      if (this.context.watchChoice.details.subscription_web_sources.length) {

        let streamingItems = this.context.watchChoice.details.subscription_web_sources.map((service) => {
          return <li><a href={service.link} target="_blank">{service.display_name}</a></li>
        })

        streamingList = (
          <div className="streaming-list">
            <p>Streaming:</p>
            <ul>
              {streamingItems}
            </ul>
          </div>
        )
      }

      return (
        <div className="watch">
          <div className="watch-img-container">
            <img src={this.context.watchChoice.poster_120x171} className="watch-img"></img>
          </div>
          <div className="watch-info-left">
            <div className="watch-data">
              <h2 className="watch-name">{this.context.watchChoice.title}{releaseYear}</h2>
              <p className="genres">{genresList}</p>
            </div>
              {purchaseList}
              {streamingList}
          </div>
          <div className="watch-info-right">
            <div className="watch-info-right-top">
              <div className="favorite-data">
                <div className="favorite-num">
                  {this.displayWatchFavs()}
                </div>
                <div className="favorite-icon">
                  {this.displayWatchFavHeart()}
                </div>
              </div>
            </div>
            <div className="watch-info-right-bottom">
              <div className="trailer-button-div">
                {trailerTag}
              </div>
            </div>
          </div>
        </div>
      )
    }
  },
  displayWatchFavs: function() {
    console.log("running displayWatchFavs");
    if (!this.context.watchChoice.favorites) {
      return <p className="display-favorites">0</p>
    } else {
      return <p className="display-favorites">{this.context.watchChoice.favorites}</p>
    }
  },
  displayWatchFavHeart: function() {
    if (this.context.watchChoice.favorited === true) {
      return <FontAwesome className="heart-icon-full" id="heart-icon-full" name='heart' onClick={this.context.favoriteWatchFunction} />
    } else {
      return <FontAwesome className="heart-icon" id="heart-icon" name='heart-o' onClick={this.context.favoriteWatchFunction} />
    }
  },
  render: function() {
    return this.renderWatchChoice();
  }
});

export default Watch;
