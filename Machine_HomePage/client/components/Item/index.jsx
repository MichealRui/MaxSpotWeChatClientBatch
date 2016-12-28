'use strict';
import React from 'react';
require('./index.css');

export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    addClick(e) {
        // todo update cart
        this.setState({
            showFloat: true
        });
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
        let domain=ENV.domain;
        return (
            <div className={"item sliderItem"} onClick={() => this.showClick.bind(this)(props)}>
                {
                    props.imagePath ?
                        <img src={domain + this.getMiddlePic(props.imagePath)} className='productImg'/>
                        :
                        <img src={require('./images/default.png')} className='productImg'/>
                }
                <span className='brandProductContainer'>
                    <p className={'productName font23'}>{props.brandName}</p>
                    <p className='productDesc font23'>{props.shortName}</p>
                    <p className={'categoryName font18'}>
                    {atts}
                    </p>
                </span>

                <span className='unitPrice font28'>{props.sellprice / 100 || 0}<span className="font20">元</span></span>
                {
                    props.quantity > 0 ?
                        <span>
                            <span className={"oldPrices font20 "}>市场价 {props.msrp/100}元</span>
                            <span className={"add font60 "} onClick={this.addClick.bind(this)}>+</span>
                        </span> :
                        <span>
                            <span className={"soldOut font22 "}>售罄</span>
                        </span>
                }
            </div>
        );
    }
}