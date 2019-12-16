import React, { Component} from 'react';
import beerImg from '../images/beer.svg';
import './Beer.css';

class Beer extends Component {
  render() {
    return (
      <div className="Beer" id={this.props.beer._id}>
        <img className="Beer-img" src={beerImg} alt={this.props.beer.PRODUCT_LONG_NAME}/>
        <span className="Beer-name">{this.props.beer.PRODUCT_LONG_NAME}</span><br/>
        <span className="Beer-price">${this.props.beer.PRODUCT_PRICE}</span><br/>
        <span className="Beer-type">{this.props.beer.ITEM_CLASS_NAME}</span><br/>
        <span className="Beer-country">{this.props.beer.PRODUCT_COUNTRY_ORIGIN_NAME}</span><br/>
        <span className="Beer-sku">SKU: {this.props.beer.PRODUCT_SKU_NO}</span><br/>
      </div>
    );
  }
}

export default Beer;
