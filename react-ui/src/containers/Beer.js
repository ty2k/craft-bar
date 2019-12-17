import React from 'react';
import beerImg from '../images/beer.svg';
import './Beer.css';

function Beer(props) {
  return (
    <div className="Beer" id={props.beer._id}>
      <img className="Beer-img" src={beerImg} alt={props.beer.PRODUCT_LONG_NAME}/>
      <span className="Beer-name">{props.beer.PRODUCT_LONG_NAME}</span><br/>
      <span className="Beer-price">${props.beer.PRODUCT_PRICE}</span><br/>
      <span className="Beer-type">{props.beer.ITEM_CLASS_NAME}</span><br/>
      <span className="Beer-country">{props.beer.PRODUCT_COUNTRY_ORIGIN_NAME}</span><br/>
      <span className="Beer-sku">SKU: {props.beer.PRODUCT_SKU_NO}</span><br/>
    </div>
  );
}

export default Beer;
