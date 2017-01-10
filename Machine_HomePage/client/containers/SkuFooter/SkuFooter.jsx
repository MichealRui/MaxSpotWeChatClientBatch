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

            <div className="Skufooter">
                <div className="footer_item">
                    <span className="icon"><img src={require('./image/car.png')} alt=""/></span>
                    <span className="font16">100%当地直采</span>
                </div>
                <div className="footer_item">
                    <span className="icon"><img src={require('./image/check.png')} alt=""/></span>
                    <span className="font16">100%海关监控</span>
                </div>
                <div className="footer_item">
                    <span className="icon"><img src={require('./image/contact.png')} alt=""/></span>
                    <span className="font16">100%售后服务</span>
                </div>
            </div>


        )

    }

}


