'use strict';
import React from 'react';
import Info from '../FetchSkuShow/FetchSkuShow'
import Footer from '../SkuFooter/SkuFooter'
import { Modal } from 'antd';
require('./index.css');

export default class FetchSkuContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            //show:true
            timer : null,
            currentCount : 0,
            stayTime : 1000
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentCount : 0
        });
        if(nextProps.visible) {
            this.countBack();
            // this.setState({show:true})
        } else {
            window.clearTimeout(this.state.timer);
            // this.setState({show:false})
        }

    }

    componentDidMount(){
        this.countBack();
    }
    componentWillUnmount(){
        window.clearTimeout(this.state.timer);
    }

    countBack(){
        if(this.state.currentCount <= 30){
            this.setState({
                currentCount : this.state.currentCount + 1
            });
            this.state.timer = window.setTimeout(()=>{
                this.countBack();
            },this.state.stayTime);
        }else{
            window.clearTimeout(this.state.timer);
            this.closeModal();
        }
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