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

    countBack(){
        this.setState({
            currentCount : this.state.currentCount - 1
        });
        if(this.state.currentCount >= 0){
            this.state.timer = window.setTimeout(
                ()=>{
                    this.countBack()
                },this.sleepTime
            )
        }else{
            this.closePop();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.renewCount();
        if(nextProps.visible) {
            this.countBack();
        }

    }
    componentDidMount(){
        this.countBack();
    }
    componentWillUnmount(){
        window.clearTimeout(this.state.timer);
    }


    renewCount() {
        this.setState({
            currentCount:this._maxCount
        });
        window.clearTimeout(this.state.timer);
    }


    closePop(){
        window.clearTimeout(this.state.timer);
        this.props.onCancel()();
        window.setTimeout(()=>{
            this.setState({
                countShow : false
            })
        },500);
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
                                    this.getMiddlePicList(sku.images)
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
                                                errItem={props.errItem}
                                                setCartErrorMessageEmpty={props.setCartErrorMessageEmpty}
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
                                    <Footer showDetail={true} footHeight={"140px"} footHeightShow={true}/>
                                </div>

                                : ''

                        }


                    </div>
                </Modal>
            </div>
        );
    }
}