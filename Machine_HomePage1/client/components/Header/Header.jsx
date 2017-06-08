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
            <div className="machineNewHeaderContainer">
                <img src={require('./images/local_logo.png')} className="logo" />
                <div className="location">
                    <img src={require('./images/add.png')} className="locationIcon" />
                    华贸商业街
                </div>
                <div className="contactInfo">
                    <img src={require("./images/trans_icon.png")} />
                    <div>
                        <p>客服电话</p>
                        <p>18601034448</p>
                    </div>
                </div>
                <div className="ruleInfo contactInfo">
                    <img src={require("./images/question_icon.png")} onClick={this.props.fetchSkuClick()}/>
                    <p>如何取货</p>
                </div>
            </div>
        )
    }
}