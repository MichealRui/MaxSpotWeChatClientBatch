'use strict';
import React from 'react';
import CountControl from '../../components/CountControl/CountControl';
require('./index.css')

export default class skuHeader extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     countShow : false
        // }
    }

    getAttribute(attribute){
        let def = '<span>&#12288;</span>'
        var atts = def;
        if(attribute && attribute.length > 0){
            atts = attribute.map((att)=>{
                if(att.value){
                    return att.value + att.unit
                }else{
                    return ''
                }
            }).reduce((pre,next)=>{
                if(pre == '' && next == ''){
                    return ''
                }else{
                    return pre + next + ' '
                }
            },'')
        }
        if(atts == ''){
            atts = ''
        }
        return atts;
    }

    addClick(e) {
        // todo update cart
        this.props.addToCart(
            this.props.item.productDetail
        );
    }

    showControl(){
        // this.setState({
        //     countShow : true
        // })
        this.props.showCountControl();
    }

    render() {
        let props = this.props;
        let item = props.item;
        let sku = item.productDetail;
        let campaignedProductList = props.campaignedProductList ? props.campaignedProductList : [];
        let cartProduct = new Array;
        campaignedProductList.map(
            (campaign,index)=>{
                // console.log(campaign);
                // return campaign.list;
                campaign.list.map(
                    (item,key)=>{
                        cartProduct.push(item);
                    }
                )
            }
        );
        let selProduct = cartProduct.filter((item)=> item.id == sku.id );
        sku.count = selProduct && selProduct.length > 0 ? selProduct[0].count : 0;
        let brand = item.brand;
        let attributes = sku.attributes;
        var attr = this.getAttribute(attributes)
        let sub_title = (
            <div className="sub_title">
                <p className="font26">{sku.brandName}</p>
                <p className="font32">{sku.name}</p>
                <p className="font26">{attr}</p>
            </div>
        );
        let new_sub_title = (
            <div>
                <p>{sku.brandName}</p>
                <p>{sku.name}</p>
                <p>{attr}</p>
            </div>
        );
        let sub_price = (
            <div className="sub_price">
                <p className="font48"><span className="font32">￥</span>{sku.sellprice/100 || 0 }</p>
                {/*<p className={"font24 "+(sku.quantity>0 ? '':'hide')}>市场价 {sku.msrp/100}元</p>*/}
            </div>
        );
        let new_sub_price = (
            <div className="skuPrice">
                <span className="font50">{sku.sellprice/100 || 0 }<span className="font26">元</span> </span>
                <span className={"font26 "+(sku.msrp?'':'hide')}>原价{sku.msrp/100 || 0 }元</span>
            </div>
        );
        return (

            <div className="skuHeader">
                {sub_title}
                {new_sub_price}
                <a className={"addCartText " + (this.props.countShow ? 'hide ' : '') + (sku.quantity>0?'':'empty')} onClick={()=>this.showControl.bind(this)()} disabled={ sku.quantity <= 0 } >{sku.quantity>0 ? '加入购物车':'缺货'}</a>
                <div className={(this.props.countShow ? '' : 'hide')}>
                    <CountControl item={sku}
                                  decrease={this.props.dec}
                                  addItem={this.props.add}
                                  countFontSize = "font24"
                                  fontClass="font30"
                                  countClass="skuContainerCount"
                    />
                </div>
            </div>
        )
    }
}

