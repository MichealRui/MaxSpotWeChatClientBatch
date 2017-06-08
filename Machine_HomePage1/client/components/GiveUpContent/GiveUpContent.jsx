'use strict';
import React from 'react'
require('./index.css');

export default class GiveUpContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="remindContent giveUpContent">
                <div className="remindText font40">确定放弃支付吗？</div>
                <div className="remindBtn font32">
                    <div className="btnTag btnLetf " onClick={()=>this.props.onCancel()}>继续支付</div>
                    <div className="btnTag btnRight " onClick={()=>this.props.clearCart()}>放弃支付</div>
                </div>
            </div>
        )
    }
}