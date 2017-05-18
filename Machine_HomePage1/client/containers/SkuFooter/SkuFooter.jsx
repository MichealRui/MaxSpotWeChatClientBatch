'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class skuFooter extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (

            <div>
                <div className="poppupFooter">
                    {
                        this.props.showDetail ?
                            <div className="skuFooter">
                                <div>
                                    <span><img src={require("./image/car.png")} /></span>
                                    100%当地直采
                                </div>
                                <div>
                                    <span><img src={require("./image/check.png")} /></span>
                                    100%海关监控
                                </div>
                                <div>
                                    <span><img src={require("./image/contact.png")} /></span>
                                    100%售后服务
                                </div>
                            </div>
                            : ''
                    }

                </div>
                <div className="poppupFooterHeight"></div>
            </div>
        )

    }

}


