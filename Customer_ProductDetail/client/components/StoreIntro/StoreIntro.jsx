'use strict';

require ('./index.css');
import React from 'react';

export default class StoreIntro extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<div className='storeIntro'>
                {
                    props.storeImg.length == 0 ?
                        <img src={require('./images/default.png')} className='storeImg'/> :
                        <img src={props.storeImg} className='storeImg'/>
                }

				<div className="storeIntroInfo">
					<h1 className='font14'>{props.storeName}</h1>
					<p className='font12'>{props.storeIntro}</p>
				</div>
				<span className='fa fa-angle-right orderDetailArrow font28'></span>
			</div>
		);
	}
}