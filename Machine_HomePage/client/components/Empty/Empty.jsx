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
                    <p className="font42">购物车是空的哦~</p>
                    <div className="button font30">去首页逛逛</div>
                </div>
            </div>
        )
    }
}