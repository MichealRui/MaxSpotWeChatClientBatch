'use strict';
import React from 'react';
import LazyLoad from 'react-lazy-load';
import {Link} from 'react-router'
import util from '../../../util/WeChatUtil'
require('./index.css');

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {},
            can_load: true,
            imgPath : ''
        }
        this.defProductImg = DEFALUT_INFO.defaultImg
    }

    itemClick(e) {
        let storeid = this.props.storeid;
        let skunumber = this.props.item.skuNumber;
        window.location.href = ENV.domain + '/buyer_product/index.html?storeid='
            + storeid + '&skunumber=' + skunumber;
    }

    componentWillMount(){
        let props = this.props.item;
        let domain = 'http://114.215.143.97';
        let imgPath = props.imagePath ? (domain + util.getMiddlePic(props.imagePath)) : this.defProductImg;
        this.setState({
            imgPath : imgPath
        });

    }

    componentDidMount() {
        // let domain = 'http://114.215.143.97';
        // var imgs = new Image();
        // imgs.src = domain + util.getMiddlePic(this.props.item.imagePath);
        // let that = this;
        // imgs.onload = function () {
        //     if (that.state.can_load) {
        //         let img_width = imgs.width;
        //         let img_height = imgs.height;
        //         if (img_height < img_width) {
        //             that.setState({
        //                 style: {'width': '100%', 'height': 'auto'}
        //             })
        //         } else {
        //             that.setState({
        //                 style: {'height': '100%', 'width': 'auto'}
        //             })
        //         }
        //     }
        //
        // };
    }

    handleImageLoaded(){
        let that = this;
        let imgs = new Image();
        let skuImg = this.refs.skuImg;
        imgs.src = skuImg.src;
        imgs.onload = function () {
            let img_width = imgs.width;
            let img_height = imgs.height;
            if (img_height < img_width) {
                skuImg.style.width = '100%';
                skuImg.style.height = 'auto';
            } else {
                skuImg.style.height = '100%'
                skuImg.style.width = 'auto';
            }
        }
    }
    handleImageErrored(){
        this.refs.skuImg.src = this.defProductImg;
    }


    componentWillUnmount() {
        this.setState({
            can_load: false
        })
    }

    getAttr(attributes) {
        let def = <br></br>;
        var atts = def;
        if (attributes && attributes.length > 0) {
            atts = attributes.map(att => {
                if (att.value) {
                    return att.value + att.unit
                } else return ''
            }).reduce((pre, next) => {
                if (pre == '' && next == '') {
                    return ''
                } else {
                    return pre + next + ' '
                }
            }, '')
        }
        if (atts == '') {
            atts = def
        }
        return atts
    }

    getMiddlePic(path) {
        let particial = path.split('.');
        if (particial.length == 2) {
            particial[0] = particial[0] + '_middle'
            return particial.join('.')
        } else {
            return path
        }
    }

    render() {
        let props = this.props.item;
        let sliderItem = this.props.isSliderItem ? "sliderItem" : "commonItem";
        let domain = ENV.domain;
        domain = 'http://114.215.143.97';
        var atts = this.getAttr(props.attributes);
        let storeid = this.props.storeid;
        let skunumber = this.props.item.skuNumber;
        let campaignTag = props.tips ? <div className="campaignTag font12">{props.tips}</div> : '';
        let imgDiv = <img src={this.state.imgPath} className='productImg' ref="skuImg"
                          style={this.state.style}
                          onLoad={this.handleImageLoaded.bind(this)}
                          onError={this.handleImageErrored.bind(this)}
        />
        if (props.status == 2) {
            return null
        } else {
            return (
                <Link to={"/productDetail/" + storeid + "/" + skunumber} className="item_a">
                    <div className={"item " + sliderItem + (props.quantity > 0 ? '' : ' sellout')}>
                        {campaignTag}
                        {
                            sliderItem == 'sliderItem' ?
                                {imgDiv}
                                : (
                                <LazyLoad>
                                    {imgDiv}
                                </LazyLoad>
                            )
                        }
                        <div className='brandProductContainer'>
                            <p className={'productName font12'}>{props.brandName}</p>
                            <p className='productDesc font14'>{props.shortName}</p>
                            <p className={'categoryName font10'}>
                                {atts}
                            </p>
                        </div>
                        <div className='unitPrice font18'>{props.sellprice / 100 || 0 }<span
                            className="font12"> 元 </span></div>
                        {
                            sliderItem == 'sliderItem' ? '' : (this.props.children || null)

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