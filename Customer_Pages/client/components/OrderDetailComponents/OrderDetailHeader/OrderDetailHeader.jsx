"use strict";
import React from 'react';
import Button from '../../CommoonComponents/Button/Button'
require('./index.css')
export default class OrderDetailHeader extends React.Component {
    constructor(props){
        super(props);
    }
    buttonClick(canbuttonClick){
        if(canbuttonClick){
            if(this.props.orderInfo.status == 1){
                //wxpay
                this.context.router.push('/confirmOrder/'+this.props.orderInfo.orderNumber);
            }else{
                //tackgoods
                this.context.router.push('/paySucc/'+this.props.orderInfo.orderNumber);
            }
        }else{
            return false;
        }
    }
    render(){
        let props = this.props;
        let buttonName = '';
        let buttonText = '';
        let isbuttonClick = false;
        switch (props.orderInfo.status){
            case 1 :
                buttonName = "订单还未支付哦";
                isbuttonClick = true;
                buttonText = '立即支付';
                break;
            case 2:
                buttonName = "取货时请记得确认位置哦";
                isbuttonClick = true;
                buttonText = '立即支付';
                break;
            case 3 :
                buttonName = "取货时请记得确认位置哦";
                isbuttonClick = true;
                buttonText = '立即支付';
                break;
            case 4 :
                buttonName = "正在取货中";
                isbuttonClick = false;
                buttonText = '正在取货';
                break;
            case 5 :
                buttonName = "完成取货";
                isbuttonClick = false;
                buttonText = '完成取货';
                break;
            case 91 :
                buttonName = "订单已取消";
                isbuttonClick = false;
                buttonText = '订单已取消';
                break;
        }
        return(
            <div className="orderDetailHeader">
                <div className="buttonArea clearfix">
                    <span className="font14">{buttonName}</span>
                    <Button
                        buttonClassName = 'pickUpButton'
                        disabled = {!isbuttonClick}
                        buttonText = {buttonText}
                        buttonClick = {()=>this.buttonClick(isbuttonClick)}
                    />
                </div>
            </div>
        )
    }
}

OrderDetailHeader.PropTypes = {
    orderInfo : React.PropTypes.object
};
OrderDetailHeader.defaultProps = {
    orderInfo :{
        status : 0,
        orderNumber : ''
    }
};

OrderDetailHeader.contextTypes = {
    router : React.PropTypes.object
}