'use strict';
import React from 'react';
import LazyLoad from 'react-lazy-load';
const defProductImg = require('./images/default.png');
require('./index.css');

export default class Item extends React.Component {
    constructor(props) {
        super(props)
    }

    itemClick(e) {
        console.log(e)
        let storeid = this.props.storeid;
        let skunumber = this.props.item.skuNumber;
        window.location.href = ENV.domain + '/buyer_product/index.html?storeid='
            + storeid + '&skunumber=' + skunumber;
    }

    getAttr(attributes) {
        var atts = <br/>;
        if(attributes && attributes.length > 0) {
            atts = attributes.map(att => {
                if(att.value) {
                    return att.value + att.unit
                } else return ''
            }).reduce((pre, next) => pre + next + ' ', '')
        }
        return atts
    }

    render() {
        let props = this.props.item;
        let sliderItem = this.props.isSliderItem? "sliderItem":"commonItem";
        let soldOut = <span className="soldOut font14">售 罄</span>;
        let domain = ENV.domain;
        var atts = this.getAttr(props.attributes);
        return (
            <div className={"item "+sliderItem} onClick={this.itemClick.bind(this)}>
                {
                    sliderItem == 'sliderItem' ?
                        <img src={ domain + props.imagePath } className='productImg' />
                        : (
                            props.imagePath ?
                                <LazyLoad height={'45%'}>
                                    <img src={ domain + props.imagePath } className='productImg' />
                                </LazyLoad> :
                                <LazyLoad height={'45%'}>
                                    <img src={ defProductImg } className='productImg' />
                                </LazyLoad>
                        )
                }
                {/*<img src={'http://114.215.143.97' + props.imagePath} className='productImg' />*/}
                <span className='brandProductContainer'>
                    <p className={'productName font12'}>{props.brandName}</p>
                    <p className='productDesc font14'>{props.shortName}</p>
                    <p className={'categoryName font10'}>
                        {atts}
                    </p>
                </span>
                <span className='unitPrice font18'>{props.sellprice/100 || 0 }元</span>
                {
                    sliderItem == 'sliderItem' ? '' :
                    props.quantity > 0 ? (this.props.children||null) : soldOut
                }

            </div>
        );
    }
}