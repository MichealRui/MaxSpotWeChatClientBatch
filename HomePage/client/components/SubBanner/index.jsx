'use strict';
import React from 'react';
require ('./index.css');

export default class SubBanner extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let props = this.props.data
        return (
            <a href={props.bannerDist} className='bannerContainer'>
                <img width="100%" height="200" src='http://192.168.20.225:8080/client/components/SubBanner/images/homeMade.jpg' className='bannerImg'/>
            </a>
        )
    }
}