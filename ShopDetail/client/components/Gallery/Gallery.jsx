'use strict';
import React from 'react';
require('./index.css');

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul className="imageContainer">
                <li className="shopImg">
                    <img className="fl" src={require('./images/shop.jpg')}/>
                    <img className="fr" src={require('./images/shop.jpg')}/>
                </li>
                <li className="shopImg">
                    <img className="fl" src={require('./images/shop.jpg')}/>
                    <img className="fr" src={require('./images/shop.jpg')}/>
                </li>
                <li className="shopImg">
                    <img className="fl" src={require('./images/shop.jpg')}/>
                    <img className="fr" src={require('./images/shop.jpg')}/>
                </li>
            </ul>

        )
    }
}