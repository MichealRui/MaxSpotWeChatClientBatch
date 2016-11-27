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
		let skunumber = this.props.itemInfo.skuNumber;
		let storeid = this.props.storeId;
		window.location.href = ENV.domain + '/buyer_product/index.html?storeid='
			+ storeid + '&skunumber=' + skunumber;
	}

	render(){
		let props = this.props;
		const item = props.iteminfo;
		let atts = this.getAttr(item.attributes);
        let storeId = props.storeId;
		return (
			<li>
                <div className="brandItem" onClick={this.toProduct.bind(this)}>
					<div className="img"><img src={ENV.domain + this.getMiddlePic(item.imagePath)}/></div>
					<p className="font12">{item.brandName}</p>
					<p className="font14">{item.name}</p>
					<p className="font10">{atts}</p>
					<div className="price">
						<p className="nowprice font18">{item.sellprice /100 ||0}<span className="font10">元</span></p>
						{
							item.marketprice?
								<p className="oldprice">市场价 {item.marketprice}元</p>
								:
								''
						}

					</div>
					<AddCart itemInfo={item} storeId={storeId} itemClick={this.props.addToCart}/>
				</div>
			</li>
		);

	}
}