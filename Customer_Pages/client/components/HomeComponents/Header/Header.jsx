'use strict';
import React, { Component } from 'react';
import {Link} from 'react-router';
require ('./index.css');

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    // onSwitchClick() {
    //     let props = this.props;
    //     window.location.href =
    //         ENV.domain + '/buyer_switchshop/index.html' + '?storeid=' + props.store.id
    // }

    render() {
        let props = this.props;
        return (
            <div className="headerContainer">
                <div className="homeHeader">
                    <img src={require('./images/logo.png')} alt="maxSpot" className="logo"/>
                    <span className='button login fa fa-user font16'></span>
                    <span className='button search fa fa-search font16'></span>
                </div>
                <div className="shopBar">
                    <span className="shopAddress font13">
                        {props.store.name}
                    </span>
                    <Link to={"/switchshop/" + props.store.id}>
                        <span className="switchShopBtn font13">
                            切换站点
                        </span>
                    </Link>
                </div>
            </div>
        );
    }
}
Header.propTypes={
    store:React.PropTypes.object
};
Header.defaultProps={
    store:{
        id:'',
        name:''
    }
};