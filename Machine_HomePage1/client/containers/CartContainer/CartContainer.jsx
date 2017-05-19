'use strict';
import React from 'react';
import { Modal } from 'antd';
// import DefaultCart from '../../components/DefaultCart/DefaultCart'
import QrCode from  '../../components/QRContent/QrContent'
import CartStatus from '../../containers/CartContainer/CartStatus';
import Loading from '../../components/LoadingContent/Loading'
import Taking from '../PaySuccContainer/PaySuccContainer'
import Footer from '../../containers/SkuFooter/SkuFooter'
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
        cartStatus: CartStatus.SHOW_LOADING,
    };

    render(){
        let props = this.props;
        let wrapClassName = 'customized_default-modal';
        let cartContent;
        switch (props.cartStatus) {
            case CartStatus.HIDE_CART:
                cartContent = <div></div>;
                break;
            case CartStatus.SHOW_CART:
                cartContent = (
                    // <DefaultCart
                    //     items={props.items}
                    //     moreItems={props.moreItems}
                    //     itemClick={props.addToCart}
                    //     decItem={props.decItem}
                    //     addToCart={props.addToCart}
                    //     count={props.count}
                    //     campaignList={props.campaignedProductList}
                    //     removeItem={props.removeItem}
                    //     totalPrice={props.totalPrice}
                    //     totalDiscount = {props.totalDiscount}
                    //     submit={props.submit}
                    //     clearCart={() => props.clearCart()}
                    //     isModalVisible={props.visible}
                    //     goBack={props.onCancel()}
                    // />
                    <div>SHOW_CART</div>
                );
                break;
            case CartStatus.SHOW_LOADING:
                cartContent = (
                    <Loading />
                );
                break;
            case CartStatus.SHOW_QR:
                cartContent = <QrCode
                    qr={props.qr}
                    order={props.order}
                    fetchOrder={(or) => props.fetchOrder(or)}
                    setCartQr={() => props.setCart(CartStatus.SHOW_QR)}
                    setCartTaking={() => props.setCart(CartStatus.SHOW_TAKING)}
                    totalPrice={props.totalPrice}
                    totalDiscount = {props.totalDiscount}
                    campaignList={props.campaignedProductList}
                />;
                break;
            case CartStatus.SHOW_TAKING:
                // cartContent = <Taking
                //     onCancel={props.onCancel()}
                //     isModalVisible={props.visible}
                // />;
                cartContent = <div>SHOW_TAKING</div>
                wrapClassName = 'customized_taking-modal';
                break;
            default:
                cartContent = <div> error </div>
        }

        return (
            <div className="cartContainer">
                {/*<Button type="primary" onClick={this.showModal}>Open a modal dialog</Button>*/}
                <Modal visible={props.visible}
                       onCancel={props.onCancel()}
                       wrapClassName="customized_cart-modal"
                       footer=''
                >
                    {cartContent}
                    <Footer showDetail={false} footHeight={"70px"} footHeightShow={false}/>
                </Modal>
            </div>
        );
    }
}