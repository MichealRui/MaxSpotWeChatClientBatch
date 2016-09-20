'use strict';

require ('./index.css');
import React from 'react';

export default class UserResource extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<ul className="userResource">
				{
					props.userResource.map((resource, index)=>{
						if(resource.type=='reward'){
							return (
								<li className='resource font14'>
									<p><span className='font22'>{resource.count}</span>分</p>
									<p>我的积分</p>
								</li>
							);
						}else if(resource.type=='coupon'){
							return (
								<li className='resource font14'>
									<p><span className='font22'>{resource.count}</span>张</p>
									<p>可用优惠券</p>
								</li>
							);
						}
					})
				}
			</ul>
		);
	}
}