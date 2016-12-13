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
            count:5
        }
    }

    countOne(){
        this.setState({
            count: this.state.count - 1
        });
    }

    countBack() {
        if(this.state.count > 0){
            window.setTimeout( () => {
                this.countOne();
                this.countBack();
            }, this.state.sleepTime)
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