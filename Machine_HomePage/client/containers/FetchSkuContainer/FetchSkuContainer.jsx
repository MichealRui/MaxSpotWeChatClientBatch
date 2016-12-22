'use strict';
import React from 'react';
import Header from '../FetchSkuHeader/FetchSkuHeader'
import Info from '../FetchSkuShow/FetchSkuShow'
import { Modal } from 'antd';
require('./index.css');

export default class FetchSkuContainer extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render(){
        return (
            <div className="fetchSkuContainer">
                <Modal visible={this.props.visible}
                       onCancel={this.props.onCancel()}
                       wrapClassName="customized_fetchsku-modal"
                       footer=''
                >
                    <div className="takingContainer">
                        <Header />
                        <Info />
                    </div>

                </Modal>
            </div>
        );
    }
}