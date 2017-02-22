/**
 * Created by ruibing on 17/1/17.
 */
import { combineReducers } from 'redux'
import content from './Home'
import message from './Message'
import cart from './Cart'
import weixin from './WeiXin'
import productDetail from './ProductDetail'
import brandDetail from './BrandDetail';
import switchShop from './SwitchShop';
import shopDetail from './ShopDetail';
import shoppingCart from './ShoppingCart';
import confirmOrder from './ConfirmOrder'

export default combineReducers({
    content,
    cart,
    weixin,
    message,
    productDetail,
    brandDetail,
    switchShop,
    shopDetail,
    shoppingCart,
    confirmOrder
})

