'use static';

import React from 'react';
require ('./index.css');

export default class TopBar extends React.Component {
    constructor(props){
        super(props);
    }

    searchClick(){
        // let searchClick = this.props.searchClick;
        // searchClick();
        window.location.href = ENV.domain
    }
    
    render(){
        const props = this.props;
        return(
            <div className='headContainer'>
                <img src={require('./images/MaxSpot.png')} className='logo'/>
                <span ref='searchContinue' className='searchContinue'
                      onClick={this.searchClick.bind(this)}>再去逛逛</span>
            </div>
        );
	}
}