import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')


export default class Cart extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        let props = this.props;
        let style = this.props.cartStyle ? this.props.cartStyle : {}
        return (
            <div className="cart" style={style}>
                <span className="bag"><img src={require('./images/cart.png')} alt=""/></span>
                <span className={"shopping-count font20 "+(props.count > 0 ? '' : 'hide')}>{props.count}</span>
                <span className="fa fa-cny font20"></span>
                <span className="sumprice font36">{props.totalPrice || 0}</span>
            </div>
        )
    }
}