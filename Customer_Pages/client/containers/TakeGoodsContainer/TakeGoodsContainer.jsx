"use strict"
import React from 'react';
import {connect} from 'react-redux'
import {InitTakeGoods} from '../../actions/TakeGoods';
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
            isWaitting:true,
            timer : null
        };
    }

    componentWillMount(){
        const {dispatch} = this.props;
        this.fetchO.bind(this)(this._orderNumber);
        //dispatch(InitOrderDetail(this._orderNumber));
    }

    fetchO(od) {
        const Taking = 4;
        const {dispatch,state} = this.props;
        let status = 0;
        if(state.takeGoods.order){
            if(state.takeGoods.order.status){
                status = state.takeGoods.order.status;
            }
        }
        console.log("status :" + status);
        //let status = state.orderDetail.order.status;
        dispatch(InitTakeGoods(od))
        if(status != Taking) {
            this.state.timer = window.setTimeout( ()=>this.fetchO.bind(this)(od), this.sleepTime )
        } else {
            //history.pushState()
            this.context.router.push('/afterPay/1/'+od);
        }

    }
    componentWillUnmount(){
        window.clearTimeout(this.state.timer)
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
        let {takeGoods} = state;
        let {order} = takeGoods;
        let appId = 'wx4da5ecd6305e620a';
        let takeUri = encodeURIComponent("http://www.mjitech.com/web/wxauthorize.action");
        // let defUrl=
        //     'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId +
        //     '&redirect_uri=' + takeUri +
        //     '&response_type=code&scope=snsapi_base' +
        //     '&state=taking_goods_' + newOrderDetail.takeGoodsNumber +'#wechat_redirect';
        let takeGoodsNumber = takeGoods.order ? (takeGoods.order.takeGoodsNumber ? takeGoods.order.takeGoodsNumber : '') : '';
        let defUrl=
            'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId +
            '&redirect_uri=' + takeUri +
            '&response_type=code&scope=snsapi_base' +
            '&state=taking_goods_'+ takeGoodsNumber +'#wechat_redirect';
        let qrcode = order ? (<QrCode order={order}
                                     takeuri={defUrl}
                                     onFailClick={this.acknowledgedFalse.bind(this)}
                                     onShowTips={this.acShowTipsFalse.bind(this)}

        />) : '';
        return (
            <div className="takeGoodsContainer">
                {/*<TakeGood orderInfo={newOrderDetail}/>*/}
                {qrcode}
                <ConfirmWindow windowText={WindowText}
                               isHidden={this.state.isSuccess}
                               hideClick={this.acknowledgedTrue.bind(this)}
                               order={order}
                />

                <WaittingWindow isHidden={this.state.isWaitting}
                                hideClick={this.waittingTrue.bind(this)}
                />
                <ShowErrWindow isHidden={this.state.isShopErr}
                               hideClick={this.shopErrTrue.bind(this)}
                />
                <ShowTipsWindow isHidden={this.state.isShowTips}
                                order={order}
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
        takeGoods : {
            order : {
                childOrders : [],
                status : 0,
                takeGoodsNumber : ''
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

