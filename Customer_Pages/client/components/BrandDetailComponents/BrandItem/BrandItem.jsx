'use strict';
import React from 'react';
import Item from '../../CommoonComponents/Item/index'
import AddButton from '../../CommoonComponents/AddButton/addButton'
require('./index.css');


export default class BrandItem extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		let store = {
			id : this.props.storeId
		};
		let item_html = props.items.map(
			(item,index) => {
				return (
					<Item item={item} key={index} isSliderItem={false} storeid={this.props.storeId}>
						<AddButton
							item = {item}
							click = {this.props.addToCart}
							store = {store}
						/>
					</Item>
				)
			}
		)
		return (
			<div className="iteminfo">
				{item_html}
			</div>
		);
	}
}
BrandItem.PropTypes = {
	items : React.PropTypes.array,
};
BrandItem.defaultProps = {
	items : [],
}


