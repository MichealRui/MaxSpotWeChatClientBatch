'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class PaySuccShow extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {

        return (
            <div className="PaySuccShow">
                <div className="info">
                    <div className="pics">
                        <div className="icon font24">1</div>
                        <img src={require('./image/01.gif')} alt=""/>
                        <p className="font24">点击"立即取货"</p>
                    </div>
                    <div className="pics">
                        <div className="icon font24">2</div>
                        <img src={require('./image/02.gif')} alt=""/>
                        <p className="font24">进入到二维码页面</p>
                    </div>
                    <div className="pics">
                        <div className="icon font24">3</div>
                        <img src={require('./image/03.gif')} alt=""/>
                        <p className="font24">将二维码对准机器扫码</p>
                    </div>
                </div>
            </div>

        )
    }
}


