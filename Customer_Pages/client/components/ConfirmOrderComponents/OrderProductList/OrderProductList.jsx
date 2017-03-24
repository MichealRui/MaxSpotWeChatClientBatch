"use strict";
import React from 'react';
import OrderTotalProduct from '../OrderTotalProduct/OrderTotalProduct'
import AccountDisplay from '../../CommoonComponents/AccountDisplay/AccountDisplay'
require('./index.css')
export default class OrderProductList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        console.log(props);
        let productItems = props.productList.childOrders.map(
            (productItem,index)=>{
                return(
                    <OrderTotalProduct
                        key={index}
                        productItem={productItem}
                        store = {productItem.store}
                        promotions = {productItem.promotions}
                    />
                )
            }
        )
        return (
            <div className="orderTotalProduct">
                {productItems}
                <div className="font14 totalMoney">
                    <AccountDisplay name="应付金额" money={props.productList.totalPrice/100 || 0}/>
                </div>
            </div>
        )
    }
}
OrderProductList.PropTypes = {
    productList : React.PropTypes.object
}
OrderProductList.defaultProps = {
    productList:{
        childOrders:[],
        totalPrice : 0
    }
}