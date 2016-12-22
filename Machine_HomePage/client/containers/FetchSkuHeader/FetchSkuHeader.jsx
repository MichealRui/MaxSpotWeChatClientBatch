'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class FetchSkuHeader extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {

        return (
            <div className="FetchSkuHeader">
                <img src={require('./image/bg.jpg')} className="bg" alt=""/>
                <div className="box">
                    <img className="smile" src={require('./image/5_5.png')} alt=""/>
                    <div className="text">
                        <p className="font48">在手机微信中支付完成后，按照以下步骤取货。</p>
                    </div>
                </div>
            </div>

        )
    }
}


