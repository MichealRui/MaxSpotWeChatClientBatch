'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class PaySuccHeader extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {

        return (
            <div className="PaySuccHeader">
                <img src={require('./image/bg.png')} className="bg" alt=""/>
                <div className="box">
                    <img className="smile" src={require('./image/5_5.png')} alt=""/>
                    <div className="text">
                        <p className="font60">支付成功，您现在可以取货了。</p>
                    </div>
                </div>
            </div>

        )
    }
}


