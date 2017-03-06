"use strict";
import React from 'react';
require('./index.css')
export default class AfterPayLine extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const ORDER_NORMAL = 1; //出货完成  绿色对勾 fa-check
        const ORDER_WRONG = 2 ; //出货异常  红色叹号 fa-exclamation
        const ORDER_WILLOUT = 0 ; //尚未出货
        const ORDER_ALREADYOUT = 3; //已经出货
        const ORDER_OUTING = 4; //正在出货 红色三个点 fa-ellipsis-h
        let props = this.props;
        let status = props.lineStatus;
        let chosen = props.chosen;
        let lineClass = props.lineClass;
        let batch = props.batch;
        let circleClass = '';
        let batchClass = '';
        switch (status){
            case ORDER_NORMAL :
                circleClass = 'fa-check big backcolor2fd03d';
                batchClass = 'color2fd03d';
                break;
            case ORDER_WRONG :
                circleClass = 'fa-exclamation big backcolorff7860';
                batchClass = 'colorff7860';
                break;
            case ORDER_ALREADYOUT :
                circleClass = 'backcolor2fd03d';
                batchClass = 'border color2fd03d bordercolor2fd03d'
                break;
            case ORDER_OUTING :
                circleClass = 'fa-ellipsis-h big backcolorff7860';
                batchClass = 'border colorff7860 bordercolorff7860'
                break;
            case ORDER_WILLOUT :
                circleClass = '';
                batchClass = 'border';
                break;

        }
        return(
            <div className={"afterPayLine font16 fa " + lineClass + (status > ORDER_WILLOUT ? ' bordercolor2fd03d' : '')}>
                <div className={"circle " + circleClass } onClick={this.props.onButtonClick}>
                </div>
                <div className={"batch font14 " + batchClass}>第{batch}批</div>
            </div>
        )
    }
}

AfterPayLine.PropTypes = {
    lineStatus : React.PropTypes.number,
    chosen : React.PropTypes.bool,
    lineClass : React.PropTypes.string,
    batch : React.PropTypes.number
};
AfterPayLine.defaultProps = {
    lineStatus : 0,
    chosen : false,
    lineClass : '',
    batch : 0
}