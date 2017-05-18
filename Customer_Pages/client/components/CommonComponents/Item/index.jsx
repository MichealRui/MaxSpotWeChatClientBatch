'use strict';
import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router'
import util from '../../../util/WeChatUtil'
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
        let def = <br></br>;
        var atts = def;
        if(attributes && attributes.length > 0) {
            atts = attributes.map(att => {
                if(att.value) {
                    return att.value + att.unit
                } else return ''
            }).reduce((pre, next) =>
            {
                if(pre == '' && next == '') {
                    return ''
                } else {
                    return pre + next + ' '
                }
            }, '')
        }
        if(atts == '') {
            atts=def
        }
        return atts
    }

    getMiddlePic(path) {
        let particial = path.split('.');
        if(particial.length == 2) {
            particial[0] = particial[0] + '_middle'
            return particial.join('.')
        } else {
            return path
        }
    }

    render() {
        let props = this.props.item;
        let sliderItem = this.props.isSliderItem? "sliderItem":"commonItem";
        let soldOut = <span className="soldOut font14">售 罄</span>;
        let domain = ENV.domain;
        domain = 'http://114.215.143.97';
        let defProductImg = DEFALUT_INFO.defaultImg
        var atts = this.getAttr(props.attributes);
        let storeid = this.props.storeid;
        let skunumber = this.props.item.skuNumber;
        let campaignTag = props.tips ? <div className="campaignTag font12">{props.tips}</div>:'';
        if(props.status == 2){
            return null
        }else{
            return (
                <Link to={"/productDetail/"+storeid+"/"+skunumber} className="item_a">
                    <div className={"item "+sliderItem + (props.quantity > 0 ? '' : ' sellout')} >
                        {campaignTag}
                        {
                            sliderItem == 'sliderItem' ?
                                <img src={ domain + util.getMiddlePic(props.imagePath) } className='productImg' />
                                : (
                                props.imagePath ?
                                    <LazyLoad height={'45%'}>
                                        <img src={ domain + util.getMiddlePic(props.imagePath) } className='productImg' />
                                    </LazyLoad> :
                                    <LazyLoad height={'45%'}>
                                        <img src={ defProductImg } className='productImg contain' />
                                    </LazyLoad>
                            )
                        }
                    <span className='brandProductContainer'>
                    <p className={'productName font12'}>{props.brandName}</p>
                    <p className='productDesc font14'>{props.shortName}</p>
                    <p className={'categoryName font10'}>
                        {atts}
                    </p>
                </span>
                        <span className='unitPrice font18'>{props.sellprice/100 || 0 }<span className="font12"> 元 </span></span>
                        {
                            sliderItem == 'sliderItem' ? '' : (this.props.children||null)

                        }
                        <div className="itemLayer">
                            <div className="circleSellout font14">缺货</div>
                        </div>

                    </div>

                </Link>
            );
        }

    }
}