'use strict';

import React from 'react';
require('./index.css');
export default class ProductControl extends React.Component {
	constructor(props) {
	    super(props);
		this.state = {
			tips_show:true
		}
	}

	valueChange(event){
		this.setState({value:event.target.value});
		//console.log(event.target.value);
	}

	increaseItem(item){

	}

	render(){
		const { decreaseItem, increaseItem, deleteItem } = this.props;
		const item = this.props.data;
		return (
			<div className="productControl">
				{/*<p className="productCost font16"><em className="font18">{item.sellprice}</em>元</p>*/}
				<div className={"inputWrapper clearfix font12 " + (item.err_status == 1 ? 'hideactive' : '')}>
					<span className={"button reduceButton " + (item.count <= 1 ? 'color_ccc' : '')}
                          onClick={() =>decreaseItem(item)}>-</span>
					<input className="inputText" type='text' readOnly value={item.count}
                           onChange={this.valueChange.bind(this)}/>
					<span className={"button addButton " + (item.count >= item.quantity ? 'color_ccc' : '')}
                          onClick={() => increaseItem(item)}>+</span>
					<span className="deleteButton fa fa-trash-o font24"
                          onClick={() => deleteItem(item)}></span>
				</div>
				<div className={"tips font10 "+(item.show_tips ? '':'hide')}><span>{item.err_msg}</span></div>
			</div>
		);
	}
}