'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';
import CartItem from '../../components/CartItem/CartItem'
import SwiperComponent from '../../components/Swiper/index'
import CartBottom from '../CartBottom/CartBottom'
import ReactQrCode from 'qrcode.react'
import QrCode from  '../../components/QRContent/QrContent'
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
            sleepTime:2000,
            pageStatus:0
        }
    }

    setWaiting() {
        this.setState({
                pageStatus: 'waiting'
        })
    }

    fetchOrderStatus() {
        let {qr, order, fetchOrder} = this.props;
        let PAID = '2';
        if(order.status != PAID) {
            fetchOrder(order.orderNumber);
            window.setTimeout( () => this.fetchOrderStatus(), this.state.sleepTime)
        } else {

        }
    }

    render(){

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
            <div className="cartContainer">
                {/*<Button type="primary" onClick={this.showModal}>Open a modal dialog</Button>*/}
                <Modal visible={this.props.visible}
                       onCancel={this.props.onCancel()}
                       wrapClassName="customized-modal"
                       footer=''
                >
                    {
                        props.qr ?
                            <ReactQrCode value={props.qr}/>:
                            <div>
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
                                />
                            </div>
                    }

                </Modal>
            </div>
        );
    }
}