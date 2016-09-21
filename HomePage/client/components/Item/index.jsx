'use strict';
import React from 'react';
require('./index.css');

export default class Item extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let props = this.props.item;
        return (
            <div className="item">
                <img src={props.imagePath} className='productImg' />
                <span className='brandProductContainer'>
                    <p className='productName font12'>{props.brandName}</p>
                    <p className='productDesc font14'>{props.name}</p>
                    <p className='productTaste font10'>{props.categoryName}</p>
                </span>
                <span className='quantity font14'><i>x</i>{props.count}</span>
                <span className='unitPrice font14'>{props.sellPrice}元</span>
                {this.props.children}
            </div>
        );
    }
}