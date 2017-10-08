"use strict";
import React from 'react';
import Cart from '../../components/Cart/Cart'
import SwiperComponent from '../../components/Swiper/index'
import Empty from '../../components/Empty/Empty'
import CartItem from '../../components/CartItem/CartItem';
import CartBottom from '../../containers/CartBottomNew/CartBottomNew';
require('./index.css');
export default class ShoppingCartContainer extends React.Component{
    constructor(props){
        super(props);
    }
    generateProductStructure(campaignDetail) {
        let swiperConfigs = {
            freeMode: false,
            slidesPerView: 4,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            // observeParents:true,//修改swiper的父元素时，自动初始化swiper
            spaceBetween: 0,
        };
        let {decItem, addToCart, removeItem,setCartErrorMessageEmpty,errItem} = this.props;
        let {campaignId, campaignTag, presentSku, list, totalDiscount, activate, initStatus, isAllSku} = campaignDetail;
        let productStructures = list.length > 0 ?
            (
                <div className="campaignContainer">
                    {
                        campaignId && !isAllSku ?
                            <div className={"campaignTag " + (activate?"activate" : "fail")}>
                                { (activate?"已满足":"不满足") + "【"+campaignTag+"】"}
                            </div>
                            :null
                    }
                    <div className="itemList">
                        {
                            !isAllSku ? list.map(
                                (product,index)=>
                                    <CartItem
                                        item={product}
                                        key={index}
                                        dec={decItem}
                                        add={addToCart}
                                        remove={removeItem}
                                        campaign={campaignId}
                                        activate = {activate}
                                        campaignTag={campaignTag}
                                        itemKey = {index}
                                    />

                            ) : null
                        }
                    </div>
                    {
                        presentSku ? <CartItem item={presentSku} isGift={true} activate={activate} campaign={campaignId}/> : null
                    }
                </div>
            ) : null;
        let giftKey = 0;
        let productStructure = list.length > 0 && !isAllSku ? (
            list.map(
                (product,index)=>
                {
                    giftKey ++ ;
                    product.errMessage = this.props.errItem && this.props.errItem.id == product.id ? this.props.errItem.errorMessage : '';
                    return (<CartItem
                        item={product}
                        key={index}
                        dec={decItem}
                        add={addToCart}
                        remove={removeItem}
                        campaign={campaignId}
                        activate = {activate}
                        campaignTag={campaignTag}
                        itemKey = {index}
                        isAllSku = {isAllSku}
                        setCartErrorMessageEmpty={setCartErrorMessageEmpty}
                        errItem={errItem}
                    />)
                }


            )
        ) : null;
        let giftStructure = list.length > 0 && presentSku ? (
            <CartItem item={presentSku} itemKey={giftKey} isGift={true} activate={activate} campaign={campaignId} isAllSku = {isAllSku}/>
        ) : null;
        if(giftStructure){
            if(productStructure && productStructure.length > 0){
                productStructure.push(giftStructure)
            }else{
                productStructure = giftStructure
            }
        };
        if(productStructure){
            return new Array(productStructure);
        }else{
            return false
        }
    }
    reduceProductStructure(campaignDetail){
        return this.generateProductStructure(campaignDetail);
    }

    showQrCode(){
        if(this.props.totalPrice <= 0){
            return false
        }else{
            // this.props.clearCart()
            this.props.cartClick();
        }
    }


    render(){
        let props = this.props;
        let item_count = props.items.length;
        let items = props.campaignedProductList && props.campaignedProductList.length>0 ?
            props.campaignedProductList.map(
                this.reduceProductStructure.bind(this)
            ).filter(product => product):null;
        let swiperConfig = {
            freeMode: true,
            slidesPerView: 5,
            // observer:true,//修改swiper自己或子元素时，自动初始化swiper
            // observeParents:true,//修改swiper的父元素时，自动初始化swiper
            spaceBetween: 0,
        };
        let showErr = props.items.filter(item=>item.count > item.quantity || item.status != 1 || item.quantity <= 0).length > 0;
        return(
            <div className="machineNewShoppingCartContainer">
                <Cart cartStyle={{}} count={props.count || 0} totalPrice={props.totalPrice || 0} allSkuImage={props.allSkuImage}
                      click={this.showQrCode.bind(this)} remindShow={this.props.remindShow} beginBack={this.props.beginBack} showErr={showErr}/>
                <div className={"cartItemContainer " + (item_count > 0 ? '':'hide')} >
                    <div className="emptyItem" onClick={()=>this.props.clearCart()}>
                        <img src={require("./images/icon-trash.png")} />
                        <span>清空购物袋</span>
                    </div>
                    <SwiperComponent
                        swiperConfig={swiperConfig}
                        swiperContainer={'swipers1'}
                        reload={true}
                        itemCount={item_count}
                    >
                        {items}
                    </SwiperComponent>
                </div>
                <div className={"emptyContainer " + (item_count > 0 ? 'hide' : '')}>
                    <Empty />
                </div>
                <CartBottom moreItems={props.moreItems}
                            itemClick={props.addToCart}
                            productList={props.items}
                            errItem={props.errItem}
                            setCartErrorMessageEmpty={props.setCartErrorMessageEmpty}
                />
            </div>
        )
    }
}