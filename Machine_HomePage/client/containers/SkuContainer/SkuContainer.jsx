'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';
import Gallery from '../../components/Gallery/Gallery';
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
                </Modal>
            </div>
        );
    }
}