'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class PaySuccBottom extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {

        return (
            <div className="PaySuccBottom">
                <img src={require('./image/code.png')} alt=""/>
                <div className="font30">
                    <p> 需要帮助请通过我们的微信公众账号与我们联系
                    </p>
                    <p>怪兽家公众号：gsjbld</p>
                </div>
            </div>

        )
    }
}


