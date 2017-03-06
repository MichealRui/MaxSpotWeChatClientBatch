'use strict';

require ('./index.css');
import React from 'react';

export default class OrderDescription extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        return (
            <div className={"context " + (props.important ? 'black' : '')}>
                {this.props.contents.map ((content, index) => {
                    return (
                        <div className="content font14" key={index}>
                            {content}
                        </div>
                    )
                })}
            </div>
        );
    }
}