'use strict';
import {INIT_SUCC} from '../actions/index'
import {
    CLEAR_CART, SUCC_ADD_CART, FAIL_ADD_CART,
    CHANGE_SUBCONTENT, SET_DETAIL, SUCC_FETCH_CART,SUCC_FETCH_SKU,
    SUCC_DELETE_CART,SUCC_REMOVE_CART,
    SET_PAYMENT_CODE, CLEAR_PAYMENT_CODE,
    SET_ORDER
} from '../actions/index'
import icon_images from '../mock/images'
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
        1: {key: 'food', content: '食品', faIcon:'fa-empire',image:icon_images.img_sp},
        2: {key: 'makeup', content: '护肤美妆', faIcon:'fa-tint',image:icon_images.img_hfmz},
        3: {key: 'daily', content: '杂货', faIcon:'fa-umbrella',image:icon_images.img_zh},
        4: {key: 'drink', content: '酒水饮料', faIcon:'fa-glass',image:icon_images.img_jsyl},
        5: {key: 'baby', content: '儿童母婴', faIcon:'fa-deviantart',image:icon_images.img_etmy}
    };
    let categories = data.content.filter(cat => cat.id != 0); //get category except category 'all'
    console.log(categories)
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

    /* find category items */
    subContentArray.forEach(content => {
        let items;
        let key;
        for(let i in content) {
            items = content[i].items;
            key = i
        }
        let categoryName = [...new Set(items.map(item => item.categoryName))];
        /* add subSelector for  selector*/
        for(let sel of selector) {
            if(sel.key == key) {
                sel.subSelector=categoryName
            }
        }
        let categoriedItems = {};
        for(let category of categoryName) {
            categoriedItems[category] = items.filter(i => i.categoryName == category);
        }
        content[key].categoried = categoriedItems;
    });
    /* end finding */

    let subContent = {};
    for(let content of subContentArray) {
        subContent = Object.assign({}, subContent, content)
    }
    let currentSub = subContent.food; // find 'food'
    /*
    * set default value for the first time
    * */
    currentSub.items = currentSub.categoried[selector[0].subSelector[0]];
    let cart = {
        remainTime: '380',
        items: [],
        moreItems: currentSub.items.slice(0, 3),
        count: 0,
        totalPrice:0
    };
    return Object.assign({}, content, {
        banner: data.banner,
        selector: selector,
        subContent: subContent,
        currentSub: currentSub,//data.subContent['all'],,
        storeInfo: data.store,
        cart: cart,
    })
}

function changeContent(content, {key, subKey}) {
    let newContent = Object.assign({}, content);
    let target = newContent.subContent[key];
    newContent.currentSub = Object.assign({}, newContent.currentSub, {items: target.categoried[subKey]});
    return newContent
}

function succFetchSku(content,product) {
    let newContent = Object.assign({},content);
    newContent.product = product
    return newContent
}

function setDetail(content, prod) {
    return Object.assign({}, content, {detailContent: prod});
}

function succAddCart(content, prod) {
    let state = Object.assign({}, content);
    let cartItems = state.cart.items;
    let findResult = cartItems.find(i => i.id == prod.id) || [];
    findResult.length == 0 ?
        cartItems.push(Object.assign({}, prod, {count:1})):
        cartItems.forEach(i => {
            if(i.id == prod.id) {
                i.count = parseInt(i.count) + 1
            }
            return i
        });
    state.cart = finalCartStatus(state.cart);
    return state
}

function finalCartStatus(cart){
    let newCart = Object.assign({}, cart);
    let cartItems = newCart.items;
    newCart.totalPrice = cartItems.map(
        product => product.count * product.sellprice
    ).reduce(
        (pre, next) =>
            parseInt(pre) + parseInt(next)
        , 0)  / 100;
    return newCart
}

function succFetchCart(content, skus) {
    console.log(skus);
    let newContent = Object.assign({}, content);
    let newSku = Object.assign({}, skus);
    newContent.cart.items = newSku[0].productList;
    newContent.cart = finalCartStatus(newContent.cart);
    return newContent
}

function decreaseItem(content, prod) {
    let state = Object.assign({}, content);
    let cart = state.cart
    let findResult = cart.items.find(i => i.id == prod.id) || [];
    if(findResult.length != 0) {
        cart.items.forEach(i => {
            if(i.id == prod.id) {
                i.count = parseInt(i.count) - 1
            }
            return i
        })
    }
    state.cart = finalCartStatus(state.cart);
    return state
}

function succRemoveItem(content, prod) {
    let state = Object.assign({}, content);
    let cart = state.cart;
    cart.items = cart.items.filter(i => i.id != prod.id);
    state.cart = finalCartStatus(state.cart);
    return state
}

function setPaymentCode(content, url) {
    return Object.assign({}, content, { qrCode: url });
}

function setOrder (content, order) {
    let newOrder = Object.assign({}, order);
    return Object({}, content, newOrder)
}

export default function (
    content=data, action) {
    switch (action.type) {
        case INIT_SUCC:
            return initSuccess(content, action.data);
        case CHANGE_SUBCONTENT:
            return changeContent(content, action);
        case SET_DETAIL:
            return setDetail(content, action.prod);
        case SUCC_ADD_CART:
            return succAddCart(content, action.item);
        case SUCC_DELETE_CART:
            return decreaseItem(content, action.item);
        case SUCC_REMOVE_CART:
            return succRemoveItem(content, action.item);
        case SUCC_FETCH_CART:
            return succFetchCart(content, action.skus);
        case SUCC_FETCH_SKU:
            return succFetchSku(content,action.product);
        case SET_PAYMENT_CODE:
            return setPaymentCode(content, action.qrCode);
        case SET_ORDER:
            return setOrder(content, action.order);
        default:
            return content;
    }
}