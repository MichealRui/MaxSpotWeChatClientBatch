import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')


export default class Header extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <div className="headerContainer">
                <div className="fl">
                    <img src="" className="logo"/>
                    <span className="location">

                    </span>
                </div>
                <div className="fr">
                    <span className="login"></span>
                    <span className="cart"></span>
                </div>
            </div>
        )
    }
}