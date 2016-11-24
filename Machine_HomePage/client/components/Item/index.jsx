'use strict';
import React from 'react';
require('./index.css');

export default class Item extends React.Component {
    constructor(props) {
        super(props)
    }

    addClick(e) {
        // todo update cart
        this.props.click(
            {
                storeId: this.props.store.id + '',
                skuId: this.props.item.id + '',
                count: '1'
            }
        );
        e.stopPropagation()
    }

    showClick() {
        this.props.show()
    }

    render() {
        let props = this.props.item;
        // let sliderItem = this.props.isSliderItem? "sliderItem":"commonItem";
        return (
            <div className={"item sliderItem"} onClick={this.showClick.bind(this)}>
                <img src={require('./images/product-1.jpg')} className='productImg' />
                <span className='brandProductContainer'>
                    <p className={'productName font23'}>{props.brandName}</p>
                    <p className='productDesc font23'>{props.shortName}</p>
                </span>
                <span className='unitPrice font28'>{props.sellprice / 100 || 0}元</span>
                <span className="add font30" onClick={this.addClick.bind(this)}>+</span>
            </div>
        );
    }
}