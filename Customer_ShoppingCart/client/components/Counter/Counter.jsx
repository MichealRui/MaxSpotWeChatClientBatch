'use strict';
import React from 'react';
require ('./index.css');

export default class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            remainTime: this.props.remainTime,
            showTime: ''
        }
    }

    countTime(time) {
        let seconds = time % 60;
        let calculatedTime = (time-seconds) / 60 + ":" + seconds
        this.setState({
            showTime: calculatedTime
        })
    }

    timelyChangeCount(t) {
        if(t>0) {
            setTimeout(
                () => {
                    this.countTime(t);
                    this.timelyChangeCount(t-1)
                }, 1000);
        } else {
            this.props.timeUpCallback()
        }

    }

    componentWillReceiveProps(props) {
        console.log(props)
        this.state = {
            remainTime: props.remainTime,
            showTime: this.countTime(props.remainTime)
        }
        this.timelyChangeCount(this.state.remainTime)
    }

    render() {
        return (
            <span>{this.state.showTime}</span>
        )
    }
}