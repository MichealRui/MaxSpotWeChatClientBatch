'use strict';

import React from 'react';
require('./index.css');
export default class ProductControl extends React.Component {
	constructor(props) {
	    super(props);
	}

	valueChange(event){
		this.setState({value:event.target.value});
		//console.log(event.target.value);
	}

	render(){
		const { decreaseItem, increaseItem, deleteItem } = this.props;
		const item = this.props.data;
		return (
			<div className="productControl">
				<p className="productCost"><em>{item.productCost}</em>元</p>
				<div className="inputWrapper">
					<span className="button reduceButton" onClick={() => decreaseItem(item)}>-</span>
					<input className="inputText" type='text' value={item.count} onChange={this.valueChange.bind(this)}/>
					<span className="button addButton" onClick={() => increaseItem(item)}>+</span>
					<span className="button deleteButton fa fa-trash-o" onClick={() => deleteItem(item)}></span>
				</div>
			</div>
		);
	}
}