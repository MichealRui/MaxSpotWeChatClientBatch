'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import product1_img from './images/product-1.jpg';
require('./index.css')

export default class skuImage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="skuImage item_wrapper fl">
                <div className="show_img"><img src={product1_img} /></div>
                <div className="img_wrapper clearfix">
                    <div className="img_item img_border">
                        <img src={product1_img} />
                    </div>
                    <div className="img_item img_border">
                        <img src={product1_img} />
                    </div>
                    <div className="img_item img_border">
                        <img src={product1_img} />
                    </div>
                    <div className="img_item img_border">
                        <img src={product1_img} />
                    </div>
                </div>
            </div>

        )
    }
}


