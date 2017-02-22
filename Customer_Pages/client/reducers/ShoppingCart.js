import * as actionTypes from '../actionTypes/ShoppingCart';

function initStart(content) {
    return Object.assign({},content);
}

function calcuShopSum(itemInfo) {
    let newItemInfo = Object.assign({}, itemInfo);
    newItemInfo.skus.forEach( sku => {
        sku.shopSum = sku.productList.map(
                product => product.count * product.sellprice
            ).reduce(
                (previous, current, index, array) => previous + current
                , 0) / 100
    });
    return newItemInfo;
}

function calcuTotalSum(itemInfo) {
    let filteredSkus = itemInfo.skus.filter(
        sku => {
            let id = sku.id;
            let s = itemInfo.activateShop.filter(
                shop => shop[id] && shop[id].activated
            );
            return s.length != 0;
        }
    );
    return filteredSkus.length == 0 ? 0
        : filteredSkus.map(sku => sku.shopSum).reduce((pre,next)=>pre+next+0);
}

function finalState(itemInfo) {
    let calculatedItemInfo = calcuShopSum(itemInfo);
    calculatedItemInfo = getProductStatus(calculatedItemInfo);
    return Object.assign({}, calculatedItemInfo , {totalMoney: calcuTotalSum(calculatedItemInfo)})
}

function getProductStatus(itemInfo) {
    itemInfo.skus.forEach(
        sku => {
            let newsku = sku.productList.map(
                product => {
                    product = checkProductStatus(product);
                    return product;
                }
            )
            sku.productList = newsku;
        }
    )
    return itemInfo;
}

function checkProductStatus(product) {
    const PRODUCT_OUT_SELL= 1; //下架
    const PRODUCT_EMPTY_SELL= 2; //售罄
    const PRODUCT_ON_SELL = 1 ; //在售
    const PRODUCT_LOW_STOCK = 3 //库存不足
    let productState = Object.assign({},product,{err_msg:'',err_status:0,show_tips:false});
    if(productState.status != PRODUCT_ON_SELL){
        //商品已下架
        productState.err_msg = '此商品已下架';
        productState.err_status = PRODUCT_OUT_SELL;
    }else if(productState.quantity <= 0){
        //商品售罄
        productState.err_msg = '此商品已售罄，暂无法购买';
        productState.err_status = PRODUCT_EMPTY_SELL;
    }else if(productState.count > productState.quantity){
        //库存不足
        productState.err_msg = '剩余库存'+productState.quantity+'件';
        productState.err_status = PRODUCT_LOW_STOCK;
        productState.show_tips = true;
    }
    return productState;
}

function initSuccess(content,data) {
    const PRODUCT_OUT_SELL= 1; //下架
    const PRODUCT_EMPTY_SELL= 2; //售罄
    const PRODUCT_LOW_STOCK = 3; //库存不足
    const PRODUCT_NORMAL = 0; //库存正常
    let metionCode = PRODUCT_NORMAL;
    let info = {skus:data};
    let pageStatus = {editable:false,activated:true,commited:true};
    info.skus.forEach(
        sku => {
            let newsku = sku.productList.map(
                product => {
                    product = checkProductStatus(product);
                    if(product.err_status == PRODUCT_LOW_STOCK){
                        pageStatus = {editable: true, activated: true , commited:true};
                    }
                    if(metionCode != PRODUCT_LOW_STOCK){
                        switch (product.err_status){
                            case PRODUCT_OUT_SELL:
                                metionMsg = '已下架或售罄商品不参与购物结算';
                                metionCode = PRODUCT_OUT_SELL;
                                break;
                            case PRODUCT_EMPTY_SELL:
                                metionMsg = '已下架或售罄商品不参与购物结算';
                                metionCode = PRODUCT_EMPTY_SELL;
                                break;
                            case PRODUCT_LOW_STOCK:
                                metionMsg = '部分商品缺货，请编辑购物车';
                                metionCode = PRODUCT_LOW_STOCK;
                                break;
                        }
                    }
                    return product;
                }

            );
            sku.productList = newsku;
        }
    );
    info.metionMessage = '';
    info.order_number = '';
    info.activateShop = info.skus.map(
        sku =>{
            let id = sku.id;
            let stores = {};
            stores[id] = pageStatus;
            return stores;
        }
    )
    return finalState(info);
}

function setMetionMessage(content,data) {
    let newItemInfo = Object.assign({},content,{metionMessage:data});
    return finalState(newItemInfo);
}

function toggleShop(itemInfo,shopId) {
    let newItemInfo = Object.assign({},itemInfo);
    newItemInfo.activateShop = newItemInfo.activateShop.map(
        shop => {
            let id = Object.keys(shop).shift();
            if(id == shopId){
                let temp = {};
                temp[id] = {
                    editable: shop[id].editable,
                    activated: !shop[id].activated
                }
                return temp;
            }else{
                return shop;
            }
        }
    )
    return finalState(newItemInfo);
}

function changeShopState(itemInfo,shopId) {
    let newItemInfo = Object.assign({},itemInfo);
    newItemInfo.activateShop = newItemInfo.activateShop.map(
        shop => {
            let id = Object.keys(shop).shift();
            if(id == shopId){
                let temp = {};
                temp[id] = {
                    editable: !shop[id].editable,
                    activated: shop[id].activated
                };
                return temp;
            }else{
                return shop;
            }

        }
    );
    return finalState(newItemInfo);
}

function succDeleteItem(itemInfo,item) {
    let newItemList = Object.assign({},itemInfo);
    newItemList.skus.map(sku => {
        if(sku.id == item.storeId){
            let list = sku.productList;
            sku.productList = list.filter(it=>it.skuNumber!=item.skuNumber);
        }
    });
    return finalState(newItemList)
}

function changeCount(itemInfo,item,operation) {
    let newItemInfo = Object.assign({},itemInfo);
    newItemInfo.skus.map(
        sku => {
            if(sku.id == item.storeId){
                let list = sku.productList;
                sku.productList = list.map(
                    it => it.skuNumber == item.skuNumber ? operation(it) : it
                )
            }
        }
    );
    return finalState(newItemInfo)
}

function succDecrementItem(itemInfo,item) {
    let LastOne = 1;
    if(item.total_count <= LastOne){
        return finalState(Object.assign({},itemInfo));
    }
    return changeCount(
        itemInfo,item,(i)=>{
            i.count--;
            return i;
        }
    )
}

function succIncrementItem(itemInfo,item) {
    return changeCount(itemInfo,item,(i)=>{
        if(i.count < i.quantity) {
            i.count ++;
        }
        return i;
    })
}

function failSubmitCart(itemInfo,content) {
    const PRODUCT_LOW_STOCK = -12; //库存不足
    const PRODUCT_EMPTY_SELL = -15; //售罄
    const PRODUCT_OUT_SELL = -16; //售罄
    let newItemInfo = Object.assign({},itemInfo);
    let err_msg = content.error_message;
    if(content.orderResults.length > 0){
        let order_res = content.orderResults.filter(
            res => res.is_succ == false
        )
        if(order_res && order_res.length > 0){
            err_msg = order_res[0].error_message;
            switch (order_res[0].error_code){
                case PRODUCT_LOW_STOCK:
                    err_msg = '部分商品缺货，请编辑购物袋';
                    break;
                case PRODUCT_EMPTY_SELL:
                case PRODUCT_OUT_SELL:
                    err_msg = "已下架或售罄商品不参与购物结算";
                    break;
            }
        }else{
            err_msg = "库存不足或商品售罄"
        }
    }
    newItemInfo.metionMessage = err_msg;
    return finalState(newItemInfo);
}

function succSubmitCart(itemInfo,orderNumber) {
    let newItemInfo = Object.assign({},itemInfo,{order_number:orderNumber});
    return finalState(newItemInfo);
}

export default function (content={},action) {
    switch (action.type){
        case actionTypes.INIT_SHOPPING_CART_START:
            return initStart(content);
        case actionTypes.INIT_SHOPPING_CART_SUCCESS:
            return initSuccess(content,action.content);
        case actionTypes.DELETE_ITEM_SUCCESS:
            return succDeleteItem(content,action.item);
        case actionTypes.DECREMENT_ITEM_SUCCESS:
            return succDecrementItem(content,action.item);
        case actionTypes.INCREMENT_ITEM_SUCCESS:
            return succIncrementItem(content,action.item);
        case actionTypes.SET_METION_MESSAGE :
            return setMetionMessage(content,action.message);
        case actionTypes.SHOPPINT_CART_TOGGLE_SHOP:
            return toggleShop(content,action.shopId);
        case actionTypes.SHOPPINT_CART_CHANGE_SHOP_STATE:
            return changeShopState(content,action.shopId);
        case actionTypes.SUBMIT_SHOPPING_CART_SUCCESS:
            return succSubmitCart(content,action.content);
        case actionTypes.SUBMIT_SHOPPING_CART_FAIL:
            return failSubmitCart(content,action.content);
        default:
            return content;
    }
}