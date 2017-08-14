import * as actionTypes from '../actionTypes/ShoppingCart';

const PRODUCT_UNAVAILABLE = 0; //下架
const PRODUCT_ON_SELL = 1 ; //在售
const PRODUCT_OUT_SELL = 2; //售罄
const PRODUCT_LOW_STOCK = 3; //库存不足

const CampaignType1 = 1; //满减
const CampaignType2 = 2; //第N件优惠
const CampaignType3 = 3; //满赠

function initStart(content) {
    return Object.assign({},content,{showBottom:false},{order_number:''});
}

function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

function calcuShopSum(itemInfo) {
    let newItemInfo = Object.assign({}, itemInfo);

    newItemInfo.skus.forEach( sku => {
        sku.shopDiscount = sku.campaignedProductList
              .map(cUnit => cUnit.totalDiscount || 0 )
            .reduce((pre, next) => pre + next , 0);
        sku.shopSum = (
                sku.productList.map(
                    product => !product.err_status ? product.count * product.sellprice : 0
                ).reduce(
                    (previous, current, index, array) => previous + current, 0) - sku.shopDiscount
            ) / 100
    });
    return newItemInfo;
}

function calcuTotalSum(itemInfo) {
    let filteredSkus = itemInfo.skus.filter(
        sku => {
            let id = sku.id;
            let s = itemInfo.activateShop.filter(
                //shop => shop[id] && shop[id].activated && !shop[id].editable
                shop => shop[id] && shop[id].activated
            );
            return s.length != 0
        }
    );
    let num = filteredSkus.length == 0 ? 0
        : filteredSkus.map(sku => sku.shopSum).reduce((pre, next) => pre + next, 0);
    return Number(num.toFixed(2));
}

function finalState(itemInfo) {
    /* deal with campaign*/
    itemInfo.skus.forEach(
        sku => sku.campaignedProductList =
            dealCampaign(sku.campaigns, sku.productList)
            (operator_computeCampaignByType)
    );
    /* end deal with campaign*/

    let calculatedItemInfo = calcuShopSum(itemInfo);
    calculatedItemInfo = getProductStatus(calculatedItemInfo);
    return Object.assign({}, calculatedItemInfo , {totalMoney: calcuTotalSum(calculatedItemInfo)} ,{showBottom:true})}

/*campaigns*/

function dealCampaign(campaigns,productList) {
    let tempCampaignedProductList = campaigns.map(cam => {
        return Object.assign({},{ list : productList.filter(
            product => product.campaign && (product.campaign.campaignId == cam.campaignId)
        )},cam);
    }).filter(cunit => cunit.list.length > 0);
    /*第n件优惠*/
    let type2temp = tempCampaignedProductList.filter(cUnit => cUnit.campaignType == CampaignType2);
    let type2CampaignedProductList = [];
    for(let t2Cunit of type2temp){
        let campaign = campaigns.find( cam => cam.campaignId == t2Cunit.campaignId);
        type2CampaignedProductList.push(
            t2Cunit.list.map(
                product => Object.assign({},{list : new Array(product)},campaign)
            ).shift()
        )
    }
    /*第n件优惠 end*/
    let type1CampaignedProductList =
        tempCampaignedProductList.filter(cUnit => cUnit.campaignType == CampaignType1);

    let type3CampaignedProductList =
        tempCampaignedProductList.filter(cUnit => cUnit.campaignType == CampaignType3);

    let campaignedProductList = [].concat(
        type1CampaignedProductList,
        type2CampaignedProductList,
        type3CampaignedProductList
    );
    let globalCampaign = campaigns.find( campaign => campaign.isAllSku );
    if(globalCampaign){
        campaignedProductList.push(
            Object.assign({},{list : productList},globalCampaign)
        )
    }
    campaignedProductList.push(
        {list : productList.filter(product => !product.campaign)}
    );
    return (campaignOperator) => campaignOperator(campaignedProductList)

}

function operator_computeCampaignByType(campaignedList) {
    const CashDiscount = {1: operator_computeCampaignType_1};
    const CountDiscount = {2: operator_computeCampaignType_2};
    const GiftDiscount = {3: operator_computeCampaignType_3};
    const NoDiscount = {4: operator_computeCampaignType_4};
    let operators = Object.assign({},CashDiscount,CountDiscount,GiftDiscount,NoDiscount);
    return campaignedList.map(
        cUnit => {
            let {campaignId,campaignType} = cUnit;
            if(campaignId){
                return operators[campaignType](cUnit);
            }
            return cUnit;
        }
    )
}


function operator_computeCampaign_common(cUnit) {
    // let {deductMoney, totalMoney, totalCount, campaignId, recursive} = cUnit;
    let sumCount = cUnit.list.map(product => product.count).reduce(
        (pre , next) => { return pre + next },0
    );
    let calMoney = (product) => product.sellprice * product.count;
    let totalSum = cUnit.list.map(calMoney).reduce(
        (pre , next)=>{return pre + next},0
    );
    return Object.assign({},{sumCount : sumCount},{totalSum : totalSum});
}

function operator_computeCampaignType_1(cUnit) {
    let {deductMoney, totalMoney, totalCount, campaignId, recursive} = cUnit;
    let {sumCount,totalSum} = operator_computeCampaign_common(cUnit);
    let activate = !totalCount ? (totalSum >= totalMoney) : (sumCount >=totalCount);
    cUnit.activate = activate; //是否激活此活动
    let mult = activate && recursive ?
        totalMoney ? Math.floor( totalSum / totalMoney) : Math.floor(sumCount / totalCount ) : 1;
    cUnit.totalDiscount = activate ? deductMoney * mult : 0; //优惠金额

    return cUnit;
}

function operator_computeCampaignType_2(cUnit) {
    let {discountCount, discountMoney, discountDiscount, recursive} = cUnit;
    let {sumCount,totalSum} = operator_computeCampaign_common(cUnit);
    let sellPrice = cUnit.list[0].sellprice;
    let activate = sumCount >= discountCount;
    cUnit.activate = activate;
    let mult = activate && recursive ?
        Math.floor(sumCount / discountCount) : 1;
    cUnit.totalDiscount = activate ?
        discountMoney ? discountMoney * mult : discountDiscount * sellPrice * mult : 0;
    return cUnit;
}

function operator_computeCampaignType_3(cUnit) {
    let { presentMoney, presentCount, recursive } = cUnit;
    let {sumCount,totalSum} = operator_computeCampaign_common(cUnit);
    let activate = presentMoney ? totalSum >= presentMoney : sumCount >= presentCount;
    cUnit.activate = activate;
    let mult = activate && recursive ?
        presentMoney ? Math.floor(totalSum / presentMoney) : Math.floor(sumCount/ presentCount) : 1;
    !activate && cUnit.presentSku ? cUnit.presentSku.err_status = PRODUCT_OUT_SELL : null;
    cUnit.presentSku ? cUnit.presentSku.count = mult : null;
    return cUnit;
}

function operator_computeCampaignType_4(cUnit) {
    return cUnit;
}

/*end campaigns*/

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
    let STATUS = {};
    let statusTag = '';
    STATUS[PRODUCT_UNAVAILABLE] = {err_msg : '此商品已下架',err_status : PRODUCT_UNAVAILABLE};
    STATUS[PRODUCT_OUT_SELL] = {err_msg : '此商品已售罄，暂无法购买' , err_status : PRODUCT_OUT_SELL};
    STATUS[PRODUCT_LOW_STOCK] = {err_msg: '剩余库存'+product.quantity+'件', err_status: PRODUCT_LOW_STOCK};
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

function initSuccess(content,data) {
    let info = {skus:data};
    info.show_empty = true;
    if(data && data.length > 0){
        data.forEach((item,index)=>{
            if(item.productList && item.productList.length > 0 ){
                info.show_empty = false;
                return;
            }
        })
    }
    let metionMsg = '';
    let metionCode = 0;
    let pageStatus = {editable:false,activated:true,commited:true};
    let campaigns = data.campaigns;
    info.skus.forEach(
        sku => {
            sku.productList = sku.productList.map((product)=>{
                product = checkProductStatus(product);
                return product;
            });
            /*set message*/
            sku.productList.filter(
                product => product.err_status && product.err_status != PRODUCT_ON_SELL  //??PRODUCT_LOW_STOCK
            ).length > 0 ? metionMsg = '已下架或售罄商品不参与购物结算' : null;
            /*end set message*/
            sku.productList.filter(
                product => product.err_status && product.err_status == PRODUCT_LOW_STOCK
            ).length > 0 ? pageStatus = {editable: true, activated: true , commited:true} : null
        }
    );
    info.metionMessage = metionMsg;
    // info.order_number = '';
    info.activateShop = info.skus.map(
        sku =>{
            let id = sku.id;
            let stores = {};
            stores[id] = pageStatus;
            return stores;
        }
    );
    return finalState(Object.assign({},content,info,{order_number:''}));
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
    let tempInfo = JSON.parse(JSON.stringify(itemInfo));
    let newItemList = Object.assign({},tempInfo);
    newItemList.skus.map(sku => {
        if(sku.id == item.storeId){
            let list = sku.productList;
            sku.productList = list.filter(it=>it.skuNumber!=item.skuNumber);
        }
    });
    newItemList.show_empty = true;
    if(newItemList.sku && newItemList.sku.length > 0){
        newItemList.forEach((item)=>{
            if(item.productList && item.productList.length > 0){
                newItemList.show_empty = false;
                return;
            }
        })
    }
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
    const PRODUCT_LOW_STOCK_E = -12; //库存不足
    const PRODUCT_EMPTY_SELL_E = -15; //售罄
    const PRODUCT_OUT_SELL_E = -16; //售罄
    let newItemInfo = Object.assign({},itemInfo);
    let err_msg = content.error_message;
    if(content.orderResults.length > 0){
        let order_res = content.orderResults.filter(
            res => res.is_succ == false
        )
        if(order_res && order_res.length > 0){
            err_msg = order_res[0].error_message;
            switch (order_res[0].error_code){
                case PRODUCT_LOW_STOCK_E:
                    err_msg = '部分商品缺货，请编辑购物袋';
                    break;
                case PRODUCT_EMPTY_SELL_E:
                case PRODUCT_OUT_SELL_E:
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