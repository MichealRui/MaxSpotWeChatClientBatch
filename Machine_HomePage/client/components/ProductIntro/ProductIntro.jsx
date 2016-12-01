'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')
export default class ProductIntro extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="introWrapper">
                <div className="header">
                    <div className="productInfo">
                        <h1>Lipo</h1>
                        <span>蛋奶酥脆面包干</span>
                        <span>500g 8枚</span>
                    </div>
                    <span className="price">
                        {'¥' + 36}
                    </span>
                    <div className="cart"></div>
                </div>
                <div className="promote">

                </div>
                <div className="brandInfo">
                    <img className="brandLogo"/>
                    <p className="brandStory"></p>
                </div>
                <div className="guarantee"></div>
            </div>
        )
    }
}