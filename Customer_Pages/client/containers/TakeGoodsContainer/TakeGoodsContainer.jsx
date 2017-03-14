"use strict"
import React from 'react';
import {connect} from 'react-redux'
import {InitOrderDetail,initInfo} from '../../actions/OrderDetail';
import QrCode from '../../components/TakeGoodsComponents/QrCode/QrCode'
import ConfirmWindow from '../../components/TakeGoodsComponents/ConfirmWindowComponent/ConfirmWindowComponent'
import WindowText from '../../components/TakeGoodsComponents/ConfirmWindowComponent/WindowText';
import WaittingWindow from '../../components/TakeGoodsComponents/WaittingWindowComponent/WaittingWindowComponent';
import ShowErrWindow from '../../components/TakeGoodsComponents/ShowErrWindowComponent/ShowErrWindowComponent'
import ShowTipsWindow from '../../components/TakeGoodsComponents/ShowTipsWindowComponent/ShowTipsWindowComponent'
class TakeGoodsContainer extends React.Component {
    constructor(props){
        super(props);
        this._orderNumber = this.props.params.orderNumber;
        this.sleepTime = 1000;
        this.state={
            //true 显示
            isSuccess:true,
            isShowTips:true,
            isShopErr:true,
            isWaitting:true
        };
    }

    componentWillMount(){
        const {dispatch} = this.props;
        this.fetchO.bind(this)(this._orderNumber)
        //dispatch(InitOrderDetail(this._orderNumber));
    }

    fetchO(od) {
        const Taking = 4;
        const {dispatch,state} = this.props;
        let status = 0;
        if(state.orderDetail.order){
            if(state.orderDetail.order.status){
                status = state.orderDetail.order.status;
            }
        }
        //let status = state.orderDetail.order.status;
        dispatch(InitOrderDetail(od))
        if(status != Taking) {
            window.setTimeout( ()=>this.fetchO.bind(this)(od), this.sleepTime )
        } else {
            //history.pushState()
            this.context.router.push('/afterPay/'+status+'/'+od);
        }

    }


    acknowledgedFalse() {
        this.setState({
            isSuccess:false
        })
    }

    acknowledgedTrue() {
        this.setState({
            isSuccess:true
        })

    }
    acShowTipsFalse() {
        this.setState({
            isShowTips:false
        })
    }

    acShowTipsTrue() {
        this.setState({
            isShowTips:true
        })

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

    waittingTrue(){
        this.setState({
            isWaitting:true
        })
    }

    waittingFalse(){
        this.setState({
            isWaitting:false
        })
    }


    render(){
        let {state} = this.props;
        let {orderDetail} = state;
        let {order} = orderDetail;
        let newOrder = order ? (order.childOrders ? Object.assign({},{order:order.childOrders[0]}) : Object.assign({},{order:order})) : {}
        let appId = 'wx4da5ecd6305e620a';
        let takeUri = encodeURIComponent("http://www.mjitech.com/web/wxauthorize.action");
        // let defUrl=
        //     'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId +
        //     '&redirect_uri=' + takeUri +
        //     '&response_type=code&scope=snsapi_base' +
        //     '&state=taking_goods_' + newOrderDetail.takeGoodsNumber +'#wechat_redirect';
        let defUrl=
            'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId +
            '&redirect_uri=' + takeUri +
            '&response_type=code&scope=snsapi_base' +
            '&state=taking_goods_123#wechat_redirect';
        let qrcode = newOrder && newOrder.order ? (<QrCode order={newOrder.order}
                                         takeuri={defUrl}
                                         onFailClick={this.acknowledgedFalse.bind(this)}
                                         onShowTips={this.acShowTipsFalse.bind(this)}

        />) : '';
        // let ConfirmWindow = newOrder && newOrder.order ? (<ConfirmWindow windowText={WindowText}
        //                                                      isHidden={this.state.isSuccess}
        //                                                      hideClick={this.acknowledgedTrue.bind(this)}/>
        // ) : '';
        // let ConfirmWindow = '';
        return (
            <div className="takeGoodsContainer">
                {/*<TakeGood orderInfo={newOrderDetail}/>*/}
                {qrcode}
                <ConfirmWindow windowText={WindowText}
                               isHidden={this.state.isSuccess}
                               hideClick={this.acknowledgedTrue.bind(this)}/>

                <WaittingWindow isHidden={this.state.isWaitting}
                                hideClick={this.waittingTrue.bind(this)}
                />
                <ShowErrWindow isHidden={this.state.isShopErr}
                               hideClick={this.shopErrTrue.bind(this)}
                />
                <ShowTipsWindow isHidden={this.state.isShowTips}
                                order={newOrder}
                                hideClick={this.acShowTipsTrue.bind(this)}
                />
            </div>
        )

    }
}

TakeGoodsContainer.PropTypes = {
    state : React.PropTypes.object
};
TakeGoodsContainer.defaultProps = {
    state : {
        orderDetail : {
            order : {
                childOrders : [],
                status : 0
            }
        }
    }
};
TakeGoodsContainer.contextTypes={
    router : React.PropTypes.object
}

function select(store) {
    return Object.assign({},{state:store})
}

export default connect(select)(TakeGoodsContainer)

