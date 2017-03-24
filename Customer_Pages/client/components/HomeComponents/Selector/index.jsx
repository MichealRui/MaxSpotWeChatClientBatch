'use strict';
import React from 'react';
require ('./index.css');

export default class Selector extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let props = this.props.data;
        return (
            <li className={ "selector"+ " J_" + props.key }
                onClick={() => this.props.onclick(props.key,props.subSelector[0])}>
                <div className="itemIcon">
                    <img src={props.image} alt=""/>
                    <div className={"itemName font14 " + (this.props.isActivated ? 'activated': '') }>{props.content}</div>
                </div>
                {/*<div className={"itemIcon font34 fa " + (this.props.isActivated ? 'activated': '') }*/}
                     {/*data-key={props.key}*/}
                {/*>*/}
                    {/*<img src={props.image} alt=""/>*/}
                {/*</div>*/}
                {/*<div className='itemName font14'>{props.content}</div>*/}
                {/*<span className={'triangle ' + (this.props.isActivated ? 'activated': '')}></span>*/}
            </li>
        )
    }
}