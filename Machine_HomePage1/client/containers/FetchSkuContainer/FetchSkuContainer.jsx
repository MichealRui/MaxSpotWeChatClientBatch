'use strict';
import React from 'react';
import Info from '../FetchSkuShow/FetchSkuShow'
import Footer from '../SkuFooter/SkuFooter'
import { Modal } from 'antd';
require('./index.css');

export default class FetchSkuContainer extends React.Component {
    constructor(props) {
        super(props);
        // this.state={
        //     show:true
        // }
    }

    componentWillReceiveProps(nextProps) {
        // if(nextProps.visible) {
        //     this.setState({show:true})
        // } else {
        //     this.setState({show:false})
        // }
    }

    closeModal(){
        this.props.onCancel();
    }

    render(){
        return (
            <div className="fetchSkuContainer">
                <Modal visible={this.props.visible}
                       onCancel={this.closeModal.bind(this)}
                       wrapClassName="customized_fetchsku-modal"
                       footer=''
                >
                    <div className="takingContainer">
                        <Info />
                        <Footer showDetail={false} footHeight={"70px"} footHeightShow={false}/>
                    </div>
                </Modal>
            </div>
        );
    }
}