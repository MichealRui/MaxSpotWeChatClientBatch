'use strict';
import React from 'react';
require('./index.css');

export default class AddButton extends React.Component {
    constructor(props) {
        super(props)
    }
    
    addClick(e) {
        // todo update cart
        console.log("add")
        e.stopPropagation();
        let cart = this.props.cart;

        this.props.click(
            {
                storeId: this.props.store.id + '',
                skuId: this.props.item.id + '',
                count: '1'
            }
        )

    }
    
    render() {
        let props = this.props;
        return (
            <span className="add font30" item={props.item} onClick={this.addClick.bind(this)}><img src={require('../BottomButton/image/plus.png')} alt=""/></span>
        )
    }
}