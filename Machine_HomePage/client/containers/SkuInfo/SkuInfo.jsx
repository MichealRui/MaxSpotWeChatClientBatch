'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class skuInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'skuinfo_tag_name':'sku_detail'
        }
    }

    changetags(tagName){
        this.setState({
            'skuinfo_tag_name':tagName
        })
    }

    render() {
        let props = this.props;
        let product = props.item;
        let sku = product.sku
        let brand = product.brand
        let sku_detail = (
            <div>
                <div className="comment hide">
                    <div className="circle_img"><img src={''} /></div>
                    <div className="comment_text">
                        <p className="font26">爱跑步的女孩</p>
                        <p className="font26">“这是我吃过最好吃的面包干，没有之一”
                        </p>
                    </div>
                </div>
                <div className="item_info comment_text font26">{sku.description}
                </div>
            </div>
        )

        let sku_about = (
            <div className="clearfix">
                <img className="square_img" src={ ENV.domain + brand.imagePath} />
                <div className="comment_text font24">{brand.story}</div>
            </div>
        )



        return (

            <div className="skuInfo_popup">
                <div>

                    <div className={"tag font27 " + (this.state.skuinfo_tag_name == 'sku_detail'? 'active':'')} onClick={()=>this.changetags('sku_detail')}>商品详情</div>
                    <div className={"tag font27 " + (this.state.skuinfo_tag_name == 'sku_about'? 'active':'')} onClick={()=>this.changetags('sku_about')}>关于{brand.name}</div>
                    <div className={"sku_detail " + (this.state.skuinfo_tag_name == 'sku_detail' ? '' : 'hide')}>
                        {sku_detail}
                    </div>
                    <div className={"sku_about " +  (this.state.skuinfo_tag_name == 'sku_about' ? '' : 'hide')}>
                        {sku_about}
                    </div>
                </div>
            </div>


        )

    }

}


