'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';
import skuImage from '../SkuImage/skuImage'
import skuInfo from '../SkuInfo/skuInfo'
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
                <Modal visible={this.props.visible}
                       onCancel={this.props.onCancel()}
                       wrapClassName="customized-modal"
                       footer=''
                >
                    <div className="sku_wrapper clearfix">
                        <skuImage />
                        <skuInfo />
                    </div>
                </Modal>
            </div>
        );
    }
}