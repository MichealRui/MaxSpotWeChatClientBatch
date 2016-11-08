import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class ButtonSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul className="buttonSelectorContainer">
                <li className="subSelector activated font30">全部美食</li>
                <li className="subSelector font30">休闲零食</li>
                <li className="subSelector font30">糕点饼干</li>
            </ul>
        )
    }
}