'use strict';
import React from 'react'
import { connect }  from 'react-redux';
import wx from 'weixin-js-sdk';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import BottomButton from '../../components/BottomButton/BottomButton';
import BannerContainer from '../BannerContainer/bannerContainer';
import SelectContainer from '../SelectorContainer/selectorContainer';
import SubContent from '../SubContent/subContent'
import Message from '../../components/Message/Message';
import { initWxConfig, initSdk } from '../../actions/index'
import { initSubContent, initStart, changeSubContent } from '../../actions/index'
import { startAddToCart, clearCart, addToCart, initCart } from '../../actions/index'
import { locationSucc, locationFail, initByStoreId} from '../../actions/index';
import { setMessage } from '../../actions/index'
import util from '../../util/WeChatUtil'

class PageContainer extends React.Component {
    constructor(props) {
        super (props)
    }

    componentWillMount() {
        const { dispatch } = this.props;
        let storeId = util.getUrlParam().storeid;
        storeId ? dispatch(initByStoreId(storeId)) : dispatch(initWxConfig(window.location.href));
    }

    componentDidUpdate() {
        const { dispatch } = this.props;
        let props = this.props.state;
        let config = props.wxConfig;
        if(config.sign && !props.sdkInited) {
            if(this.initWx(config)) {
                dispatch(initSdk());
                this.getGeo().bind(this);
            }
        }
    }

    initWx(config) {
        let appId = 'wx4da5ecd6305e620a';
        try {
            wx.config({
                debug: false,
                appId: appId,
                timestamp: config.timestamp,
                nonceStr: config.noncestr,
                signature: config.sign,
                jsApiList: ["getLocation"]
            });
            return true;
        } catch (e) {
            return false
        }

    }

    getGeo() {
        var geo;
        const { dispatch } = this.props;
        wx.ready(function(){
            wx.getLocation({  // wx api
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    let speed = res.speed; // 速度，以米/每秒计
                    let accuracy = res.accuracy; // 位置精度
                    geo = {
                        latitude,
                        longitude,
                        speed,
                        accuracy
                    };
                    dispatch(locationSucc(geo));
                    return true
                },
                fail: function (res) {
                    dispatch(locationFail());
                    return false
                },
                cancel: function (res) {
                    dispatch(locationFail());
                    return false
                }
            });
        });
    }

    addCart(item) {
        let {state, dispatch} = this.props;
        let itemId = item.skuId;
        let target = state.cart.items.find((i) => {
            return i.id == itemId
        });
        if (target) {
            target.count = parseInt(target.count) + 1 + ''
            dispatch(addToCart({
                storeId: this.props.state.storeInfo.id + '',
                skuId: target.id + '',
                count: target.count
            }))
        } else {
            dispatch(addToCart(item))
        }
    }

    render() {
        let props = this.props.state;
        const { dispatch } = this.props;
        return (
            <div>
                <HomeHeader store={props.storeInfo}/>
                <Message msgContent={props.errorMessage}
                         clearMessage={() => dispatch(setMessage(""))}
                />
                <BannerContainer bannerData={props.banner}
                                 storeId={props.storeInfo.id}
                />
                <SelectContainer selectorData={props.selector}
                                 onSelectClick={ key => dispatch(changeSubContent(key))}
                                 currentKey = {props.currentKey}
                />
                <SubContent
                    contentData={props.currentSub}
                    storeData={props.storeInfo}
                    addToCart={(item) => dispatch(addToCart(item))}
                />
                <BottomButton cart={props.cart}
                              clearCart={() => dispatch(clearCart())}/>
            </div>
        )
    }
}

function select(store) {
    console.log('dispatched')
    return Object.assign({}, {state: store})
}

export default connect(select)(PageContainer)