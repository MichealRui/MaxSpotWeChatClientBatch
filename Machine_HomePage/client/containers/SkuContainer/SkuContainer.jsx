'use strict';
import React from 'react';
import { Modal, Button } from 'antd';
import Gallery from '../../components/Gallery/Gallery';
import Header from '../SkuHeader/SkuHeader'
import Info from '../SkuInfo/SkuInfo'
import Footer from '../SkuFooter/SkuFooter'
import Cart from '../../components/Cart/Cart'
require('./index.css')

export default class SkuContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    getMiddlePicList(images) {
        return images.map(image => this.getMiddlePic(image))
    }

    getMiddlePic(path) {
        let domain= ENV.domain == 'http://www.mjitech.com' ? 'http://114.215.143.97': 'http://139.129.108.180';
        let particial = path.split('.');
        if(particial.length == 2) {
            particial[0] = particial[0] + '_middle';
            return domain + particial.join('.')
        } else {
            return domain + path
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
                       wrapClassName="customized1_sku-modal"
                       footer=''
                >
                    <span onClick={props.cartClick()}>
                        <Cart cartStyle={{top:-48+'px',right:110+'px'}} count={props.count || 0} totalPrice={props.totalPrice || 0} />
                    </span>
                    <div className="galleryWrapper">
                        {
                            product ? <Gallery images={sku ?
                                this.getMiddlePicList(sku.images)
                                :''
                            }/>:''
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