/**
 * Created by ruibing on 16/9/19.
 // */
import * as actionTypes from '../actionTypes/Home';

// import img_cwyp from '../components/HomeComponents/Selector/image/cwyp.png';
// import img_djbb from '../components/HomeComponents/Selector/image/djbb.png';
// import img_dzcp from '../components/HomeComponents/Selector/image/dzcp.png';
import img_etmy from '../components/HomeComponents/Selector/image/etmy.png';
// import img_grhl from '../components/HomeComponents/Selector/image/grhl.png';
import img_hfmz from '../components/HomeComponents/Selector/image/hfmz.png';
import img_jsyl from '../components/HomeComponents/Selector/image/jsyl.png';
// import img_jxyp from '../components/HomeComponents/Selector/image/jxyp.png';
// import img_lp from '../components/HomeComponents/Selector/image/lp.png';
// import img_lxbb from '../components/HomeComponents/Selector/image/lxbb.png';
import img_sp from '../components/HomeComponents/Selector/image/sp.png';
import img_zh from '../components/HomeComponents/Selector/image/zh.png';
import img_all from '../components/HomeComponents/Selector/image/all.png';



function changeSubContent(content, {key,subKey}) {
    let default_content = { current_key:key,current_subkey:subKey};
    let newContent = Object.assign({}, content,{default_content:default_content});
    let currentSub = newContent['subContent'][key];
    let subContent = newContent.selector.filter(i => i.key == key).pop();
    newContent.currentSub = Object.assign({},currentSub,{items:currentSub.categoried[subKey]});
    //newContent.currentKey = key;
    newContent.currentSelector = subContent;
    newContent.currentSelector.subKey = subKey;
    return newContent
}

function getCurrentInfo(content,{key,subKey}) {
    let current_obj = {'current_key':key,'current_subkey':subKey};
    return Object.assign({},content,current_obj);
}

function initSuccess(content, data){
    let default_content = content.default_content;
    const SELECTOR_ICONS = {
        0: {key:'all',content:'全部',faIcon:'',image:img_all},
        1: {key: 'food', content: '食品', faIcon:'fa-empire',image:img_sp},
        2: {key: 'makeup', content: '护肤美妆', faIcon:'fa-tint',image:img_hfmz},
        3: {key: 'daily', content: '杂货', faIcon:'fa-umbrella',image:img_zh},
        4: {key: 'drink', content: '酒水饮料', faIcon:'fa-glass',image:img_jsyl},
        5: {key: 'baby', content: '儿童母婴', faIcon:'fa-deviantart',image:img_etmy}

    };
    let new_data = Object.assign({},content,data);
    // let categories = new_data.content.filter(cat => cat.id != 0);
    let categories = new_data.content;
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
        let categoryName;
        if(key == 'all'){
            categoryName = ['全部'];
        }else{
            categoryName = [...new Set(items.map(item => item.categoryName))];
            categoryName.splice(0,0,'全部');
        }
        for (let sel of selector){
            if(sel.key == key){
                sel.subSelector = categoryName;
            }
        }
        let categoriedItems = {};
        for(let category of categoryName){
            categoriedItems[category] = items.filter(i => i.categoryName == category)
        }
        categoriedItems['全部'] = items;
        content[key].categoried = categoriedItems;
    });
    // let currentSelector = selector[0];
    // currentSelector.subKey = selector[0].subSelector[0];

    let currentSelector = selector.filter(i => i.key == default_content.current_key).pop();
    currentSelector.subKey = default_content.current_subkey;
    let subContent;
    for(let content of subContentArray) {
        subContent = Object.assign({}, subContent, content)
    }
    // let currentKey = currentSelector.key;
    let currentKey = default_content.current_key;
    let currentSub = subContent[currentKey];
    // currentSub.items = currentSub.categoried[currentSelector.subKey];
    currentSub.items = currentSub.categoried[default_content.current_subkey];
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

let default_content = {
    current_key:'all',
    current_subkey:'全部'
}

export default function (
content={default_content}, action) {
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
