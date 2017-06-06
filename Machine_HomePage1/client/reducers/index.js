'use strict';
import {INIT_SUCC} from '../actions/index'
import {
    CLEAR_CART, SUCC_ADD_CART, FAIL_ADD_CART,
    CHANGE_SUBCONTENT, SET_DETAIL, SUCC_FETCH_CART,SUCC_FETCH_SKU,
    SUCC_DELETE_CART,SUCC_REMOVE_CART,
    SET_PAYMENT_CODE, CLEAR_PAYMENT_CODE,FAIL_SET_ORDER,
    SET_ORDER, SET_CART_STATUS, SUCC_CLEAR_CART,
    SET_RECOMMEND, SUCC_INIT_ACTIVITY,SET_ERRORMESSAGE,ARR_QR_COUNT,SET_QR_COUNT
} from '../actions/index'
import icon_images from '../mock/images'
let bannerdata = [
    {
        destUrl: "",
        imagePath: ""
    },
];

let channelData = [
    {
        imagePath : "",
        type : 0
    }
]

let selector = [
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

let activity = {
    items:[],
    banner:[]
};

let data = {
    banner: bannerdata,
    channel : channelData,
    selector: selector,
    subContent: subContent,
    currentSub: subContent['all'],
    cart: shoppingCart,
    storeInfo: storeInfo,
    activity:activity,
    currentSelector:{parentKey:'', subKey:''}
};

const PRODUCT_UNAVAILABLE = 0; //下架
const PRODUCT_ON_SELL = 1 ; //在售
const PRODUCT_OUT_SELL = 2; //售罄
const PRODUCT_LOW_STOCK = 3; //库存不足


function initSuccess(content, data){
    const SELECTOR_ICONS = {
        1: {key: 'food', content: '食品', faIcon:'fa-empire',image:icon_images.img_sp},
        2: {key: 'makeup', content: '护肤美妆', faIcon:'fa-tint',image:icon_images.img_hfmz},
        3: {key: 'daily', content: '杂货', faIcon:'fa-umbrella',image:icon_images.img_zh},
        4: {key: 'drink', content: '酒水饮料', faIcon:'fa-glass',image:icon_images.img_jsyl},
        5: {key: 'baby', content: '儿童母婴', faIcon:'fa-deviantart',image:icon_images.img_etmy}
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

    /* find category items */
    subContentArray.forEach(content => {
        let items;
        let key;
        for(let i in content) {
            items = content[i].items;
            key = i
        }
        let categoryName = [...new Set(items.map(item => item.categoryName))];
        categoryName.splice(0,0,"全部");
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
        categoriedItems['全部'] = items;
        content[key].categoried = categoriedItems;
    });
    /* end finding */

    /* def current selector */
    let currentSelector = selector[0];
    currentSelector.subKey = "全部";

    let subContent = {};
    for(let content of subContentArray) {
        subContent = Object.assign({}, subContent, content)
    }
    let currentSub; // find 'food'
    for(let key in subContent) {
        currentSub = subContent[key]; //get first key
        break;
    }
    /*
    * set default value for the first time
    * */
    currentSub.items = currentSub.categoried[selector[0].subSelector[0]];

    console.log(content);

    let cart;
    if(content.cart.items.length) {
        cart = Object.assign({}, content.cart)
    } else {
        cart = {
            items: [],
            moreItems: currentSub.items.slice(0, 3),
            count: 0,
            totalPrice:0,
        };
    }

    return Object.assign({}, content, {
        banner: data.banner,
        channel : data.channel,
        selector: selector,
        subContent: subContent,
        currentSub: currentSub, //data.subContent['all'],,
        // storeInfo: data.store,
        cart: cart,
        product:'',
        currentSelector:currentSelector,
        activity:{items:[], banner:[]},
        isActivity:false,
        activeTag:''
    })
}

function dealCampaign(campaigns, productList) {
    /* rearrange product by campaign id */
    let tempCampaignedProductList = campaigns.map(campaign => {
        return Object.assign({}, { list:productList.filter(
            product => product.campaign && product.campaign.campaignId == campaign.campaignId
        )}, campaign);
    }).filter(cunit => cunit.list.length > 0);
    /* end rearrange */
    /* filter the campaign of 第N件优惠*/
    let type2Temp = tempCampaignedProductList.filter(cUnit => cUnit.campaignType == 2);
    let type2CampaignedProductList = [];
    for(let t2Cunit of type2Temp) {
        let campaign = campaigns.find( campaign => campaign.campaignId == t2Cunit.campaignId );
        type2CampaignedProductList.push(
            t2Cunit.list.map(
                product => Object.assign({}, { list : new Array(product) }, campaign )
            ).shift()
        )
    }
    let type1CampaignedProductList =
        tempCampaignedProductList.filter(cUnit => cUnit.campaignType == 1);

    let type3CampaignedProductList =
        tempCampaignedProductList.filter(cUnit => cUnit.campaignType == 3);

    let campaignedProductList = [].concat(
        type1CampaignedProductList,
        type2CampaignedProductList,
        type3CampaignedProductList
    );

    /* deal global campaign */
    let globalCampaign = campaigns.find( campaign => campaign.isAllSku );
    if(globalCampaign) {
        campaignedProductList.push(
            Object.assign({}, { list: productList }, globalCampaign )
        )
    }
    /* end deal global campaign */

    campaignedProductList.push(
        { list: productList.filter ( product => !product.campaign ) }
    );
    return (campaignOperator) => campaignOperator(campaignedProductList)
}

function operator_computeCampaignByType(campaignedList) {
    const CashDiscount = {1: operator_computeCampaignType_1};
    const CountDiscount = {2: operator_computeCampaignType_2};
    const GiftDiscount = {3: operator_computeCampaignType_3};
    let operators = Object.assign({}, CashDiscount, CountDiscount, GiftDiscount);
    return campaignedList.map( cUnit => {
        let {campaignId, campaignType} = cUnit;
        if(campaignId) {
            return operators[campaignType](cUnit)
        }
        return cUnit
    });
}

function operator_computeCampaignType_1(cUnit) {
    let {deductMoney, totalMoney, totalCount, campaignId, recursive} = cUnit;
    let sumCount = cUnit.list.map(product => product.count).reduce (
        (pre, next) => { return pre + next }, 0
    );
    let calMoney = (product) => product.sellprice * product.count;
    let totalSum = cUnit.list.map(calMoney).reduce(
        (pre, next) => {return pre + next}, 0
    );
    let activate = !totalCount ? (totalSum >= totalMoney ) : sumCount >= totalCount;
    cUnit.activate = activate;
    let mult = activate && recursive ?
        totalMoney ? Math.floor( totalSum / (totalMoney )) : Math.floor( sumCount / totalCount )
        : 1;
    cUnit.totalDiscount = activate ? deductMoney * mult : 0;
    return cUnit
}

function operator_computeCampaignType_2(cUnit) {
    let {discountCount, discountMoney, discountDiscount, recursive}  = cUnit;
    let sumCount = cUnit.list.map(product => product.count).reduce(
        (pre, next) => {return pre + next}, 0
    );
    let calMoney = (product) => product.sellprice * product.count;
    let totalSum = cUnit.list.map(calMoney).reduce(
        (pre, next) => { return pre + next }, 0
    );
    let sellPrice = cUnit.list[0].sellprice;
    let activate = sumCount >= discountCount;
    cUnit.activate = activate;
    let mult = activate && recursive ?
        Math.floor( sumCount / discountCount ) : 1;
    cUnit.totalDiscount = activate ?
        discountMoney ? discountMoney * mult : discountDiscount * sellPrice * mult
        : 0;
    return cUnit
}

function operator_computeCampaignType_3(cUnit) {
    let { presentMoney, presentCount, recursive } = cUnit;
    let sumCount = cUnit.list.map(product => product.count).reduce(
        (pre, next) => { return pre + next }, 0
    );
    let calMoney = (product) => product.sellprice * product.count;
    let totalSum = cUnit.list.map(calMoney).reduce(
        (pre, next) => { return pre + next }, 0
    );
    let activate = presentMoney ? totalSum >= presentMoney : sumCount >= presentCount;
    cUnit.activate = activate;
    let mult = activate && recursive ?
        presentMoney ? Math.floor( totalSum / presentMoney ) : Math.floor(sumCount / presentCount)
        : 1;
    !activate && cUnit.presentSku ? cUnit.presentSku.err_status = PRODUCT_OUT_SELL : null;
    cUnit.presentSku ? cUnit.presentSku.count = mult : null;
    return cUnit
}

function changeContent(content, {key, subKey}) {
    let newContent = Object.assign({}, content);
    let target = newContent.subContent[key];
    newContent.currentSub = Object.assign({}, newContent.currentSub, {items: target.categoried[subKey]});
    newContent.currentSelector = newContent.selector.filter(s => s.key == key).pop();
    newContent.currentSelector.subKey = subKey;
    // newContent.currentSelector = {parentKey: key, subKey:subKey};
    return Object.assign({},newContent,{activity:{items:[], banner:[]}},{isActivity:false},{activeTag:''});
}

function succFetchSku(content,product) {
    let newContent = Object.assign({},content);
    newContent.product = product;
    return newContent
}

function setDetail(content, prod) {
    return Object.assign({}, content, {detailContent: prod});
}

function succAddCart(content, prod) {
    // let state = Object.assign({}, content);
    let state = JSON.parse(JSON.stringify(content));
    let cartItems = state.cart.items;
    let findResult = cartItems.filter(i => i.id == prod.id) || [];
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

    /* deal with campaign*/

    newCart.campaignedProductList =
            dealCampaign(newCart.campaigns, cartItems)
            (operator_computeCampaignByType) || [];
    /* end deal with campaign*/

    let count = cartItems.map (
        product => {
            if(product.quantity > 0) {
                return product.count
            } else {
                return 0
            }
        }
    ).reduce ((pre, next) => parseInt(pre) + parseInt(next), 0) ;

    newCart.totalPrice = cartItems.map(
        product => {
            if(product.quantity > 0) {
                return product.count * product.sellprice
            } else {
                return 0
            }
        }
    ).reduce((pre, next) =>parseInt(pre) + parseInt(next), 0)  / 100;

    newCart.totalDiscount = (newCart.campaignedProductList.map(
        cunit => cunit.totalDiscount || 0
    ).reduce((pre, next) => pre + next , 0) /100 ) || 0;

    newCart.count = count;
    return newCart
}

function succFetchCart(content, skus) {
    let newContent = Object.assign({}, content);
    let newSku = Object.assign({}, skus);
    newContent.cart.items = newSku[0].productList;
    newContent.cart.moreItems = newSku[0].recommends;
    newContent.cart.campaigns = newSku[0].campaigns;
    newContent.cart = finalCartStatus(newContent.cart);
    return newContent
}


function decreaseItem(content, prod) {
    // let state = Object.assign({}, content);
    let state = JSON.parse(JSON.stringify(content));
    let cart = state.cart;
    let findResult = cart.items.filter(i => i.id == prod.id) || [];
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

function setCartErrorMessage(content,prod,message) {
    let newState = Object.assign({},content);
    let cartItems = newState.cart.items;
    let findresult = cartItems.filter(c=>c.id == prod.id);
    if(findresult && findresult.length > 0){
        findresult.errMessage = message;
    }
    return newState;
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
    let state = Object.assign({}, content)
    state.order = newOrder;
    return state
}

function setCartStatus(content, cartStatus) {
    let state =  Object.assign({}, content);
    state.cart = Object.assign({}, {...state.cart}, {cartStatus: cartStatus});
    return state
}

function clearCart(content) {
    let state = Object.assign({}, content);
    state.cart.items = [];
    state.cart = finalCartStatus(state.cart);
    return state
}

function initActivity(content, products, banner,activeTag,activeName) {
    let newContent = Object.assign({}, content);
    // let banners = [];
    // if(banner){
    //     banners = [banner];
    // }
    newContent.currentSub = Object.assign({}, newContent.currentSub, {items: products,banner:banner});
    newContent.currentSelector = {};
    newContent.currentSelector.key = "活动";
    newContent.currentSelector.subKey = activeName;
    newContent.currentSelector.subSelector = [activeName];
    // newContent.currentSelector = {parentKey: key, subKey:subKey};
    return  Object.assign({}, newContent, {activity:{items:products, banner:[banner]}},{isActivity:true},{activeTag:activeTag})
}


function checkProductStatus(product){
    let STATUS = {};
    let statusTag = '';
    STATUS[PRODUCT_UNAVAILABLE] = {err_msg : '此商品已下架',err_status : PRODUCT_UNAVAILABLE};
    STATUS[PRODUCT_OUT_SELL] = {err_msg : '此商品已售罄，暂无法购买',err_status : PRODUCT_OUT_SELL};
    STATUS[PRODUCT_LOW_STOCK] = {err_msg : '剩余库存'+product.quantity+'件',err_status : PRODUCT_LOW_STOCK};
    if(product.status != PRODUCT_ON_SELL){
        //商品已下架
        statusTag = PRODUCT_UNAVAILABLE;
    }
    if(product.quantity <= 0){
        statusTag = PRODUCT_OUT_SELL;
    }
    if(product.count > product.quantity){
        statusTag = PRODUCT_LOW_STOCK;
    }
    return Object.assign({},product,STATUS[statusTag]);
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
        case FAIL_ADD_CART:
            return setCartErrorMessage(content,action.item,action.errorMessage);
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
        case SET_CART_STATUS:
             return setCartStatus(content, action.cartStatus);
        case SUCC_CLEAR_CART:
            return clearCart(content);
        case SUCC_INIT_ACTIVITY:
            return initActivity(content, action.products, action.banner,action.activeTag,action.activeName);
        default:
            return content;
    }
}