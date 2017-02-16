'use strict';

require('./index.css');
import React from 'react';

export default class BrandHeader extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<div className="">
				<div className="header">
					<div className="title clearfix">
						<span><img src={ENV.domain + props.brandInfo.imagePath} /></span>
						<span>
						<p className="font16">{props.brandInfo.name}</p>
							{/*<p className="font12">共有{item.follows}人关注</p>*/}
					</span>
						{/*<span className="button font16">关注</span>*/}
					</div>
				</div>
				<div className="storeinfo"><p className="font12">{props.brandInfo.story}</p></div>
			</div>


		);
	}
}
BrandHeader.PropTypes = {
	brandInfo : React.PropTypes.object
};
BrandHeader.defaultProps = {
	brandInfo : {
		imagePath : '',
		name : '',
		story : ''
	}
}


