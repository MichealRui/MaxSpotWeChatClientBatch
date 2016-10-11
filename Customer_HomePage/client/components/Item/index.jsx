'use strict';
import React from 'react';
require('./index.css');

export default class Item extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let props = this.props.item;
        let sliderItem = this.props.isSliderItem? "sliderItem":"commonItem";
        return (
            <div className={"item "+sliderItem}>
                <img src={'http://www.mjitech.com/' + props.imagePath} className='productImg' />
                <span className='brandProductContainer'>
                    <p className={'productName font12'}>{props.brandName}Jingle Bells</p>
                    <p className='productDesc font16'>{props.name}超级好吃的饼干60g</p>
                    <p className={'categoryName font10'}>{props.categoryName}净含量：40g 颜色：橙色</p>
                </span>
                <span className='unitPrice font14'>80{props.sellPrice}元</span>
                {this.props.children}
            </div>
        );
    }
}