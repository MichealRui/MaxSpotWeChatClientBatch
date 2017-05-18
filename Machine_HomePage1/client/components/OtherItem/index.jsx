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
        //ActiveType
        let campaignTag = props.campaign ? <div className="campaignTag font12">{props.tips}</div>:null;
        return (
            <div className="otherItem">
                <div className="pic"><img src={domain + this.getMiddlePic(props.imagePath)} /></div>
                <h3 className="itemInfo font14">
                    <p>{props.name}</p>
                    <p>
                        <span className="otherItemCurrentPrice font18">{props.sellprice/100||0}<i className="font12">元</i></span>
                        <span className={"otherItemBeforePrice font12 " + (props.msrp?'':'hide')}>原价 {props.msrp/100||0}元</span>
                    </p>
                </h3>
                <div className="addText font18" onClick={this.addClick.bind(this)}>添加</div>
            </div>
        );
    }
}