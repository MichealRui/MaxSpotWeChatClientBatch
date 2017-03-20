'use strict';

require('./index.css');
import React from 'react';
import AddCart from '../AddCart/AddCart'
export default class BannerItem extends React.Component {
	constructor(props){
		super(props);
	}

    getAttr(attributes) {
        let def = <br></br>;
        var atts = def;
        if(attributes && attributes.length > 0) {
            atts = attributes.map(att => {
                if(att.value) {
                    return att.value + att.unit
                } else return ''
            }).reduce((pre, next) =>
            {
                if(pre == '' && next == '') {
                    return ''
                } else {
                    return pre + next + ' '
                }
            }, '')
        }
        if(atts == '') {
            atts=def
        }
        return atts
    }

	getMiddlePic(path) {
		let particial = path.split('.');
		if(particial.length == 2) {
			particial[0] = particial[0] + '_middle'
			return particial.join('.')
		} else {
			path
		}
	}

	toProduct(e) {
		let skunumber = this.props.iteminfo.skuNumber;
		let storeid = this.props.storeId;
		window.location.href = ENV.domain + '/buyer_product/index.html?storeid='
			+ storeid + '&skunumber=' + skunumber;
	}

	render(){
		let props = this.props;
		const item = props.iteminfo;
		let campaignTag = item.campaign ? <div className="campaignTag font12">{item.campaign.campaignTag}</div>:null;
		let atts = this.getAttr(item.attributes);
		let soldOut = <span className="soldOut font14">售 罄</span>;
        let storeId = props.storeId;
		return (
			<li>
                <div className="brandItem" onClick={this.toProduct.bind(this)}>
					{campaignTag}
					<div className="img"><img src={ENV.domain + this.getMiddlePic(item.imagePath)}/></div>
					<p className="font12">{item.brandName}</p>
					<p className="font14">{item.name}</p>
					<p className="font10">{atts}</p>
					<div className="price">
						<p className="nowprice font18">{item.sellprice /100 ||0}<span className="font10">元</span></p>
						{/*{*/}
							{/*<p className="oldprice">原价 {*/}
								{/*item.msrp > item.sellprice?*/}
								{/*item.msrp /100:*/}
								{/*item.sellprice/100*/}
							{/*}元</p>*/}
						{/*}*/}
					</div>
					{
						item.quantity > 0 ?
							(
								<AddCart itemInfo={item} storeId={storeId} itemClick={this.props.addToCart}/>
							) : soldOut
					}
				</div>
			</li>
		);

	}
}