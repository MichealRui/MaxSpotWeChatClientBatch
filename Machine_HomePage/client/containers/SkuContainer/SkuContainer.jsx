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
    render(){

        let props = this.props;

        return (
            <div className="skuContainer">
                <Modal visible={this.props.visible}
                       onCancel={this.props.onCancel()}
                       wrapClassName="customized1-modal"
                       footer=''
                >
                    <div className="galleryWrapper">
                        <Gallery images={'s'}/>
                    </div>
                    <div className="skuInfo">
                        <Header />
                        {/*<Intro/>*/}
                        <Info/>
                        <Footer />
                    </div>
                </Modal>
            </div>
        );
    }
}