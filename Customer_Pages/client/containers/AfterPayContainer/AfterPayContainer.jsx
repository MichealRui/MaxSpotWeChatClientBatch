"use strict";
import React from 'react';
import {connect} from 'react-redux';
import AfterPayHeader from '../../components/AfterPayComponents/AfterPayHeader/AfterPayHeader'
import AfterPayFooter from '../../components/AfterPayComponents/AfterPayFooter/AfterPayFooter'
import ConfirmWindow from '../../components/TakeGoodsComponents/ConfirmWindowComponent/ConfirmWindowComponent'
import WindowText from '../../components/TakeGoodsComponents/ConfirmWindowComponent/WindowText';
import Button from '../../components/CommonComponents/Button/Button'
require('./index.css')
class AfterPayContainer extends React.Component{
    constructor(props){
        super(props);
        this._states = this.props.params.states;
        this._ordernumber = this.props.params.orderNumber;
        this.sleepTime = 1000;
        this.machineTime = 3000;
        this.state = {
            page: 0,
            isShopErr : true,
            pageStatus: 1,
        }
    }

    componentWillMount(){
        console.log('afterpay');
        console.log(this._states)
        let state = this._states;
        if(state){
            this.setState({
                pageStatus : state
            })
        }
        //this.fetchOrderStatus.bind(this)(this._ordernumber)
    }

    fetchOrderStatus(od){
        //出4；未出3；出完5

        const ORDER_NORMAL = 5; //出货完成  绿色对勾 fa-check
        const ORDER_WRONG = 6 ; //出货异常  红色叹号 fa-exclamation
        const ORDER_WILLOUT = 3; //尚未出货
        const ORDER_ALREADYOUT = 7; //已经出货
        const ORDER_OUTING = 4; //正在出货 红色三个点 fa-ellipsis-h

        const {state,dispatch} = this.props;
        let batch_index = this.state.page;
        let status = 0 ;
        let totalCount = 0;
        if(state.afterPay.order){
            totalCount = state.afterPay.order.batches.length;
            if(state.afterPay.order.batches[batch_index].outStatus){
                status = state.afterPay.order.batches[batch_index].outStatus;
            }
        }
        dispatch(initAfterPay(od));
        if(status != 1){
            window.setTimeout( ()=>this.fetchOrderStatus.bind(this)(od), this.sleepTime )
        }else{
            if(this.state.page == (totalCount-1)){
                console.log('ok');
                return;
            }
            window.setTimeout(()=>{
                this.setState({
                    page : batch_index ++
                });
            },this.machineTime);
            //ok
            console.log('ok');
        }
    }

    shopErrTrue(){
        this.setState({
            isShopErr:true
        })
    }

    shopErrFalse(){
        this.setState({
            isShopErr : false
        })
    }


    render(){
        const {state} = this.props;
        const {afterPay} = state;
        let batch_index = this.state.page;
        return (
            <div className='AfterPayContainer'>
                {/*<Header/>*/}
                <AfterPayHeader itemData={afterPay.order} currentKey={batch_index}/>
                <AfterPayFooter itemData={afterPay.order} currentKey={batch_index}/>
                <Button
                    buttonClassName="enable"
                    buttonText="取货遇到问题"
                    buttonClick={this.shopErrFalse.bind(this)}
                />
                <ConfirmWindow windowText={WindowText}
                               isHidden={this.state.isShopErr}
                               hideClick={this.shopErrTrue.bind(this)}/>
            </div>
        );
    }
}

function select(store) {
    return Object.assign({},{state:store});
}

export default connect(select)(AfterPayContainer)