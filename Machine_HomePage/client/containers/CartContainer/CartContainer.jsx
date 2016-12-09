'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';
import CartItem from '../../components/CartItem/CartItem'
import SwiperComponent from '../../components/Swiper/index'
import CartBottom from '../CartBottom/CartBottom'
require('./index.css')

export default class CartContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    render(){

        let props = this.props
        let swiperConfig = {
            // pagination: '.swiper2 .swiper-pagination',
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
                    />
                    </div>
                </Modal>
            </div>
        );
    }
}