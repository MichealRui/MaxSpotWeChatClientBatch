import React from 'react';
import Cart from '../Cart/Cart'
require('./index.css');


export default class Header extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        let props = this.props;
        return (
            <div className="headerContainer clearfix">
                <img src={require('./images/active_return.png')} className="logo"/>
                <img src={require('./images/active_logo.png')} className="logo"/>

                <span className="location font24">
                    <img src={require('./images/add.png')} alt=""/>
                    国贸三期B1芒果
                </span>
                <span className="login hide">
                    <img src={require('./images/local_crown.png')} className="login_logo"/>
                    <span className="font24">VIP登陆</span>
                    </span>
                <span className="" onClick={props.cartClick()}>
                    <Cart count={props.count} Style={{right:'60px'}} totalPrice={props.totalPrice || 0}/>
                </span>

            </div>
        )
    }
}