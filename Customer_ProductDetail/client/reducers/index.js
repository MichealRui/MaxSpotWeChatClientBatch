/**
 * Created by wyf on 2016/10/19.
 */
import {INIT_START, INIT_SUCCESS, INIT_FAIL, ADD_INTO_CART_SUCCESS, ADD_INTO_CART_FAIL} from '../contants/ActionTypes';

const initState = {
    productStore:'不二家',
    productName:'北海道奶酪芝士白巧克力夹心曲奇饼干',
    productInfo:'300g 奶酪芝士味',
    productImgs:[
        {
            imgSrc:'./client/components/ProductSlider/images/product.jpg',
        },
        {
            imgSrc:'./client/components/ProductSlider/images/product.jpg',
        },
        {
            imgSrc:'./client/components/ProductSlider/images/product.jpg',
        }
    ],
    productCost:'80.00',
    productCount:5,
    storeImg:'./client/components/StoreIntro/images/profile.jpg',
    storeInfo:'不二家把热销单品柠檬芝士蛋糕做成了曲奇饼干，不仅味道完全一样，食用起来也更方便，奶油芝士与白巧克力碎产生了奇妙的化学反应，满口喷香，是喜欢饮茶朋友的好伴侣。',
    storeName:'不二家',
    storeIntro:'源于日本的一家老字号食品生产商，成立于1910年，产品包括泡芙、曲奇饼、饼干及巧克力等，至今是广受...',
    productComment:{
        commentCount:306,
        hotComments:[
            {
                commentImg:'./client/components/StoreIntro/images/profile.jpg',
                userName:'傲娇小蓝孩',
                userComment:'太好吃了！下次还要买！',
                commentDate:'2016-06-19'
            },
            {
                commentImg:'./client/components/StoreIntro/images/profile.jpg',
                userName:'安宁庄四少',
                userComment:'一买回家就被老婆抢走吃完了',
                commentDate:'2016-06-19'
            },
            {
                commentImg:'./client/components/StoreIntro/images/profile.jpg',
                userName:'郁闷的海绵宝宝',
                userComment:'一买回家就被老婆抢走吃完了,一买回家就被老婆抢走吃完了,一买回家就被老婆抢走吃完了,一买回家就被老婆抢走吃完了,一买回家就被老婆抢走吃完了,太好吃了！下次还要买！',
                commentDate:'2016-06-19'
            }
        ],
    }
};

const mock = {
    "brand": {
        "imagePath":"",
        "url":"",
        "id":272,
        "story":"",
        "skuTypeId":0,
        "description":"",
        "name":"多力多滋",
        "sortNumber":0
    },
    productDetail: {
        "maxStock":0,
        "countryName":"中国大陆",
        "uniqueNumber":573,
        "imagePath":"/static/sku/0/0/578/1474368794745.jpg",
        "parentCategory":0,
        "remarks":"",
        "brandName":"多力多滋",
        "id":578,
        "categoryName":"休闲零食",
        "safeStock":0,
        "imageId":437,
        "height":0,
        "msrp":0,
        "name":"多力多滋超浓芝士味玉米片",
        "length":0,"quantity":3,
        "sellprice":1160,
        "tags":"",
        "publishTime":"Tue Sep 20 18:53:22 CST 2016",
        "status":2,
        "width":0,
        "barcode":"4710543613501",
        "country":1,
        "expirationDays":0,
        "unit":"",
        "category":6,
        "minStock":0,
        "skuNumber":"UF000578",
        "brand":272,
        "images": [
            "/static/sku/0/0/578/1474368794745.jpg"
        ],
        "attributes":[
            {"unit":"","name":"口味","value":"芝士"},
            {"unit":"g","name":"净含量","value":"65"}
            ],
        "shortName":"芝士味玉米片"
    },
    storeId: '7'};


function initStart(state) {
    return Object.assign({},state);
}

function initSuccess(state, content){
    return Object.assign({}, state, content);
}

function initFail(state){
    return Object.assign({}, state, {errorMessage:'init fail'});
}

function addIntoCartSuccess(state) {
    return Object.assign({},state, {successMessage:'add into cart success'});
}

function addIntoCartFail(state) {
    return Object.assign({},state, {errorMessage:'add into cart fail'});
}

export default function productDetail(state=mock, action) {
    switch (action.type){
        case INIT_START:
            return initStart(state);
        case INIT_SUCCESS:
            return initSuccess(state, action.content);
        case INIT_FAIL:
            return initFail(state);
        case ADD_INTO_CART_SUCCESS:
            return addIntoCartSuccess(state);
        case ADD_INTO_CART_FAIL:
            return addIntoCartFail(state);
        default:
            return state;
    }
}