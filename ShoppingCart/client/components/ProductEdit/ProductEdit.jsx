'use strict';

import React from 'react';
import ProductInfo from '../ProductItem/ProductInfo/ProductInfo';
require('./index.css');

export default class ProductEdit extends React.Component {
	constructor(props){
		super(props);
		this.state={
			checked:false
		}
		this.checkboxChange = this.checkboxChange.bind(this);
	}

	checkboxChange(event){
		this.setState({
			checked:!this.state.checked
		});
	}

	render(){
		let props = this.props;
		let labelClassName = this.state.checked? 'fa fa-check checkLabel font14':'checkLabel font14';
		return (
			<div className='editContainer'>
				<div className="editTitle">
		            <label className={labelClassName} onClick={this.checkboxChange}>
		            </label>
		            <span className='machineAddress font14'>
		              {props.machineAddress}
		            </span>
		            <span className='editButton font14' onClick={() => console.log('edit')}>
		            	编辑
		            </span>
				</div>
				<ul>
					{
						props.productList.map((product, index)=>{
							return (
									<li key={index} className='editItem font14'>
										<ProductInfo data={product} />
										<span className='count'>{product.count}</span>
										<span className='icon'>X</span>
										<span className='price'>{product.price}元</span>
									</li>
								);
							})
					}
				</ul>
			</div>
		);
	}
}