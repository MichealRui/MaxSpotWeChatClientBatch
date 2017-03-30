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


import img_cwyp from '../components/HomeComponents/Selector/image/cwyp.png';
import img_djbb from '../components/HomeComponents/Selector/image/djbb.png';
import img_dzcp from '../components/HomeComponents/Selector/image/dzcp.png';
import img_etmy from '../components/HomeComponents/Selector/image/etmy.png';
import img_grhl from '../components/HomeComponents/Selector/image/grhl.png';
import img_hfmz from '../components/HomeComponents/Selector/image/hfmz.png';
import img_jsyl from '../components/HomeComponents/Selector/image/jsyl.png';
import img_jxyp from '../components/HomeComponents/Selector/image/jxyp.png';
import img_lp from '../components/HomeComponents/Selector/image/lp.png';
import img_lxbb from '../components/HomeComponents/Selector/image/lxbb.png';
import img_sp from '../components/HomeComponents/Selector/image/sp.png';
import img_zh from '../components/HomeComponents/Selector/image/zh.png';



function changeSubContent(content, {key,subKey}) {
    let newContent = Object.assign({}, content);
    let currentSub = newContent['subContent'][key];

    let subContent = newContent.selector.filter(i => i.key == key).pop();
    newContent.currentSub = Object.assign({},currentSub,{items:currentSub.categoried[subKey]});
    //newContent.currentKey = key;
    newContent.currentSelector = subContent;
    newContent.currentSelector.subKey = subKey;
    return newContent
}

function initSuccess(content, data){
    console.log(data);
    let frontEndBanner = [{
        destUrl: 'http://mp.weixin.qq.com/s/zsYzBRVKXV2hdy7F1oJM2w',
        imagePath: require('../components/HomeComponents/BannerContainer/images/nuddlebanner.jpg')
    }];

    // const SELECTOR_ICONS = {
    //     0: {key: 'all', content:'全部', faIcon:'', icon: icon_all},
    //     1: {key: 'food', content: '食品', faIcon:'fa-empire',icon:icon_empire},
    //     4: {key: 'drink', content: '酒饮', faIcon:'fa-glass',icon:icon_glass},
    //     2: {key: 'makeup', content: '美妆', faIcon:'fa-tint',icon:icon_makeup},
    //     3: {key: 'daily', content: '日用品', faIcon:'fa-umbrella',icon:icon_umbrella},
    //     5: {key: 'baby', content: '母婴', faIcon:'fa-deviantart',icon:icon_deviantart}
    // };
    const SELECTOR_ICONS = {
        1: {key: 'food', content: '食品', faIcon:'fa-empire',image:img_sp},
        2: {key: 'makeup', content: '护肤美妆', faIcon:'fa-tint',image:img_hfmz},
        3: {key: 'daily', content: '杂货', faIcon:'fa-umbrella',image:img_zh},
        4: {key: 'drink', content: '酒水饮料', faIcon:'fa-glass',image:img_jsyl},
        5: {key: 'baby', content: '儿童母婴', faIcon:'fa-deviantart',image:img_etmy}

    };
    let new_data = Object.assign({},content,data);
    let categories = new_data.content.filter(cat => cat.id != 0);
    let selector = categories.map(cat => SELECTOR_ICONS[cat.id]);
    let subContentArray = categories.map(cat => {
        let key = SELECTOR_ICONS[cat.id]['key'];
        let returnValue = {};
        if(key){
            returnValue[key] = {
                banner : cat.banners,
                freeItems : cat.freeItems,
                items : cat.items
            }
        }
        return returnValue;
    });
     /*get category items */
    subContentArray.forEach(content => {
        let items ;
        let key ;
        for (let i in content){
            items = content[i].items;
            key = i;
        }
        let categoryName = [...new Set(items.map(item => item.categoryName))];
        for (let sel of selector){
            if(sel.key == key){
                sel.subSelector = categoryName;
            }
        }
        let categoriedItems = {};
        for(let category of categoryName){
            categoriedItems[category] = items.filter(i => i.categoryName == category)
        }
        content[key].categoried = categoriedItems;
    });
    let currentSelector = selector[0];
    currentSelector.subKey = selector[0].subSelector[0];
    let subContent;
    for(let content of subContentArray) {
        subContent = Object.assign({}, subContent, content)
    }
    let currentKey =currentSelector.key;
    let currentSub = subContent[currentKey];
    currentSub.items = currentSub.categoried[currentSelector.subKey];
    return Object.assign({}, content, {
        banner: data.banner,//data.bannxer,
        selector: selector,
        subContent: Object.assign({}, subContent),//Object.assign({}, subContent, {all: currentSub}),
        currentSub: currentSub,//data.subContent['all'],,
        storeInfo: data.store,
        currentKey: currentKey,
        currentSelector:currentSelector,
        channel : data.channel
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
            return changeSubContent(content, action);
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
