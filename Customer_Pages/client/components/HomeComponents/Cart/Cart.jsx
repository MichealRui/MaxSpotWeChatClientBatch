'use strict';
import React, { Component } from 'react';
import Counter from '../../CommoonComponents/Counter/Counter';
import cart_img from './image/cart.png'

import {Link} from 'react-router'
require ('./index.css');

export default class Cart extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let cart = this.props.cart;
        let clearCart = this.props.clearCart;
        return (
            <Link to="/shoppingCart">
                <div className={cart.remainTime?"bottomButton":"bottomButton empty"}
                >
                    <div className='cartIcon'>
                        <div className='shopping_cart font30'>
                            <img src={cart_img} alt="购物车"/>
                            <span className='count font10'>{cart.count || 0}</span>
                        </div>
                    </div>
                    {
                        cart.remainTime ?
                        <Counter remainTime={cart.remainTime}
                                 timeUpCallback={clearCart}/> : null
                    }
                </div>
            </Link>
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