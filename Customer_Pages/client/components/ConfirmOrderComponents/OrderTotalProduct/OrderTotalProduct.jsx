"use strict";
import React from 'react';
import OrderDetailTitle from '../OrderDetailTitle/OrderDetailTitle'
import ProductInfo from '../OrderProductInfo/OrderProductInfo'
import AccountDisplay from '../AccountDisplay/AccountDisplay'
import TotalCount from '../OrderTotalCount/OrderTotalCount'
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
        console.log("totalproduct");
        console.log(props.productItem);
        let productInfoItems = props.productItem.skus.map(
            (product,index) => {
                return (
                    <ProductInfo key={index} product={product}/>
                )
            }
        );
        let total = props.productItem.skus.map(s => s.count).reduce((pre,next)=>pre + next ,0);
        return (
            <div className="orderTotalProduct">
                <OrderDetailTitle orderTitleText={props.productItem.orderAddress}/>
                <ul>
                    {productInfoItems}
                </ul>
                {props.productItem.discount ? <AccountDisplay name="买减优惠" money={props.productItem.discount}/> : ''}
                <TotalCount totalCount = {total} totalMoney={props.productItem.totalPrice/100 || 0}/>
            </div>
        )
    }
}

OrderTotalProduct.PropTypes = {
    productItem : React.PropTypes.object
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
    }
};
