'use strict';

require ('./index.css');
import React from 'react';

export default class UserProfile extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<div className='userProfile'>
				<img src={props.userImg} className='bgImg blur'/>
				<div className='wrapper'>
					<img src={props.userImg} className='userImg' />
					<p className='userName font18'>{props.userName}</p>
				</div>
			</div>
		);
	}
}