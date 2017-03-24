'use strict';
import React from 'react';
require('./index.css');

export default class AddButton extends React.Component {
    constructor(props) {
        super(props)
    }
    
    addClick(e) {
        // todo update cart
        e.stopPropagation();
        e.preventDefault();
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
            <div className="addContainer" onClick={this.addClick.bind(this)}>
                <span className="add " item={props.item}>
                    <img src={require('./image/plus.png')} alt=""/>
                </span>
            </div>
        )
    }
}