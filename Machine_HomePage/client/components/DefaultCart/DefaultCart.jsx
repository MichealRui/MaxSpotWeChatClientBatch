'use strict';
import React from 'react';
import SwiperComponent from '../../components/Swiper/index'
import Cart from '../../components/Cart/Cart'
import CartItem from '../../components/CartItem/CartItem'
import CartBottom from '../../containers/CartBottom/CartBottom'
export default class DefaultCart extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {
        let props = this.props;
        let swiperConfig = {
            freeMode: true,
            slidesPerView: 6,
        };
        let items = props.items.map((item, index) => {
            return <CartItem item={item}
                             key={index}
                             dec={props.decItem}
                             add={props.addToCart}
                             remove={props.removeItem}
            />
        });

        return (
            <div>
                <Cart cartStyle={{top:-38+'px',right:150+'px'}} count={props.count} totalPrice={props.totalPrice || 0}/>
                <div className="itemContainer" >
                    <SwiperComponent
                        swiperConfig={swiperConfig}
                        swiperContainer={'swiper3'}
                    >
                        {items}
                    </SwiperComponent>
                </div>
                <CartBottom moreItems={props.moreItems}
                            itemClick={props.addToCart}
                            totalPrice={props.totalPrice}
                            submit={props.submit}
                            setCartLoading={() => props.setCart(CartStatus.SHOW_LOADING)}
                            clearCart={() => props.clearCart()}
                />
            </div>
        )
    }
}