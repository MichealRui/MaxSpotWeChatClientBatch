'use strict';
import React from 'react';
require ('./index.css');

export default class SubBanner extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let props = this.props.data;
        return (
            <a href={props.destUrl} className='bannerContainer'>
                {/*<span className='triangle'></span>*/}
                <img width="100%" height="200" src={props.imagePath} className='bannerImg'/>
            </a>
        )
    }
}