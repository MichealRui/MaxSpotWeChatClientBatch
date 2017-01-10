'use strict';
import React, { Component } from 'react';
import cart_img from './image/cart.png'
require ('./index.css');

export default class BottomButton extends Component {
    constructor(props) {
        super(props);
    }

    cartOnClick(e) {
        e.stopPropagation();
        window.location.href = 'http://www.mjitech.com/buyer_cart/index.html'
    }

    render() {
        let total = this.props.total;
        return (
            <div className={total?"bottomButton":"bottomButton empty"}
                 onClick={this.cartOnClick.bind(this)}
            >
                <div className='cartIcon'>
                    <a className='shopping_cart font30'>
                        <img src={cart_img} alt=""/>
                        {total > 0?(<span className='count font10'>{total}</span>):''}
                    </a>
                </div>
            </div>
        );
    }
}