/**
 * Created by ruibing on 16/9/19.
 // */
import * as actionTypes from '../actionTypes/Home';
import icon_all from '../components/HomeComponents/Selector/image/icon_all.png';
import icon_deviantart from '../components/HomeComponents/Selector/image/icon_deviantart.png';
import icon_empire from '../components/HomeComponents/Selector/image/icon_empire.png';
import icon_glass from '../components/HomeComponents/Selector/image/icon_glass.png';
import icon_makeup from '../components/HomeComponents/Selector/image/icon_makeup.png';
import icon_umbrella from '../components/HomeComponents/Selector/image/icon_umbrella.png';

function changeSubContent(content, key) {
    console.log("change")
    console.log(key)
    let currentSub = content['subContent'][key];
    let newContent = Object.assign({}, content)
    newContent.currentSub = currentSub;
    newContent.currentKey=key;
    return newContent
}

function initSuccess(content, data){

    let frontEndBanner = [{
        destUrl: 'http://mp.weixin.qq.com/s/zsYzBRVKXV2hdy7F1oJM2w',
        imagePath: require('../components/HomeComponents/BannerContainer/images/nuddlebanner.jpg')
    }];

    const SELECTOR_ICONS = {
        0: {key: 'all', content:'全部', faIcon:'', icon: icon_all},
        1: {key: 'food', content: '食品', faIcon:'fa-empire',icon:icon_empire},
        4: {key: 'drink', content: '酒饮', faIcon:'fa-glass',icon:icon_glass},
        2: {key: 'makeup', content: '美妆', faIcon:'fa-tint',icon:icon_makeup},
        3: {key: 'daily', content: '日用品', faIcon:'fa-umbrella',icon:icon_umbrella},
        5: {key: 'baby', content: '母婴', faIcon:'fa-deviantart',icon:icon_deviantart}
    };
    let categories = data.content;//.filter(cat => cat); //get category except category 'all'
    let selector = data.content.map(cat =>  SELECTOR_ICONS[cat.id]);//.filter(s => s);
    let subContentArray = categories.map(cat => {
        let key = SELECTOR_ICONS[cat.id]["key"];
        let returnValue = {};
        if(key) {
            returnValue[key] = {
                banner:cat.banner,
                freeItems: cat.freeItems,
                items: cat.items
            }
        }
        return returnValue
    });
    let subContent = {};
    for(let content of subContentArray) {
        subContent = Object.assign({}, subContent, content)
    }
    let currentSub = data.content.filter(cat =>cat.id == 0).pop(); // find 'all'

    return Object.assign({}, content, {
        banner: frontEndBanner,//data.banner,
        selector: selector,
        subContent: Object.assign({}, subContent, {all: currentSub}),
        currentSub: currentSub,//data.subContent['all'],,
        storeInfo: data.store,
        currentKey: 'all'
    })
}

function initFail(content, message) {
    return Object.assign({}, content, {errorMessage: message.errorMessage})
}

function succAddCart(content, ) {
    let state = Object.assign({}, content)
    state.cart.count += 1;
    return state
}

function clearCart(content, cart) {
    return Object.assign({}, content, {
        cart: {count:0, remainTime:''}
    })
}

function failAddCart(content, message) {
    return Object.assign({}, content, {
        errorMessage: message.errorMessage
    })
}

function initWxConfigSucc(content, config) {
    return Object.assign({}, content, { wxConfig: config })
}

function initWxConfigErr(content) {
    return Object.assign({}, content, {errorMessage: ''})
}

function JSSDKInited(content) {
    return Object.assign({}, content, {sdkInited: true})
}

function initCartSucc(content, cart) {
    return Object.assign({}, content, {cart: {count: cart.count}})
}

function initCartFail(content, message) {
    return Object.assign({}, content, {errorMessage: message.errorMessage})
}

function setMessage(content, message) {
    return Object.assign({}, content, {errorMessage: message})
}

export default function (
content={}, action) {
    switch (action.type) {
        case actionTypes.INIT_START:
            return initStart(content);
        case actionTypes.INIT_SUCCESS:
            return initSuccess(content, action.content);
        case actionTypes.INIT_FAIL:
            return initFail(content, action.errorMessage);
        case actionTypes.CHANGE_SUBCONTENT:
            return changeSubContent(content, action.key);
        // case actionTypes.CLEAR_CART:
        //     return clearCart(content);
        // case actionTypes.SUCC_ADD_CART:
        //     return succAddCart(content, action.item);
        // case actionTypes.FAIL_ADD_CART:
        //     return failAddCart(content, action.errorMessage);
        // case actionTypes.INIT_WX_CONFIG_SUCC:
        //     return initWxConfigSucc(content, action.config);
        // case actionTypes.INIT_WX_CONFIG_ERR:
        //     return initWxConfigErr(content);
        // case actionTypes.JSSDK_INITED:
        //     return JSSDKInited(content);
        // case actionTypes.INIT_CART_SUCC:
        //     return initCartSucc(content, action.cart);
        // case actionTypes.INIT_CART_FAIL:
        //     return initCartFail(content, action.message);
        // case actionTypes.SET_MESSAGE:
        //     return setMessage(content, action.errorMessage);
        default:
            return content;
    }
}

function initStart(content) {
    return Object.assign({}, content)
}
