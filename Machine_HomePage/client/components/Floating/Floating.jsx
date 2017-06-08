'use strict';
import React from 'react'

export default class Floating extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
                <div className={this.props.style}>
                    {this.props.children}
                </div>
        )
    }
}