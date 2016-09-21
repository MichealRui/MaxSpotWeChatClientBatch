'use strict';
import React from 'react';
require('./index.css');

export default class Item extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let props = this.props.item;
        let show = this.props.isSliderItem? "hide":"show";
        props.imagePath='http://192.168.20.225:8080/client/components/Item/images/productImg.jpg';
        return (
            <div className={"item "+show}>
                <img src={props.imagePath} className='productImg' />
                <span className='brandProductContainer'>
                    <p className={'productName font12 '+show}>{props.brandName}Jingle Bells</p>
                    <p className='productDesc font16'>{props.name}超级好吃的饼干60g</p>
                    <p className={'categoryName font10 '+show}>{props.categoryName}净含量：40g 颜色：橙色</p>
                </span>
                <span className='unitPrice font14'>80{props.sellPrice}元</span>
                {this.props.children}
            </div>
        );
    }
}