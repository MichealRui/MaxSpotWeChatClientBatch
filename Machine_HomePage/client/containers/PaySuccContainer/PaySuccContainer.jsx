'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';
import Header from '../PaySuccHeader/PaySuccHeader'
import Info from '../PaySuccShow/PaySuccShow'
import Bottom from '../PaySuccBottom/PaySuccBottom'
require('./index.css')

export default class PaySuccContainer extends React.Component {
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

                    <Header />
                    <Info />
                    <Bottom />
                </Modal>
            </div>
        );
    }
}