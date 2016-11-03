'use strict';
import React, { Component } from 'react';
import Counter from '../Counter/Counter';
require ('./index.css');

export default class BottomButton extends Component {
    constructor(props) {
        super(props);
    }

    cartOnClick() {
        let cart = this.props.cart;
        if(0 < cart.count) {
            window.location.href = 'http://www.mjitech.com/buyer_cart/index.html'
        } else return false
    }

    render() {
        let cart = this.props.cart;
        let clearCart = this.props.clearCart;
        return (
            <div className={cart.remainTime?"bottomButton":"bottomButton empty"}>
                <div className='cartIcon'>
                    <a className='fa fa-shopping-cart font30' onClick={this.cartOnClick().bind(this)}>
                        {cart.count>=0?(<span className='count font10'>{cart.count}</span>):''}
                    </a>
                </div>
                    {
                        cart.remainTime ?
                        <Counter remainTime={cart.remainTime}
                                 timeUpCallback={clearCart}/> : ''
                    }
            </div>
        );
    }
}