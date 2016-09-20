'use strict';
import React from 'react';

export default class SubBanner extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let props = this.props.data
        return (
            <a href={props.bannerDist}>
                <img width="100%" height="200" src={props.imgPath}/>
            </a>
        )
    }
}