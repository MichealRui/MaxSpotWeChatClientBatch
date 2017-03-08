/**
 * Created by ruibing on 16/9/19.
 */
import { CHANGE_SUBCONTENT } from '../actions/index'
import { INIT_START, INIT_SUCCESS, INIT_FAIL} from '../actions/index'
import { CLEAR_CART , SUCC_ADD_CART, FAIL_ADD_CART} from '../actions/index'
import { INIT_WX_CONFIG_SUCC, INIT_WX_CONFIG_ERR , JSSDK_INITED} from '../actions/index'
import { INIT_CART_SUCC, INIT_CART_FAIL } from '../actions/index'
import { SET_MESSAGE } from '../actions/index'
import icon_deviantart from '../components/Selector/image/icon_deviantart.png';
import icon_empire from '../components/Selector/image/icon_empire.png';
import icon_glass from '../components/Selector/image/icon_glass.png';
import icon_makeup from '../components/Selector/image/icon_makeup.png';
import icon_umbrella from '../components/Selector/image/icon_umbrella.png';

const SELECTOR_ICONS = {
    1: {key: 'food', content: '食品', faIcon:'fa-empire',icon:icon_empire},
    2: {key: 'drink', content: '酒饮', faIcon:'fa-glass',icon:icon_glass},
    3: {key: 'makeup', content: '美妆', faIcon:'fa-tint',icon:icon_makeup},
    4: {key: 'daily', content: '日用品', faIcon:'fa-umbrella',icon:icon_umbrella},
    5: {key: 'baby', content: '母婴', faIcon:'fa-deviantart',icon:icon_deviantart}
};

let bannerdata = [
    {
        destUrl: "",
        imagePath: ""
    },
];

let selector = [
    {key: '', content: '', faIcon: '',icon:''},
];

let subContent =
{
    'all':{
        banner:{
            imgPath: '',
            bannerDist: ''
        },
        freeItems: [
            {}, {}, {}, {},{}, {}, {},{}
        ],
        items: [
            {},
            {},
            {}
        ]
    }
};
let shoppingCart = {
    remainTime: '',
    items:[]
};

let wxConfig = {
    timestamp: '',
        noncestr: '',
        sign: '',
};

let storeInfo = {

};

let data = {
    banner: bannerdata,
    selector: selector,
    subContent: subContent,
    currentSub: subContent['all'],
    cart: shoppingCart,
    storeInfo: storeInfo,
    wxConfig:wxConfig,
    currentKey: 'all'
};

function changeSubContent(content, key) {
    console.log("change")
    console.log(key)
    let currentSub = content['subContent'][key];
    let newContent = Object.assign({}, content)
    newContent.currentSub = currentSub;
    newContent.currentKey=key;
    return newContent
}

function initStart(content) {
    return Object.assign({}, content)
}

function initSuccess(content, data){


    // let frontEndBanner = [{
    //     destUrl: 'http://mp.weixin.qq.com/s/zsYzBRVKXV2hdy7F1oJM2w',
    //     imagePath: require('../containers/BannerContainer/images/nuddlebanner.jpg')
    // }]

    const SELECTOR_ICONS = {
        1: {key: 'food', content: '食品', faIcon:'fa-empire',icon:icon_empire},
        4: {key: 'drink', content: '酒饮', faIcon:'fa-glass',icon:icon_glass},
        2: {key: 'makeup', content: '美妆', faIcon:'fa-tint',icon:icon_makeup},
        3: {key: 'daily', content: '日用品', faIcon:'fa-umbrella',icon:icon_umbrella},
        5: {key: 'baby', content: '母婴', faIcon:'fa-deviantart',icon:icon_deviantart}
    };
    let categories = data.content.filter(cat => cat.id != 0); //get category except category 'all'
    console.log(data)
    let selector = categories.map(cat =>  SELECTOR_ICONS[cat.id]);//.filter(s => s);
    console.log(selector)
    let subContentArray = categories.map(cat => {
        console.log(cat.id)
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
    // let cart = {
    //     remainTime: '380',
    //     count: 5
    // };

    /*
    * mock campaign
    * */
    // currentSub.items[0].campaign={ campaignId:1, campaignTag: '满100减20'};
    /*
    * end mock campaign
    * */

    return Object.assign({}, content, {
        banner: data.banner,
        selector: selector,
        subContent: Object.assign({}, subContent, {all: currentSub}),
        currentSub: currentSub,//data.subContent['all'],,
        storeInfo: data.store,
        currentKey:'all',
        // cart: cart
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
    content=data, action) {
    switch (action.type) {
        case INIT_START:
            return initStart(content);
        case INIT_SUCCESS:
            return initSuccess(content, action.content);
        case INIT_FAIL:
            return initFail(content, action.errorMessage);
        case CHANGE_SUBCONTENT:
            return changeSubContent(content, action.key);
        case CLEAR_CART:
            return clearCart(content);
        case SUCC_ADD_CART:
            return succAddCart(content, action.item);
        case FAIL_ADD_CART:
            return failAddCart(content, action.errorMessage);
        case INIT_WX_CONFIG_SUCC:
            return initWxConfigSucc(content, action.config);
        case INIT_WX_CONFIG_ERR:
            return initWxConfigErr(content);
        case JSSDK_INITED:
            return JSSDKInited(content);
        case INIT_CART_SUCC:
            return initCartSucc(content, action.cart);
        case INIT_CART_FAIL:
            return initCartFail(content, action.message);
        case SET_MESSAGE:
            return setMessage(content, action.errorMessage)
        default:
            return content;
    }
}