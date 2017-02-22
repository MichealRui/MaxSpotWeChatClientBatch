'use strict';

import React from 'react';
import {Link} from 'react-router'
require ('./index.css');

export default class TopBar extends React.Component {
    constructor(props){
        super(props);
    }

    
    render(){
        return(
            <Link to="/">
            <div className='headContainer'>
                <img src={require('./images/logo.png')} className='logo'/>
                <span ref='searchContinue' className='searchContinue'
                    >再去逛逛</span>
            </div>
            </Link>
        );
	}
}
