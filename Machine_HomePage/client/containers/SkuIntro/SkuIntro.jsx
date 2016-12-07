'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class skuIntro extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (
            <div className="skuIntro">
                <div className="sub_benefit">
                    <span className="square_border font27 ">8折</span>
                    <span className="square_border font27 ">满额减</span>
                    <span className="ovals_border  font23">00:29 促销结束</span>
                </div>
                <div className="sub_compaign  font26">
                    日本销量最好的面包干！蝉联销售榜10年
                </div>
            </div>

        )
    }
}


