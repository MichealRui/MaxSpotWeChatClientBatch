"use strict";

import React from 'react';
require('./index.css');

export default class CountControl extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showTips : false,
            cartTimer: null,
            addSucc:false
        }
        this.__changing = false;
        this.__count = this.props.item.count
    }

    dec() {
        if(!this.__changing && this.props.item.count > 1) {
            this.props.decrease(
                this.props.item
            );
            this.__changing = true
        }

        // if(this.props.item.count < 2){
        //
        // }else{
        //     this.props.decrease(
        //         this.props.item
        //     )
        // }


    }

    componentWillReceiveProps(nextProps){
        if(nextProps.item.count != this.props.item.count){
            this.__changing = false;
        }
    }

    add() {
        if(this.props.item.count >= this.props.item.quantity){
            this.setState({
                showTips : true,
                addSucc : false
            });
            this.timeup();
            return false;
        }else{
            this.props.addItem(
                this.props.item
            );
            this.setState({
                addSucc : true
            });
            this.timeup();
        }
        // this.props.addItem(
        //     this.props.item
        // );
        // this.setState({
        //     addSucc : true
        // });
        // this.timeup();


    }

    timeup(){
        this.state.cartTimer = (
            window.setTimeout( () => {
                this.setState({
                    showTips : false,
                    addSucc : false
                })
            }, 1000)
        )
    }

    render(){
        let props = this.props.item;
        return (
            <div className="countControl">
                <a className={"simble font16 del " + (props.count <= 1 ? 'color999 ' : 'color333 ') + (this.props.fontClass)} disabled={props.count < 2} onClick={()=>this.dec.bind(this)()} >_</a>
                <span className={"count font14 " + this.props.countFontSize}>{props.count}</span>
                <a className={"simble font16  " + (props.quantity <= props.count ? 'color999 ' : 'color333 ') + (this.props.fontClass)}  onClick={()=>this.add.bind(this)()} >+</a>
                {
                    this.props.countClass=='shoppingCartCount' && props.count >= props.quantity ? <div className={"noQuantity " + this.props.countClass + (this.state.showTips ? " ":" hide")} >
                        <span className="triangle-up"></span>
                        <span className="font20 noQuantitys">{"剩余库存 " + props.quantity + " 件"}</span>
                    </div>:''
                }
                {
                    this.props.countClass=='skuContainerCount' && props.count >= props.quantity ? <div className={"noQuantity " + this.props.countClass + (this.state.showTips ? " ":" hide")} >
                        <span className="font24 noQuans">{"剩余库存 " + props.quantity + " 件"}</span>
                    </div>:''
                }
                {
                    this.props.countClass=='skuContainerCount' && this.state.addSucc ? <div className={"noQuantity colorred " + this.props.countClass + (this.state.addSucc ? " ":" hide")} >
                        <span className="font24 noQuans">添加成功</span>
                    </div>:''
                }
            </div>
        )
    }
}