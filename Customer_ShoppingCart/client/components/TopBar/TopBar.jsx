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
            <div className='headContainer'>
                <img src={require('./images/logo.png')} className='logo'/>
                <span ref='searchContinue' className='searchContinue'
                      onClick={this.searchClick.bind(this)}>再去逛逛</span>
            </div>
        );
	}
}