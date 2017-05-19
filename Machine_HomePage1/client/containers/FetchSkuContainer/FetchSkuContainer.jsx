'use strict';
import React from 'react';
import Info from '../FetchSkuShow/FetchSkuShow'
import Footer from '../SkuFooter/SkuFooter'
import { Modal } from 'antd';
require('./index.css');

export default class FetchSkuContainer extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            show:true
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.visible) {
            this.setState({show:true})
        } else {
            this.setState({show:false})
        }
    }

    render(){
        return (
            <div className="fetchSkuContainer">
                <Modal visible={this.props.visible}
                       onCancel={this.props.onCancel}
                       wrapClassName="customized_fetchsku-modal"
                       footer=''
                >
                    {
                        this.state.show?
                            (
                                <div className="takingContainer">
                                    <Info />
                                    <Footer showDetail={false} footHeight={"70px"} footHeightShow={false}/>
                                </div>
                            )
                            :''
                    }
                </Modal>
            </div>
        );
    }
}