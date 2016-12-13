'use strict';
import React from 'react';
import { Modal } from 'antd';
import CartItem from '../../components/CartItem/CartItem'
import SwiperComponent from '../../components/Swiper/index'
import CartBottom from '../CartBottom/CartBottom'
import QrCode from  '../../components/QRContent/QrContent'
import CartStatus from '../../containers/CartContainer/CartStatus';
import Loading from '../../components/LoadingContent/Loading'
import Taking from '../PaySuccContainer/PaySuccContainer'
import Cart from '../../components/Cart/Cart'
require('./index.css');

export default class CartContainer extends React.Component {

    /*
     *  default : show cart
     *  onQrClick : waiting  //submit order
     *  QrCode : show QRcode
     *  taking gif : show taking gif
     * */

    constructor(props) {
        super(props);
        this.state= {
            pageStatus:0
        }
    }

    static defaultProps = {
        cartStatus: CartStatus.SHOW_CART,
    };

    render(){

        let props = this.props;
        console.log(props)
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

        let cartContent;
        switch (props.cartStatus) {
            case CartStatus.SHOW_CART:
                cartContent = (
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
                        />
                    </div>
                );
                break;
            case CartStatus.SHOW_LOADING:
                cartContent = (
                    <Loading/>
                );
                break;
            case CartStatus.SHOW_QR:
                cartContent = <QrCode qr={props.qr}
                                      order={props.order}
                                      totalPrice={props.totalPrice}
                                      fetchOrder={(or) => props.fetchOrder(or)}
                                      setCartQr={() => props.setCart(CartStatus.SHOW_QR)}
                                      setCartTaking={() => props.setCart(CartStatus.SHOW_TAKING)}
                />;
                break;
            case CartStatus.SHOW_TAKING:
                cartContent = <Taking
                    onCancel={props.onCancel()}
                    isModalVisible={props.visible}
                />;
                break;
            default:
                cartContent = <div> error </div>
        }

        return (
            <div className="cartContainer">
                {/*<Button type="primary" onClick={this.showModal}>Open a modal dialog</Button>*/}
                <Modal visible={props.visible}
                       onCancel={props.onCancel()}
                       wrapClassName={props.cartStatus == CartStatus.SHOW_TAKING ? 'customized_taking-modal':'customized-modal'}
                       footer=''
                >
                    {
                        cartContent
                    }

                </Modal>
            </div>
        );
    }
}