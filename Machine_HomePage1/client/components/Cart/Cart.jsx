import React from 'react';
require('./index.css')


export default class Cart extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            cartActive:'',
            cartTimer : null,
            cartLock : false
        }
    }

    componentWillReceiveProps(nextProps){
        // console.log(nextProps);
        if((nextProps.count > this.props.count) && nextProps.count != 0 && !this.state.cartLock){
            this.setState({
                cartActive:'active',
                cartLock : true
            });
            this.state.cartTimer = (
                window.setTimeout( () => {
                    this.setState({
                        cartActive:'',
                        cartLock : false
                    })
                }, 1000)
            )
        }
    }


    showQrCode(){
        if(this.props.totalPrice <= 0){
            return false;
        }else{
            this.props.submit();
            this.props.cartClick();
        }
    }

    /*<div className={"cart  " + this.state.cartActive} style={style}>
     <span className="bag"><img src={require('./images/cart.png')} alt=""/></span>
     <span className={"shopping-count-bg"}></span>
     <span className={"shopping-count font20 "}>{props.count || 0}</span>
     <span className="fa fa-cny font20"></span>
     <span className="sumprice font36">{props.totalPrice || 0}</span>
     </div>*/
    render() {
        let props = this.props;
        let style = this.props.cartStyle ? this.props.cartStyle : {}
        return (
            <div className="shoppingCart">
                <div className="cart">
                    <img src={require("./images/cart.png")} />
                        <span className="countBg"></span>
                        <span className="count font20">{props.count || 0}</span>
                        <div className="money font40"><span className="font18">￥</span>{props.totalPrice || 0}</div>
                </div>
                <div className="balance" onClick={()=>this.props.click()}>
                    立即结算
                </div>
            </div>
        )
    }
}