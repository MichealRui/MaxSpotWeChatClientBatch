"use strict";
import React from 'react';
import OrderDetailTitle from '../OrderDetailTitle/OrderDetailTitle'
import ProductInfo from '../../CommonComponents/OrderProductInfo/OrderProductInfo'
import AccountDisplay from '../../CommonComponents/AccountDisplay/AccountDisplay'
import OrderDescription from '../OrderDescription/OrderDescription'
require('./index.css')
export default class OrderTotalProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mark : true,
        }
    }

    render(){
        let props = this.props;
        let {productItem, store, promotions} = props;
        let productInfoItems = productItem.skus.map(
            (product,index) => {
                product.showPrice = false
                return (
                    <ProductInfo key={index} product={product}/>
                )
            }
        );
        let count = productItem.skus.map(s=>s.count).reduce((pre , next)=>{return pre + next},0);
        let tags = promotions.map(
            promo => {
                if(promo.deductMoney) {
                    return promo.campaign.campaignTag + '  -'+promo.deductMoney / 100 +  ' 元';
                }
            }
        ).filter(t => t);
        let sum = count + '件商品 合计' + productItem.originalPrice / 100 + '元';
        tags.unshift(sum);
        // let total = props.productItem.skus.map(s => s.count).reduce((pre,next)=>pre + next ,0);
        return (
            <div className="orderTotalProduct">
                <OrderDetailTitle orderTitleText={store.address}/>
                <ul>
                    {productInfoItems}
                </ul>
                {/*props.productItem.discount ? <AccountDisplay name="买减优惠" money={props.productItem.discount}/> : ''*/}
                {/*<div className="totalAccount">*/}
                    {/*<AccountDisplay name={"共 "+total+ "件商品"} money={"合计 "+(props.productItem.totalPrice/100 || 0)}/>*/}
                {/*</div>*/}
                <OrderDescription contents={tags}/>
                <OrderDescription important={true} contents={
                    new Array('应付金额 ' + ( productItem.totalPrice / 100 || 0 ) + ' 元')
                }/>
            </div>
        )
    }
}

OrderTotalProduct.PropTypes = {
    productItem : React.PropTypes.object,
    store : React.PropTypes.object,
    promotions : React.PropTypes.object,
};
OrderTotalProduct.defaultProps = {
    productItem : {
        skus : [
            {
                count : 0
            }
        ],
        orderAddress : '',
        discount : 0,
        totalPrice : 0
    },
    store: {},
    promotions :{}
};
