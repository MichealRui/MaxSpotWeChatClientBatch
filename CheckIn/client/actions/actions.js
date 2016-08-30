/**
 * Created by ruibing on 16/6/15.
 */

import fetch from 'isomorphic-fetch'
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

/* fetch item ASYNC action*/
export const FETCH_ITEM_REQUEST = 'FETCH_ITEM_REQUEST';
export const FETCH_ITEM_RECEIVE = 'FETCH_ITEM_RECEIVE';
export const FETCH_ITEM_ERROR = 'FETCH_ITEM_ERROR';

export function fetchItem(skuId) {
    return (dispatch) =>  {
        dispatch(fetchItemRequest(skuId));
        fetch('https://tuan.alitrip.com/ajax/hotel_tuan_info.json?shids=10075612%2C10092004%2C50540019%2C50966009%2C10005249%2C10094683%2C10004416%2C10092321%2C10895941%2C10886218%2C10098468%2C50864007%2C10094234%2C12633584%2C10003973%2C10613898%2C10094232%2C12652154%2C10004417%2C50059946&checkin=2016-08-25&checkout=2016-08-26&onlyTripSeller=true&_ksTS=1471864697821_3970&callback=jsonp3971',
            {
                method: 'GET',
                mode: 'no-cors',
                cache: 'default'
                // method: 'GET',
                // headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json'
                // },
                // body: JSON.stringify({
                //     skuId: skuId
                // })
            }
            )
            // .then(response => {console.log(response);response.json()})
            .then(json => {
                console.log(json.status == '0')
                if(json.status != undefined && json.status == '0') {
                    // if(json.item && json.item.skuId == skuId) {
                        let item = 				{
                            productImg:"http://192.168.20.225:8080/client/components/ProductItem/ProductInfo/images/productImg.jpg",
                            productName:"Jingle Bells",
                            productDesc:"超级好吃的饼干60g",
                            productTaste:"经典盐焗味",
                            productCost:"12.5",
                            skuId: skuId,
                            count: 1
                        };
                        dispatch(fetchItemReceive(item));
                        // dispatch(fetchItemReceive(json.item))
                    // }
                } else {
                    console.log("error")
                    dispatch(fetchItemError(skuId))
                }
            })
    }
}

function fetchItemRequest(skuId) {
    console.log(skuId)
    return {
        type: FETCH_ITEM_REQUEST,
        skuId
    }
}

function fetchItemReceive(item) {
    return {
        type: FETCH_ITEM_RECEIVE,
        item,
    }
}

function fetchItemError(skuId) {
    return {
        type: FETCH_ITEM_ERROR,
        skuId: skuId,
        message: '服务器错误,请刷新页面或联系商家'
    }
}

export function addItem(item) {
    return {
        type: ADD_ITEM,
        item
	}
}

export function deleteItem(item) {
    return {
        type: DELETE_ITEM,
        item
    }
}

/*导出加一的方法*/
export function increment(item){
    return {
        type:INCREMENT_COUNTER,
        item
    }
}

/*导出减一的方法*/
export function decrement(item){
    return {
        type:DECREMENT_COUNTER,
        item
    }
}

