'use strict';

import React from 'react';
import ProductInfo from '../ProductItem/ProductInfo/ProductInfo';
import Button from '../Button/Button';
require ('./index.css');

export default class Repurchase extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<div className="repurchase">
				<div className="repurchaseTitle">
					<span className='fa fa-bell icon font20'>
					</span>
					<span className="content font14">
						你还可以重新购买以下商品
					</span>
				</div>
				<ul>
					{
						props.productList.map((product, index)=>{
							return (
									<li key={index} className='repurchaseItem font14'>
										<ProductInfo data={product} />
										<span className="deleteButton fa fa-trash-o font24" onClick={() => deleteItem(item)}></span>
										<Button buttonClassName='repurchaseButton' buttonText='重新购买' buttonClick={()=>console.log('repurchase')}/>
										
									</li>
								);
							})
					}
				</ul>
			</div>
		);
	}
}