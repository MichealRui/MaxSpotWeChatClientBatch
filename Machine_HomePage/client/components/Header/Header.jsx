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
            <div className="headerContainer clearfix">
                <img src={require('./images/local_logo.png')} className="logo"/>
                <span className="location font24">
                    <img src={require('./images/add.png')} alt=""/>
                    国贸三期B1芒果
                </span>
                <span className="login hide">
                    <img src={require('./images/local_crown.png')} className="login_logo"/>
                    <span className="font24">VIP登陆</span>
                    </span>
                <span className="cart" onClick={props.cartClick()}>
                    <span className="bag"><img src={require('./images/cart.png')} alt=""/></span>
                    <span className={"shopping-count font20 "+(props.count > 0 ? '' : 'hide')}>{props.count}</span>
                    <span className="fa fa-cny font20"></span>
                    <span className="sumprice font36">{props.totalPrice || 0}</span>
                </span>
            </div>
        )
    }
}