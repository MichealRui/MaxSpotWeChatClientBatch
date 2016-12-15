'use strict';
import React from 'react';
import Header from '../PaySuccHeader/PaySuccHeader'
import Info from '../PaySuccShow/PaySuccShow'
require('./index.css');

export default class PaySuccContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            sleepTime:1000,
            count:30,
            timer:null
        }
    }

    countOne(){
        this.setState({
            count: this.state.count - 1
        });
    }

    countBack() {
        if(this.state.count > 0 && this.props.isModalVisible){
            this.state.timer=
                window.setTimeout( () => {
                this.countOne();
                this.countBack();
            }, this.state.sleepTime)
        } else if(this.state.count > 0 && !this.props.isModalVisible){
            window.clearTimeout(this.state.timer);
        } else {
            this.props.onCancel()
        }
    }

    componentDidMount() {
        this.countBack()
    }

    componentWillUnmount() {
        window.clearTimeout(this.state.timer);
    }

    render(){
        return (
            <div className="takingContainer">
                    <div className="timer_info">
                        <div className="info_text">
                            <img src={require('./image/5_4.png')} alt=""/>
                            完成，回首页（{this.state.timer}s）</div>
                    </div>
                    <Header />
                    <Info />
            </div>
        );
    }
}