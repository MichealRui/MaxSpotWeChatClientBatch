"use strict"
import React from 'react';
import {Modal} from 'antd';
import Remind from '../../components/RemindContent/RemindContent';
import Footer from '../../containers/SkuFooter/SkuFooter';
require('./index.css');

export default class RemindContainer extends React.Component{
    constructor(props){
        super(props);
    }

    hideModel(){
        this.props.onCancel;
    }

    render(){
        let props = this.props;
        return(
            <div>
                <Modal visible={props.visible}
                       onCancel={props.onCancel}
                       wrapClassName="customized_remind-modal"
                       footer=''
                >
                    <Remind visible={props.visible} onCancel={this.props.onCancel} cartVisible={false}/>
                    <Footer showDetail={false} footHeight={"70px"} footHeightShow={false}/>
                </Modal>
            </div>
        )
    }
}