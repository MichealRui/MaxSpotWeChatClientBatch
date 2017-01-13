'use strict';
import React, { Component } from 'react';
import Counter from '../../CommoonComponents/Counter/Counter';
import cart_img from './image/cart.png'
require ('./index.css');

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this._cartOnClick = e => {
            e.stopPropagation();
            window.location.href = 'http://www.mjitech.com/buyer_cart/index.html'
        }
    }

    // cartOnClick(e) {
    //     e.stopPropagation();
    //     window.location.href = 'http://www.mjitech.com/buyer_cart/index.html'
    // }

    render() {
        let cart = this.props.cart;
        let clearCart = this.props.clearCart;
        return (
            <div className={cart.remainTime?"bottomButton":"bottomButton empty"}
                 onClick={this.cartOnClick.bind(this)}
            >
                <div className='cartIcon'>
                    <a className='shopping_cart font30'>
                        <img src={cart_img} alt=""/>
                        <span className='count font10'>{cart.count || 0}</span>
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

Cart.propTypes = {
    cart: React.PropTypes.object
};

Cart.defaultProps = {
    cart: {
        count:0
    }
};