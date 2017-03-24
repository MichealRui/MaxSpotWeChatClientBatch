"use strict";
import React from 'react';
require('./index.css');

export default class OrderDescription extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        return (
            <div className={"orderDescription " +(props.important ? 'black' : '')}>
                {this.props.contents.map ((content, index) => {
                    return (
                        <div className="content font14" key={index}>
                            {content}
                        </div>
                    )
                })}
            </div>
        )
    }
}