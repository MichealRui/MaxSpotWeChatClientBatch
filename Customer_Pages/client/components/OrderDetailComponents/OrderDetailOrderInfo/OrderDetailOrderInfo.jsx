"use strict"
import React from 'react';
import StoreDetailTitle from '../../CommoonComponents/StoreDetailTitle/StoreDetailTitle'
require('./index.css');
export default class OrderDetailOrderInfo extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        let props = this.props;
        let storeOrderInfo = {
            orderTitleIcon : 'font14',
            orderTitleText : props.orderInfo.orderNumber,
            orderIconShow : true,
            orderTitleShow : true,
            orderArrowShow : true,
            className : 'storeOrderInfo',
            orderArrowIcon : 'font14 arrow_icon',
            orderArrowText : '已取消',
            orderIconText : '订单编号'
        };
        let storeTimeInfo = {
            orderTitleIcon : 'font14',
            orderTitleText : props.orderInfo.sellTime,
            orderIconShow : true,
            orderTitleShow : true,
            orderArrowShow : false,
            className : 'storeTimeInfo',
            orderArrowIcon : '',
            orderArrowText : '',
            orderIconText : '交易时间'
        };
        let storeCodeInfo = {
            orderTitleIcon : 'font14',
            orderTitleText : props.orderInfo.takeGoodsNumber,
            orderIconShow : true,
            orderTitleShow : true,
            orderArrowShow : false,
            className : 'storeCodeInfo',
            orderArrowIcon : '',
            orderArrowText : '',
            orderIconText : '取货码'
        };
        return(
            <div className="orderDetailOrderInfo">
                <StoreDetailTitle storeInfo={storeOrderInfo}/>
                <StoreDetailTitle storeInfo={storeTimeInfo}/>
                {
                    props.orderInfo.takeGoodsNumber ? (
                        <StoreDetailTitle storeInfo={storeCodeInfo}/>
                    ):''
                }
            </div>
        )
    }
}
OrderDetailOrderInfo.PropTypes = {
    orderInfo : React.PropTypes.object
};
OrderDetailOrderInfo.defaultProps = {
    orderInfo : {
        orderNumber : '',
        orderStatusClass : '',
        statusName : '',
        sellTime : '',
        takeGoodsNumber : ''
    }
}