'use static';

import React from 'react';
//require ('./images/MaxSpot.png');
require ('./index.css');

export default class TopBar extends React.Component {
    constructor(props){
        super(props);
    }

    searchClick(){
        let searchClick = this.props.searchClick;
        searchClick();
    }
    
    render(){
        const props = this.props;
        return(
            <div className='headContainer'>
                <img src='./images/MaxSpot.png' className='logo'/>
                <span ref='searchContinue' className='searchContinue'
                      onClick={this.searchClick.bind(this)}>再去逛逛</span>
            </div>
        );
	}
}