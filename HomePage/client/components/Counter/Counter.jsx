'use strict';
import React from 'react';
require ('./index.css');

export default class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            remainTime: this.props.remainTime
        }
    }

    countTime(time) {
        let seconds = time % 60;
        let calculatedTime = (time-seconds) / 60 + ":" + seconds
        this.setState({
            remainTime: calculatedTime
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
            console.log("!!!!!!! time up")
            console.log(this.props)
            this.props.clearCart()
        }

    }

    componentDidMount() {
        this.timelyChangeCount(this.state.remainTime)
    }

    render() {
        return (
            <div className='lastTime'>
                <div>
                    <p className='font7'>剩余时间</p>
                    <p>{this.state.remainTime}</p>
                </div>
            </div>
        )
    }
}