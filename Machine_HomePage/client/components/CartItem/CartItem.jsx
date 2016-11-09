import React from 'react';
import ReactDOM from 'react-dom';

export default class CartItem extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class="cart-item my-item">
                <div class="item-pic">
                    <img src="images/product-1.jpg" alt="Product name" />
                </div>
                <h2 class="item-name">
                    <span>SALT LANOON</span>
                    <span>樱桃汁 600ml</span>
                </h2>
                <h3 class="item-price clearfix">
                    <span class="final-price">¥85</span>
                    <span class="market-price">市场价¥126</span>
                </h3>
                <div class="item-panel clearfix">
                    <div class="counting clearfix">
                        <a class="btn-minus">-</a>
                        <input type="text" class="quantity" value="1" />
                        <a class="btn-plus">+</a>
                    </div>
                    <a class="trash">Remove this item!</a>
                </div><!-- panel -->
            </div>
        )
    }
}
