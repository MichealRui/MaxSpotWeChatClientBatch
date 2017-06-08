'use strict';
import React from 'react'
require('./index.css')
export default class Loading extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <div className="loading">
                    <img src={require('./image/loading.gif')} alt=""/>
                    <p className="text font34">
                        <span> 正在生成订单……</span>
                    </p>
                </div>
            </div>
        )
    }
}