import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')


export default class Header extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <div className="headerContainer clearfix">
                <img src={require('./images/local_logo.png')} className="logo"/>
                <span className="location font24">
                    国贸三期 芒果店
                </span>
                <span className="login">
                    <img src={require('./images/local_crown.png')} className="login_logo"/>
                    <span className="font24">VIP登陆</span>
                    </span>
                <span className="cart">
                    <span className="bag"></span>
                    <span className="shopping-count"></span>
                    <span className="fa fa-cny font20"></span>
                    <span className="sumprice font20">50</span>
                </span>
            </div>
        )
    }
}