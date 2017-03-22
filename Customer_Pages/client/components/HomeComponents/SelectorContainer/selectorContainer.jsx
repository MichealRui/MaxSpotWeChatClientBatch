'use strict';
import React from 'react'
import Selector from '../Selector'
import icon_all from './image/icon_1.png'
require('./index.css');

export default class SelectorContainer extends React.Component {
    constructor(props) {
        super (props);
        this.state={
            activated:[]
        };
        this._onclick = e => {
            let key = e.target.getAttribute("data-key");
            key ? this.props.onSelectClick(key) : false;
        }
    }

    render() {
        let keys = this.props.selectorData;
        let tags = keys.map((selector, index) => {
            return (
                <Selector
                    key={index}
                    data={selector}
                    onclick={(k) => this.props.onSelectClick(k)}
                    isActivated={selector.key == this.props.currentKey}
                />
            )
        });

        return (
            <ul className="selectorContainer" onClick={this._onclick.bind(this)}>
                {tags}
            </ul>
        )
    }
}

SelectorContainer.PropTypes = {
    selectorData:React.PropTypes.Array
};

SelectorContainer.defaultProps = {
    selectorData:[]
};