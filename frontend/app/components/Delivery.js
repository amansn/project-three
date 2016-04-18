import React from 'react';
import axios from 'axios';
var Rating = require('react-rating');
var fa = require("fontawesome");
var FontAwesome = require('react-fontawesome');

const Delivery = React.createClass({
  contextTypes: {
    deliveryAjaxCall: React.PropTypes.func,
    deliveryAjaxReturn: React.PropTypes.object,
    deliveryMerchantsArray: React.PropTypes.array,
    deliveryChoice: React.PropTypes.object,
    favoriteFunction: React.PropTypes.func,
    currentDeliveryFavs: React.PropTypes.number,
    pullFavoritesNum: React.PropTypes.func
  },
  starsStyle: {
    backgroundColor: 'red'
  },
  renderDeliveryChoice: function() {
        let deliveryDisplay;

        if (!this.context.deliveryMerchantsArray.length) {
          return (
            <div className="delivery">
              <p>No results.</p>
            </div>
          )
        } else {

          //Build cuisine list
          let cuisineList = '';
          if (this.context.deliveryChoice.summary.cuisines !== null) {
            for (let i = 0; i < this.context.deliveryChoice.summary.cuisines.length - 1; i++) {
              cuisineList += this.context.deliveryChoice.summary.cuisines[i] + ', ';
            }
            cuisineList += this.context.deliveryChoice.summary.cuisines[this.context.deliveryChoice.summary.cuisines.length - 1];
          } else if (cuisineList === '') {
            cuisineList = '';
          };

          let orderingMinimum = '';
          let orderingMinimumTag;
          if (this.context.deliveryChoice.ordering.minimum !== null) {
            orderingMinimum = this.context.deliveryChoice.ordering.minimum;
            orderingMinimumTag = (<span className="ordering-minimum">${orderingMinimum} minimum</span>);
          } else if (orderingMinimum === null || orderingMinimum === '' || orderingMinimum == 0) {
            orderingMinimumTag = (<span className="ordering-minimum-none">No minimum</span>);
          };

          let deliveryFee = '';
          let deliveryFeeTag;
          if (this.context.deliveryChoice.ordering.delivery_charge !== null) {
            console.log(this.context.deliveryChoice);
            deliveryFee = this.context.deliveryChoice.ordering.delivery_charge;
            if (deliveryFee === null || deliveryFee === '' || deliveryFee == 0) {
              deliveryFeeTag = (<span className="delivery-fee-none">Free delivery</span>)
            } else {
              deliveryFee = this.context.deliveryChoice.ordering.delivery_charge;
              deliveryFeeTag = (<span className="delivery-fee">${deliveryFee} delivery fee</span>)
            }
          }

          let deliveryURL = '';
          let deliveryURLTag;
          if (this.context.deliveryChoice.summary.url.complete !== null) {
            deliveryURL = this.context.deliveryChoice.summary.url.complete;
            deliveryURLTag = (<a href={deliveryURL} className="order-button" target="_blank">Order</a>)
          }

          return (
            <div className="delivery">
              <div className="delivery-img-container">
                <img src={this.context.deliveryChoice.summary.merchant_logo} className="delivery-img"></img>
              </div>
              <div className="delivery-info-left">
                <div className="delivery-data">
                  <h2 className="delivery-name">{this.context.deliveryChoice.summary.name}</h2>
                  <p className="cuisine">{cuisineList}</p>
                </div>
                <div className="delivery-info-left-bottom">
                  {orderingMinimumTag}
                  <span className="misc-divider">&nbsp;|&nbsp;</span>
                  {deliveryFeeTag}
                </div>
              </div>
              <div className="delivery-info-right">
                <div className="delivery-info-right-top">
                  <Rating initialRate={this.context.deliveryChoice.summary.star_ratings} readonly={true} fractions={2} empty={'fa fa-star-o'} full={'fa fa-star'} />
                </div>
                <div className="delivery-info-right-bottom">
                  <div className="favorite-data">
                    <div className="favorite-num">
                      {this.displayFavs()}
                    </div>
                    <div className="favorite-icon">
                      {this.displayDeliveryFavHeart()}
                    </div>
                  </div>
                  <div className="order-button-div">
                  {deliveryURLTag}
                  </div>
                </div>
              </div>
            </div>
          )
        }
  },
  displayFavs: function() {
    console.log("running displayFavs");
    if (!this.context.deliveryChoice.favorites) {
    return <p className="display-favorites">0</p>
    } else {
    return <p className="display-favorites">{this.context.deliveryChoice.favorites}</p>
    }
  },
  displayDeliveryFavHeart: function() {
    if (this.context.deliveryChoice.favorited === true) {
      return <FontAwesome className="heart-icon-full" id="heart-icon-full" name='heart' onClick={this.context.favoriteFunction} />
    } else {
      return <FontAwesome className="heart-icon" id="heart-icon" name='heart-o' onClick={this.context.favoriteFunction} />
    }
  },
  render: function() {
    return this.renderDeliveryChoice();
  }
});

export default Delivery;
