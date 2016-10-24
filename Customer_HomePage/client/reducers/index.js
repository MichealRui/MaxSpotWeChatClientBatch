/**
 * Created by ruibing on 16/9/19.
 */
import { CHANGE_SUBCONTENT } from '../actions/index'
import { INIT_START, INIT_SUCCESS, INIT_FAIL} from '../actions/index'
import { CLEAR_CART } from '../actions/index'
import { INIT_WX_CONFIG_SUCC, INIT_WX_CONFIG_ERR , JSSDK_INITED} from '../actions/index'

let bannerdata = [
    {
        destUrl: "",
        imagePath: ""
    },
];

let selector = [
    {key: '', content: '', faIcon: ''},
];

let subContent =
{
    'all':{
        banner:{
            imgPath: '',
            bannerDist: ''
        },
        freeItems: [
            {}, {}, {}
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
    count: 0
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
    wxConfig:wxConfig
};

function changeSubContent(content, key) {
    console.log("change")
    console.log(key)
    let currentSub = content['subContent'][key];
    let newContent = Object.assign({}, content)
    newContent.currentSub = currentSub;
    return newContent
}

function initStart(content) {
    return Object.assign({}, content)
}

function initSuccess(content, data){

    const SELECTOR_ICONS = {
        1: {key: 'food', content: '食品', faIcon:'fa-empire'},
        2: {key: 'makeup', content: '美妆', faIcon:'fa-tint'},
        3: {key: 'daily', content: '日用品', faIcon:'fa-umbrella'},
        4: {key: 'drink', content: '酒饮', faIcon:'fa-glass'},
        5: {key: 'baby', content: '母婴', faIcon:'fa-deviantart'}
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
    let cart = {
        remainTime: '380',
        count: 5
    };
    return Object.assign({}, content, {
        banner: data.banner,
        selector: selector,
        subContent: subContent,
        currentSub: currentSub,//data.subContent['all'],,
        storeInfo: data.store,
        cart: cart
    })
}

function initFail(content) {
    return Object.assign({}, content, {
        errorMessage: "fail init"
    })
}

function addToCart() {
    
}

function clearCart(content) {
    return Object.assign({}, content, {
        cart: {count:0, remainTime:''}
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

export default function (
    content=data, action) {
    switch (action.type) {
        case INIT_START:
            return initStart(content);
        case INIT_SUCCESS:
            return initSuccess(content, action.content);
        case INIT_FAIL:
            return initFail(content);
        case CHANGE_SUBCONTENT:
            return changeSubContent(content, action.key);
        case CLEAR_CART:
            return clearCart(content);
        case INIT_WX_CONFIG_SUCC:
            return initWxConfigSucc(content, action.config);
        case INIT_WX_CONFIG_ERR:
            return initWxConfigErr(content);
        case JSSDK_INITED:
            return JSSDKInited(content);
        default:
            return content;
    }
}