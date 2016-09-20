'use strict';

require ('./index.css');
import React from 'react';

export default class UndoItem extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<ul className="undoItems">
				{
					props.undoItems.map((item, index)=>{
						let countClassName = item.count>0?'count font12 show':'count font12 hide';
						return (
								<li className='item'>
									<p className={'fa icon font28 '+item.icon}>
										<span className={countClassName}>{item.count}</span>
									</p>
									<p className='name font12'>{item.name}</p>
								</li>
							);
					})
				}
			</ul>
		);
	}
}