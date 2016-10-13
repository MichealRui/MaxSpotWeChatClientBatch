'use strict';

require('./index.css');
import React from 'react';

export default class Button extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
        let disabledStyle = props.disabled? ' disabled' : '';
		return (
		    <div className={'bigButton font16 '+props.buttonClassName + disabledStyle}
                 onClick={props.buttonClick}
                 disabled={props.disabled}
            >
				{props.buttonText}
			</div>
		);
	}
}