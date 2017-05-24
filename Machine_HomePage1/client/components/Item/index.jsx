'use strict';
import React from 'react';
require('./index.css');

export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    addClick(e) {
        // todo update cart
        // this.setState({
        //     showFloat: true
        // });
        this.props.click(
            this.props.item
        );
        e.stopPropagation();
        e.preventDefault();
    }

    showClick(item) {
        this.props.show(item)
    }

    getMiddlePic(path) {
        let particial = path.split('.');
        if(particial.length == 2) {
            particial[0] = particial[0] + '_middle';
            return particial.join('.')
        } else {
            return path
        }
    }

    getAttr(attributes){
        let dif = <span>&#12288;</span>;
        var attr = dif;
        if(attributes && attributes.length > 0){
            attr = attributes.map((item,index)=>{
                if(item.value){
                    return item.value + item.unit;
                }else{
                    return ''
                }
            }).reduce((pre,next)=>{
                if(pre == '' && next == ''){
                    return '';
                }else{
                    return pre + next + ' '
                }
            },'')
        }
        if(attr == ''){
            attr = dif
        }
        return attr
    }

    render() {
        let props = this.props.item;
        var atts = this.getAttr(props.attributes);
        let domain= IMAGECONFIG.host;
        const NEW_ITEM = 1;
        const HOT_ITEM = 2;
        const OTHER_ITEM = 0;
        //ActiveType
        let campaignTag = props.campaign ? <div className="campaign font14">{props.tips}</div>:null;
        return (

            <div className={"itemBox " + (props.quantity > 0 ? " sellnormal" : " sellout" )} onClick={() => this.showClick.bind(this)(props)}  >
                {
                    props.imagePath ?
                        <img src={domain + this.getMiddlePic(props.imagePath)} className='productImg'/>
                        :
                        <img src={require('./images/default.png')} className='productImg'/>
                }
                <div className="brandProductContainer">
                    <p className="font12">{props.brandName}</p>
                    <p className="font16">{props.shortName}</p>
                </div>
                <div className="productPrice font18">
                    <span>{props.sellprice / 100 || 0}<span className="font10">元</span></span>
                    <span className={"font10 beforePrice " + (props.msrp <=0 ? 'hide' : '')}>原价{props.msrp / 100}元</span>
                </div>
                <div className="addCart font40" onClick={this.addClick.bind(this)}>+</div>
                {campaignTag}
                <div className="selloutInfo">
                    <div className="selloutText font22">缺货</div>
                </div>
            </div>
        );
    }
}