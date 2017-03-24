"use strict";
import React from 'react';
import Button from '../../../components/CommoonComponents/Button/Button'
import mock from '../AfterPayFooter/AfterPayFooterData'
require('./index.css')
export default class AfterPayHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentKey : 1
        }
    }

    onButtonClick(){
        console.log("this");
    }

    alreadyOut(){
        //已出货 button
        //如果两批货，则跳转到下一批已出货
        let currentKey = this.state.currentKey;
        let nextKey = currentKey + 1;
        if(nextKey < mock.length){
            this.setState({
                currentKey : nextKey
            });
        }else{
            this.onButtonClick();
        }

    }

    render(){
        const ORDER_NORMAL = 1; //出货完成  绿色对勾 fa-check
        const ORDER_WRONG = 2 ; //出货异常  红色叹号 fa-exclamation
        const ORDER_WILLOUT = 0 ; //尚未出货
        const ORDER_ALREADYOUT = 3; //已经出货
        const ORDER_OUTING = 4; //正在出货 红色三个点 fa-ellipsis-h
        let props = this.props;
        let html = '';
        let circleClass = '';
        let len = mock.length;
        let lineText = '';
        if(mock.length > 1){
            switch (mock[this.state.currentKey].status){
                case ORDER_OUTING:
                    html = (
                        <div>
                            <div className="font20">第<span className="number-text font30">{mock[this.state.currentKey].id}</span>批商品</div>
                            <div className="color999 font12 subinfo">正在出货</div>
                        </div>
                    );
                    circleClass = 'circles-shadow';
                    lineText = (
                        <div className="insert-text lineh05 font12">
                            <p>您共有{len }批商品</p>
                            <p>请耐心等候，完成前不要离开机器</p>
                        </div>

                    );
                    break;
                case ORDER_WRONG:
                    html = (
                        <div>
                            <div className="font20">第<span className="number-text font30">{mock[this.state.currentKey].id}</span>批商品</div>
                            <div className="color999 font12 subinfo">出货异常</div>
                            <Button buttonClassName="buttons backcolorfca609 font14" buttonClick={this.onButtonClick.bind(this)} buttonText="详情"/>
                        </div>
                    );
                    circleClass = 'circles-shadow';
                    lineText = (
                        <div className="insert-text lineh05 font12">
                            <p>您共有{len}批商品</p>
                            <p>请耐心等候，完成前不要离开机器</p>
                        </div>

                    );
                    break;
                case ORDER_NORMAL:
                    html = (
                        <div>
                            <div className="font20">第<span className="number-text font30">{mock[this.state.currentKey].id}</span>批商品</div>
                            <div className="color999 font12 subinfo">可以取货了</div>
                            <Button buttonClassName="buttons backcolorff7860 font14" buttonClick={this.alreadyOut.bind(this)} buttonText="已取货"/>
                        </div>
                    );
                    lineText = (
                        <div className="insert-text lineh05 font12">
                            <p>您共有{len }批商品</p>
                            <p>请耐心等候，完成前不要离开机器</p>
                        </div>

                    );
                    break;
                case ORDER_ALREADYOUT:
                    if(this.state.currentKey == mock.length - 1){
                        html = (
                            <div>
                                <div className="color000 texts font20">全部取货成功</div>
                                <Button buttonClassName="texts buttons backcolorff7860 font14" buttonClick={this.alreadyOut.bind(this)} buttonText="完成"/>
                            </div>
                        );
                        lineText = (
                            <div className="insert-text lineh05 font12">
                                <p>您共有{len}批商品</p>
                                <p>已经全部取货成功，感谢您的使用！</p>
                            </div>

                        );
                    }
                    break;

            }
        }else{
            switch (mock[0].status){
                case ORDER_NORMAL:
                    html = (
                        <div>
                            <div className="color000 texts font20">可以取货了</div>
                            <Button buttonClassName="texts buttons backcolorff7860 font14" buttonClick={this.alreadyOut.bind(this)} buttonText="已出货"/>
                        </div>
                    );
                    lineText = (
                        <div className="insert-text lineh4 font12">
                            <p>请耐心等候，完成前不要离开机器</p>
                        </div>
                    );
                    break;
                case ORDER_WRONG:
                    html = (
                        <div>
                            <div className="colorfca609 texts font20">出货异常</div>
                            <Button buttonClassName="texts buttons backcolorfca609 font14" buttonClick={this.onButtonClick.bind(this)} buttonText="详情"/>
                        </div>
                    );
                    circleClass = 'circles-shadow';
                    lineText = (
                        <div className="insert-text lineh4 font12">
                            <p>请耐心等候，完成前不要离开机器</p>
                        </div>
                    );
                    break;
                case ORDER_ALREADYOUT :
                    html = (
                        <div>
                            <div className="color000 texts font20">全部取货成功</div>
                            <Button buttonClassName="texts buttons backcolorff7860 font14" buttonClick={this.alreadyOut.bind(this)} buttonText="完成"/>
                        </div>
                    );
                    lineText = (
                        <div className="insert-text lineh4 font12">
                            <p>已经全部取货成功，感谢您的使用!</p>
                        </div>
                    );
                    break;
                case ORDER_OUTING :
                    html = (
                        <div>
                            <div className="color000 font20">正在出货...</div>
                        </div>
                    );
                    circleClass = 'circles-shadow';
                    lineText = (
                        <div className="insert-text lineh4 font12">
                            <p>请耐心等候，完成前不要离开机器</p>
                        </div>
                    );
                    break;
            }
        }
        return(
            <div className="afterPayHeader">
                <div className={"rotate-circle "+circleClass}>
                    <i></i>
                </div>
                <div className="circle-insert">
                    <div className="insert-html">
                        {html}
                    </div>
                </div>
                {lineText}
            </div>
        )
    }
}