'use strict';
import React from 'react';
require('./index.css');

export default class Item extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let props = this.props.item;
        // let sliderItem = this.props.isSliderItem? "sliderItem":"commonItem";
        return (
            <div className={"item sliderItem"}>
                <img src={'http://114.215.143.97' + props.imagePath} className='productImg' />
                <span className='brandProductContainer'>
                    <p className={'productName font23'}>{props.brandName}</p>
                    <p className='productDesc font23'>{props.shortName}</p>
                </span>
                <span className='unitPrice font28'>{props.sellprice / 100 || 0}元</span>
                {this.props.children||null}
            </div>
        );
    }
}