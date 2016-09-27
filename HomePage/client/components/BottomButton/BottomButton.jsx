'use strict';
import React, { Component } from 'react';
import Counter from '../Counter/Counter';
require ('./index.css');

export default class BottomButton extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let cart = this.props.cart;
        let clearCart = this.props.clearCart;
        return (
            <div className={cart.remainTime?"bottomButton":"bottomButton empty"}>
                <div className='cartIcon'>
                    <span className='fa fa-shopping-cart font30'>
                        {cart.count>=0?(<span className='count font10'>{cart.count}</span>):''}
                    </span>
                </div>
                    {
                        cart.remainTime ?
                        <Counter remainTime={cart.remainTime}
                                 clearCart={clearCart}/> : ''
                    }
            </div>
        );
    }
}