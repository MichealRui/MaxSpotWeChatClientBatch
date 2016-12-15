'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';
import Gallery from '../../components/Gallery/Gallery';
import Header from '../SkuHeader/SkuHeader'
import Intro from '../SkuIntro/SkuIntro'
import Info from '../SkuInfo/SkuInfo'
import Footer from '../SkuFooter/SkuFooter'
require('./index.css')

export default class SkuContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    getMiddlePicList(images) {
        return images.map(image => this.getMiddlePic(image))
    }

    getMiddlePic(path) {
        let particial = path.split('.');
        if(particial.length == 2) {
            particial[0] = particial[0] + '_middle';
            return particial.join('.')
        } else {
            return path
        }
    }

    render(){
        let props = this.props;
        let product = props.product;
        let sku = product ? product.productDetail : '';
        return (
            <div className="skuContainer">
                <Modal visible={this.props.visible}
                       onCancel={this.props.onCancel()}
                       wrapClassName="customized1-modal"
                       footer=''
                >
                                <div className="galleryWrapper">
                                    {
                                        product ? <Gallery images={sku?this.getMiddlePicList(sku.images):''}/>:''
                                    }

                                </div>
                                <div className="skuInfo">
                                    {
                                        product? (
                                            <div>
                                                <Header item={product} addToCart={(product) => props.addToCart(product)}/>
                                                {/*<Intro/>*/}
                                                <Info item={product}/>
                                                <Footer />
                                            </div>
                                        ):''
                                    }
                                </div>
                </Modal>
            </div>
        );
    }
}