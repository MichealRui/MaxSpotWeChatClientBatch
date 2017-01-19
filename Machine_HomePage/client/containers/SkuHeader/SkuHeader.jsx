'use strict';
import React from 'react';
require('./index.css')

export default class skuHeader extends React.Component {
    constructor(props) {
        super(props)
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

    render() {
        let props = this.props
        let item = props.item

        let sku = item.productDetail;
        let brand = item.brand
        let attributes = sku.attributes
        var attr = this.getAttribute(attributes)
        let sub_title = (
            <div className="sub_title">
                <p className="font26">{sku.brandName}</p>
                <p className="font32">{sku.name}</p>
                <p className="font26">{attr}</p>
            </div>
        )
        let sub_price = (
            <div className="sub_price">
                <p className="font48"><span className="font32">￥</span>{sku.sellprice/100 || 0 }</p>
                {/*<p className={"font24 "+(sku.quantity>0 ? '':'hide')}>市场价 {sku.msrp/100}元</p>*/}
            </div>
        )

        return (
            <div className="skuHeader clearfix">
                {sub_title}
                <div className="sub_info">
                    {sub_price}
                    <button className={"button font32 " + (sku.quantity>0 ? 'pre_price':'empty')}
                            onClick={(e) => this.addClick.bind(this)(e)}
                            disabled={!sku.quantity>0}
                    >
                        <span>{sku.quantity>0 ? '购 买':'售罄'}</span>
                    </button>
                </div>

            </div>
        )
    }
}


