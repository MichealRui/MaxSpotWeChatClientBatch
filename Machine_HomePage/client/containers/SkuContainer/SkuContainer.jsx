'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';
import CartItem from '../../components/CartItem/CartItem'
import SwiperComponent from '../../components/Swiper/index'
import CartBottom from '../CartBottom/CartBottom'
require('./index.css')

export default class SkuContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    render(){

        let props = this.props
        /*let swiperConfig = {
            // pagination: '.swiper2 .swiper-pagination',
            freeMode: true,
            slidesPerView: 6,
        };*/



        return (
            <div className="skuContainer">
                {/*<Button type="primary" onClick={this.showModal}>Open a modal dialog</Button>*/}
                <Modal visible={this.props.visible}
                       onCancel={this.props.onCancel()}
                >
                    <div className="sku_wrapper">

                    </div>
                </Modal>
            </div>
        );
    }
}