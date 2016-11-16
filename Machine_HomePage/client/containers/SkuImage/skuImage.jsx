'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class skuImage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("inin");
        return (
            <div className="skuImage item_wrapper fl">
                <div className="show_img"><img src="./images/product-1.jpg" /></div>
                <div className="img_wrapper clearfix">
                    <div className="img_item img_border">
                        <img src="./images/product-1.jpg" />
                    </div>
                    <div className="img_item img_border">
                        <img src="./images/product-1.jpg" />
                    </div>
                    <div className="img_item img_border">
                        <img src="./images/product-1.jpg" />
                    </div>
                    <div className="img_item img_border">
                        <img src="./images/product-1.jpg" />
                    </div>
                </div>
            </div>

        )
    }
}


