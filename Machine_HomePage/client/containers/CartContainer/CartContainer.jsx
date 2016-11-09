'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';
require('./index.css')

export default class CartContainer extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     visible: this.props.visible
        // }
    }
    render(){
        return (
            <div className="">
                {/*<Button type="primary" onClick={this.showModal}>Open a modal dialog</Button>*/}
                <Modal title="Basic Modal"
                       visible={this.props.visible}
                       onCancel={this.props.onCancel()}
                       style={
                           {
                               top: 70,
                               width: '100%'
                           }
                       }
                >
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                </Modal>
            </div>
        );
    }
}