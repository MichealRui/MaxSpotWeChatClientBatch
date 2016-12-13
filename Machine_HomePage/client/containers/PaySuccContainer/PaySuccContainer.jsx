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
        console.log(this.state.count);
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

    render(){
        return (
            <div className="takingContainer">
                    <Header />
                    <Info />
            </div>
        );
    }
}