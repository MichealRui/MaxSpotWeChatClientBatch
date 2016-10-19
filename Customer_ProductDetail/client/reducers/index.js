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

function initStart(state) {
    return Object.assign({},state);
}

function initSuccess(state, content){
    return Object.assign(state, content);
}

function initFail(state){
    return Object.assign(state, {errorMessage:'init fail'});
}

function addIntoCartSuccess(state) {
    return Object.assign({},state, {successMessage:'add into cart success'});
}

function addIntoCartFail(state) {
    return Object.assign({},state, {errorMessage:'add into cart fail'});
}

export default function productDetail(state=initState, action) {
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