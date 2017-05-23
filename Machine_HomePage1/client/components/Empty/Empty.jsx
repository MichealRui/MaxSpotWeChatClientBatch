import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')


export default class Header extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        let props = this.props;
        return (
            <div className="item_empty">
                <img src={require('./image/empty.png')} alt=""/>
                <div className="text">
                    <p className="font28">购物车是空的哦~</p>
                    <p className="font24">赶紧选购商品吧！！</p>
            </div>
            </div>
        )
    }
}