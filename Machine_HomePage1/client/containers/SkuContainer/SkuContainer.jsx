'use strict';
import React from 'react';
import { Modal } from 'antd';
import Gallery from '../../components/Gallery/Gallery';
import Header from '../SkuHeader/SkuHeader'
import Info from '../SkuInfo/SkuInfo'
import Footer from '../SkuFooter/SkuFooter'
import Campaign from '../../components/Campaign/Campaign';
require('./index.css');

export default class SkuContainer extends React.Component {
    constructor(props) {
        super(props);
        this._maxCount=60;
        this.sleepTime=1000;
        this.state={
            timer:null,
            currentCount: this._maxCount,
            countShow:false
        }
    }

    getMiddlePicList(images) {
        return images.map(image => this.getMiddlePic(image))
    }

    getMiddlePic(path) {
        let domain= IMAGECONFIG.host;//ENV.domain == 'http://www.mjitech.com' ? 'http://114.215.143.97': 'http://139.129.108.180';
        let particial = path.split('.');
        if(particial.length == 2) {
            particial[0] = particial[0] + '_middle';
            return domain + particial.join('.')
        } else {
            return domain + path
        }
    }

    getDetailPicList(images) {
        return images.map(image => this.getDetailPic(image))
    }

    getDetailPic(path) {
        let domain= IMAGECONFIG.host;
        return domain + path
    }

    countOne() {
        console.log('count one ');
        console.log(this.state.currentCount);
        this.setState({
            currentCount:this.state.currentCount - 1
        });
    }

    countBack() {
        if(this.state.currentCount == 0) {
            this.props.onCancel()()
        } else {
            let timer = window.setTimeout(
                () => {
                    this.countOne();
                    this.countBack()
                }, this.sleepTime);
            this.setState({
                timer: timer
            })
        }
    }

    renewCount() {
        this.setState({
            currentCount:this._maxCount
        })
    }

    componentWillReceiveProps(nextProps) {
        // if(nextProps.visible && !this.state.timer) {
        //     this.countBack()
        // }
        // if(!nextProps.visible) {
        //     window.clearTimeout(this.state.timer);
        //     this.setState({
        //         timer: null,
        //         currentCount:this._maxCount
        //     })
        // }
    }

    closePop(){
        this.props.onCancel()();
        this.setState({
            countShow : false
        })
    }

    showCountControl(){
        this.setState({
            countShow : true
        })
    }


    render(){
        let props = this.props;
        let product = props.product;
        let sku = product ? product.productDetail : '';
        return (
            <div className="skuContainer">
                <Modal visible={this.props.visible}
                       onCancel={this.closePop.bind(this)}
                       wrapClassName="customized1_sku-modal"
                       footer=''
                >
                    <div className="skuContent" onClick={() => this.renewCount()}>
                        <div className="skuInfo">
                            {
                                product ? <Gallery images={sku ?
                                    this.getDetailPicList(sku.images)
                                    :''
                                }/>:''
                            }
                            <div>
                                {
                                    product ? (
                                        <Header item={product}
                                                dec={props.decItem}
                                                add={props.addToCart}
                                                itemCount={props.count}
                                                campaignedProductList={props.campaignedProductList}
                                                countShow={this.state.countShow}
                                                showCountControl={this.showCountControl.bind(this)}
                                    />
                                    ) : ''

                                }


                            </div>

                        </div>
                        {
                            product ?
                                <div>
                                    <Campaign campaign={sku.campaign} />
                                    <Info item={product}/>
                                    <Footer showDetail={true}/>
                                </div>

                                : ''

                        }


                    </div>
                </Modal>
            </div>
        );
    }
}