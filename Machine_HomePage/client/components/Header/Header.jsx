import React from 'react';
import Cart from '../Cart/Cart'
import FetchSku from '../FetchSkuButton/FetchSkuButton'
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
                    华贸商业街
                </span>
                <span className="login hide">
                    <img src={require('./images/local_crown.png')} className="login_logo"/>
                    <span className="font24">VIP登陆</span>
                    </span>
                <span className="" onClick={props.cartClick()}>
                    <Cart count={props.count} cartStyle={{right:'200px'}} totalPrice={props.totalPrice || 0}/>
                </span>
                <span onClick={props.fetchSkuClick()}>
                    <FetchSku />
                </span>
                <span className="">
                    <div className="contact">
                        <img src={require("./images/trans_icon.png")} />
                        <div className="text font22">
                            <p className="font22">客服电话</p>
                            <p className="font26">15101069751</p>
                        </div>
                    </div>
                </span>
            </div>
        )
    }
}