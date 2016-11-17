'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';
import SkuImage from '../SkuImage/SkuImage'
import SkuInfo from '../SkuInfo/SkuInfo'
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
                    <div>
                        <div className="sku_wrapper clearfix">
                            <SkuImage />
                            <SkuInfo />
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}