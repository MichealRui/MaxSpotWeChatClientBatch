'use strict';
import React from 'react'
require('./index.css');

export default class FetchSkuButton extends React.Component {
    constructor(props) {
        super(props)
    }
    

    
    render() {
        return (
            <div className="fetchsku">
                <p className="queicon font32">?</p>
                <p className="text font22">如何取货</p>
            </div>
        )
    }
}