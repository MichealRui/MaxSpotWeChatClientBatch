'use strict';

import React, { Component } from 'react';
import CommentItem from '../CommentItem/CommentItem';
require ('./index.css');

export default class ProductComment extends Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props.productComment;
		return (
			<div className="commentContainer">
				<div className="commentTitle font14">
					<span className='fa fa commentIcon font20'></span>
					商品评价
					<p className='more'>
						<span className='commentCount'>查看全部{props.commentCount}条评论</span>
						<span className='fa fa-angle-right orderDetailArrow font28'></span>
					</p>
				</div>
				<ul className="commentList">
					{
						props.hotComments.map((comment, index)=>{
							return <CommentItem key={index} {...comment} />;
						})
					}
				</ul>
			</div>
		);
	}
}