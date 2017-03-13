'use strict';

require('./index.css');
import React from 'react';

export default class ProductDetailTitle extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		console.log("titleData")
		console.log(props.titleData);
		return (
			<div className='productDetailTitle'>
				<div className="titleContent">
					<h2 className='font12'>{props.titleData.brandName}</h2>
					<h1 className='font14'>{props.titleData.name}</h1>
					<p className='font12'>{props.titleData.productInfo}</p>
				</div>
				{/*<span className="fa fa-heart font24 icon"></span>*/}
			</div>
		);
	}
}


ProductDetailTitle.propTypes = {
	titleData:React.PropTypes.object,
};

ProductDetailTitle.defaultProps = {
	titleData : {
		brandName : '',
		name:'',
		productInfo:''
	}
};
