'use strict';

import React from 'react';
require ('./index.css');

export default class TopBar extends React.Component {
    constructor(props){
        super(props);
    }

    searchClick(){
        window.location.href = ENV.domain + '/buyer_home/index.html'
    }
    
    render(){
        const props = this.props;
        return(
            <div className='item_empty'>
                <div className="image"><img src={require('./images/empty.png')} className='logo'/></div>
                <div className="text">
                    <p className="font24">购物车是空的哦~</p>
                    <div className="button font24">去逛逛</div>
                </div>

            </div>
        );
	}
}