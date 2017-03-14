/**
 * Created by ruibing on 16/8/17.
 */
'use strict';
import { INIT_ERROR, INIT_SUCCESS} from '../actions/actions'
import { TOGGLE_SHOP, CHANGE_SHOP_STATE } from '../actions/actions'
import { CLEAR_CART } from '../actions/actions'
import { ADD_ITEM, DELETE_ITEM, DELETE_ITEM_FAIL,INCREMENT_COUNTER_SUCC, INCREMENT_COUNTER_FAIL, DECREMENT_COUNTER_SUCC, DECREMENT_COUNTER_FAIL} from '../actions/actions'
import {FETCH_ITEM_REQUEST, FETCH_ITEM_RECEIVE, FETCH_ITEM_ERROR} from '../actions/actions'
import { SET_MESSAGE , SET_METION_MESSAGE } from '../actions/actions'
import { INIT_CAMPAIGN_SUCC } from '../actions/actions'

const PRODUCT_UNAVAILABLE = 0; //下架
const PRODUCT_ON_SELL = 1 ; //在售
const PRODUCT_OUT_SELL = 2; //售罄
const PRODUCT_LOW_STOCK = 3; //库存不足

function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

function calcuShopSum(itemInfo) {
    // const PRODUCT_OUT_SELL= 1; //下架
    // const PRODUCT_EMPTY_SELL= 2; //售罄
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
    return filteredSkus.length == 0 ? 0
        : filteredSkus.map(sku => sku.shopSum).reduce((pre, next) => pre + next, 0)

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
    return Object.assign({}, calculatedItemInfo , {totalMoney: calcuTotalSum(calculatedItemInfo)})
}

function addItem(itemInfo, newItem) {
    let item = Object.assign({}, newItem, {count:1});
    if(isEmptyObject(itemInfo.productList)) {
        return {
            productList: new Array(Object.assign({}, item)),
        }
    } else {
        let newItemInfo = Object.assign({}, itemInfo);
        let isDup = false;
        let isOver = false;
        /* Deal with the dup item*/
        for(let it of newItemInfo.productList) {
            if(it.skuNumber == item.skuNumber) {
                if(it.count < it.quantity) {
                    it.count ++;
                } else {
                    isOver = true
                }
                isDup = true;
                break
            }
        }
        
        //Deal with the limitation
        //todo redesign data structure
        // if(isDup) {
        //     newItemInfo.alertMessage = "不可超过上限"
        // }
        /* Deal with the not dup item*/
        if(!isDup) {
            newItemInfo.productList.push(item)
        }
        return finalState(newItemInfo)
    }
}

function deleteItem(itemInfo, item, shopId) {
    let newItemList = Object.assign({},itemInfo);
    newItemList.skus.map(sku => {
        if(sku.id == shopId){
            let list = sku.productList;
            sku.productList = list.filter(it=>it.skuNumber!=item.skuNumber);
        }
    });
    return finalState(newItemList)
}

function deleteItemFail(itemInfo, item, shopId, errorMessage) {
    return Object.assign({}, itemInfo, {errorMessage: errorMessage})
}

function changeCount(itemInfo, skuNumber, shopId, operation) {
    let newItemList = Object.assign({}, itemInfo);
    newItemList.skus.map(sku => {
        if(sku.id == shopId) {
            let list = sku.productList;
            sku.productList = list.map(
                (item) => item.skuNumber==skuNumber ? operation(item):item
            );
        }
    });
    return finalState(newItemList)
}

function increaseCount(itemInfo, item, shopId) {
    return changeCount( itemInfo, item.skuNumber, shopId,
        (i) => {
            if(i.count < i.quantity) {
                i.count ++;
            }
            return i;
        })
}

function failIncrementCount(itemInfo, item, shopId, errorMessage,errCode) {
    return Object.assign({}, itemInfo, {metionMessage:errorMessage})
}

function decreaseCount (itemInfo, item, shopId) {
    let LastOne = 1;
    if(item.count <= LastOne) {
        return finalState(Object.assign({}, itemInfo));
        //return deleteItem(Object.assign({}, itemInfo), item, shopId)
    }
    return     changeCount( itemInfo, item.skuNumber, shopId,
        (i) => {
            i.count --;
            if(i.count <= i.quantity){
                i.show_tips = false;
            }
            return i;
        });
}

function decreaseCountFail(itemInfo, item, shopId, errorMessage) {
    return Object.assign({}, itemInfo, {errorMessage: errorMessage})
}

function fetchItemRequest(itemInfo, skuId) {
    return Object.assign({}, itemInfo, {isItemFetching: true}, {errorMessage: ""}); //used to tell user we are fetching data now
}

function fetchItemReceive(itemInfo, item) {
    let newItemInfo = Object.assign({}, itemInfo, {isItemFetching: false}, {errorMessage: ""});
    return addItem(newItemInfo, item)
}

function fetchItemError(itemInfo) {
    return Object.assign({}, itemInfo, {isItemFetching: false})
}

function setMessage(itemInfo, message) {
    return Object.assign({}, itemInfo, {errorMessage: message})
}
function setMetionMessage(itemInfo, message) {
    return Object.assign({}, itemInfo, {metionMessage: message})
}

function getProductStatus(itemInfo) {
    itemInfo.skus.forEach(
        sku => {
            let skunew = sku.productList.map(
                (product) => {
                    product = checkProductStatus(product)
                    return product;
                }
            );
            sku.productList = skunew;
        }
    )
    return itemInfo;
}


function checkProductStatus(product) {
    let STATUS = {};
    let statusTag = '';
    // const PRODUCT_UNAVAILABLE = 0; //下架
    // const PRODUCT_ON_SELL = 1 ; //在售
    // const PRODUCT_OUT_SELL = 2; //售罄
    // const PRODUCT_LOW_STOCK = 3; //库存不足
    STATUS[PRODUCT_UNAVAILABLE] = {err_msg: '此商品已下架', err_status: PRODUCT_UNAVAILABLE};
    STATUS[PRODUCT_OUT_SELL] = {err_msg: '此商品已售罄，暂无法购买', err_status: PRODUCT_OUT_SELL};
    STATUS[PRODUCT_LOW_STOCK] = {err_msg: '剩余库存'+product.quantity+'件', err_status: PRODUCT_LOW_STOCK};
    if(product.status != PRODUCT_ON_SELL){
        //商品已下架
        statusTag = PRODUCT_UNAVAILABLE;
    }
    if(product.quantity <= 0){
        //商品售罄
        statusTag = PRODUCT_OUT_SELL;
    }
    if(product.count > product.quantity){
        //库存不足
        statusTag = PRODUCT_LOW_STOCK;
    }
    return Object.assign({}, product, STATUS[statusTag])
}

function initCampaignSucc(state, campaigns) {
    let x = Object.assign({}, state, campaigns)
    console.log(x)
    return Object.assign({}, state, campaigns)
}

function initSuccess(state, itemInfo) {
    // const PRODUCT_OUT_SELL= 1; //下架
    // const PRODUCT_EMPTY_SELL= 2; //售罄
    // const PRODUCT_LOW_STOCK = 3; //库存不足
    // const PRODUCT_ON_SELL = 0; //库存正常
    let info = {skus: itemInfo};
    let metionMsg = '';
    let metionCode = 0;
    let pageStatus = {editable: false, activated: true ,commited:true};
    let campaigns = itemInfo.campaigns;
    info.skus.forEach(
        sku => {
            sku.productList = sku.productList.map((product) => {
                product =  checkProductStatus(product);
                /* todo delete TEST for campaign */
                // product.campaign={ campaignId:1, campaignTag: '满100减20' };
                /* end for campaign*/
                return product;
            });
            /* set message*/
            sku.productList.filter(
                product => product.err_status && product.err_status != PRODUCT_ON_SELL
            ).length > 0 ? metionMsg = '已下架或售罄商品不参与购物结算': null;
            /* end set message */

            /* set page status*/
            sku.productList.filter(
                product => product.err_status && product.err_status == PRODUCT_LOW_STOCK
            ).length ? pageStatus = {editable: true, activated: true , commited:true} : null;
            /* end set page status */
        }
    );
    info.metionMessage = metionMsg;
    info.activateShop = info.skus.map(sku => {
        let id = sku.id;
        let stores = {};
        stores[id] = pageStatus;
        return stores;
    });
    return finalState(Object.assign({}, state, info))
}

function dealCampaign(campaigns, productList) {
    const CampaignType1 = 1; //满减
    const CampaignType2 = 2; //第N件优惠
    const CampaignType3 = 3; //满赠

    /* rearrange product by campaign id */
    let tempCampaignedProductList = campaigns.map(campaign => {
        return Object.assign({}, { list:productList.filter(
            product => product.campaign && product.campaign.campaignId == campaign.campaignId
        )}, campaign);
    }).filter(cunit => cunit.list.length > 0);
    /* end rearrange */

    /* filter the campaign of 第N件优惠*/
    let type2Temp =
        tempCampaignedProductList.filter(cUnit => cUnit.campaignType == CampaignType2);
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
        tempCampaignedProductList.filter(cUnit => cUnit.campaignType == CampaignType1);

    let type3CampaignedProductList =
        tempCampaignedProductList.filter(cUnit => cUnit.campaignType == CampaignType3);

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

function operator_computeGlobalCampaign(campaignedList) {

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
    let activate = !totalCount ? (totalSum >= totalMoney) : sumCount >= totalCount;
    cUnit.activate = activate;
    let mult = activate && recursive ?
        totalMoney ? Math.floor( totalSum / (totalMoney)) : Math.floor( sumCount / totalCount )
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
        presentMoney ? Math.floor( totalSum / (presentMoney) ) : Math.floor(sumCount / presentCount)
        : 1;
    !activate && cUnit.presentSku ? cUnit.presentSku.err_status = PRODUCT_OUT_SELL : null;
    cUnit.presentSku ? cUnit.presentSku.count = mult : null;
    return cUnit
}

// function operator_computeCampaignListSum(campaignedList) {
//     campaignedList.forEach(cUnit => {
//         if(cUnit.campaignId) {
//             cUnit.sum = cUnit.list.map(product => {
//                 return product.err_status ? 0 : product.sellprice * product.count
//             }).reduce((pre, next) => {
//                 return pre + next
//             }, 0)
//         }
//     });
//     return (campaignOperator) => campaignOperator(campaignedList)
// }

function operator_computeCampaignDetail(campaignedList) {
    return campaignedList.map(cUnit => {
        let { campaignId, sum, total, recursive, discount } = cUnit;
        if( campaignId && sum ) {
            let activate = (sum >= total);
            cUnit.activate = activate;
            let mult = activate && recursive ? Math.floor( sum / total ) : 1;
            !activate && cUnit.sku? cUnit.sku.err_status = PRODUCT_OUT_SELL : null;
            cUnit.totalDiscount = discount * mult;
            cUnit.sku ? cUnit.sku.count = mult : null;
        }
        return cUnit
    })
}

function toggleShop(itemInfo, shopId) {
    let newItemInfo = Object.assign({}, itemInfo);
    newItemInfo.activateShop = newItemInfo.activateShop.map(
        shop => {
            let id = Object.keys(shop).shift();
            if(id == shopId) {
                let temp = {};
                temp[id] = {
                    editable: shop[id].editable,
                    activated: !shop[id].activated
                };
                return temp
            } else {
                return shop
            }
        });
    return finalState(newItemInfo);
}

function editState(itemInfo, shopId) {
    let newItemInfo = Object.assign({}, itemInfo);
    newItemInfo.activateShop = newItemInfo.activateShop.map(
        shop => {
            let id = Object.keys(shop).shift();
            if(id == shopId) {
                let temp = {};
                temp[id] = {
                    editable: !shop[id].editable,
                    activated: shop[id].activated
                };
                return temp
            } else {
                return shop
            }
        });
    return finalState(newItemInfo);
}

function clearCart(itemInfo) {
    return {skus:[], activateShop:[{1:{editable: false, activated: true , commited:false}}], remainTime: ''}
}

 export default function (itemInfo = {skus:[], activateShop:[{1:{editable: false, activated: true}}], remainTime: '', errorMessage:'',metionMessage:''}, action){
     switch(action.type){
        case INIT_SUCCESS:
            return initSuccess(itemInfo, action.skus);
        case TOGGLE_SHOP:
            return toggleShop(itemInfo, action.shopId);
        case CHANGE_SHOP_STATE:
            return editState(itemInfo, action.shopId);
        case CLEAR_CART:
            return clearCart(itemInfo);
        case ADD_ITEM:
            return addItem(itemInfo, action.item);
        case DELETE_ITEM:
            return deleteItem(itemInfo, action.item, action.shopId);
        case DELETE_ITEM_FAIL:
            return deleteItemFail(itemInfo, action.item, action.shopId, action.errorMessage)
        case INCREMENT_COUNTER_SUCC:
            return increaseCount(itemInfo, action.item, action.shopId);
        case INCREMENT_COUNTER_FAIL:
            return failIncrementCount(itemInfo, action.item, action.shopId, action.errorMessage,action.errCode);
        case DECREMENT_COUNTER_SUCC:
            return decreaseCount(itemInfo, action.item, action.shopId);
        case DECREMENT_COUNTER_FAIL:
            return decreaseCountFail(itemInfo, action.item, action.shopId, action.errorMessage);
        case FETCH_ITEM_REQUEST:
            return fetchItemRequest(itemInfo, action.skuId);
        case FETCH_ITEM_RECEIVE:
            return fetchItemReceive(itemInfo, action.item);
        case FETCH_ITEM_ERROR:
            return fetchItemError(itemInfo, action.skuId, action.message);
        case SET_MESSAGE:
            return setMessage(itemInfo, action.message);
         case SET_METION_MESSAGE:
             return setMetionMessage(itemInfo, action.message);
         case INIT_CAMPAIGN_SUCC:
             return initCampaignSucc(itemInfo, action.campaigns);
        default:
            return itemInfo;
    }
}