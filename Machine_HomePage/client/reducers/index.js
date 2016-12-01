'use strict';
import {INIT_SUCC} from '../actions/index'
import {CLEAR_CART, SUCC_ADD_CART, FAIL_ADD_CART} from '../actions/index'
import icon_baby from '../components/Selector/images/icon_baby.png'
import icon_daily from '../components/Selector/images/icon_daily.png'
import icon_food from '../components/Selector/images/icon_food.png'
import icon_glass from '../components/Selector/images/icon_glass.png'
import icon_tint from '../components/Selector/images/icon_tint.png'
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
    items:[]
};

let storeInfo = {

};

let data = {
    banner: bannerdata,
    selector: selector,
    subContent: subContent,
    currentSub: subContent['all'],
    cart: shoppingCart,
    storeInfo: storeInfo
};

function initSuccess(content, data){

    const SELECTOR_ICONS = {
        1: {key: 'food', content: '食品', faIcon:'fa-empire',image:icon_food},
        2: {key: 'drink', content: '酒饮', faIcon:'fa-glass',image:icon_glass},
        3: {key: 'makeup', content: '美妆', faIcon:'fa-tint',image:icon_tint},
        4: {key: 'daily', content: '日用品', faIcon:'fa-umbrella',image:icon_daily},
        5: {key: 'baby', content: '母婴', faIcon:'fa-deviantart',image:icon_baby}
    };
    let categories = data.content.filter(cat => cat.id != 0); //get category except category 'all'
    let selector = categories.map(cat =>  SELECTOR_ICONS[cat.id]);//.filter(s => s);
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
    let cart = {
        remainTime: '380',
        items: currentSub.items,
        moreItems: currentSub.items,
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

function succAddCart(content, item) {
    let state = Object.assign({}, content)
    state.cart.items.push(item);
    return state
}

export default function (
    content=data, action) {
    switch (action.type) {
        case INIT_SUCC:
            return initSuccess(content, action.data);
        // case CLEAR_CART:
        //     return clearCart(content);
        case SUCC_ADD_CART:
            return succAddCart(content, action.item);
        default:
            return content;
    }
}