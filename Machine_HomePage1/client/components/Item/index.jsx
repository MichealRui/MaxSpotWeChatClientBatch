'use strict';
import React from 'react';
require('./index.css');

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTips : false,
            addSucc : false,
            cartTimer : null
        }
    }

    addClick(e) {
        // todo update cart
        // this.setState({
        //     showFloat: true
        // });

        // if(this.props.item.quantity <= 0){
        //     return false
        // }
        //
        // let c_count = this.props.cart.items.filter(c_i => c_i.id == this.props.item.id);
        // let count = 0;
        // if(c_count && c_count.length > 0){
        //     count = c_count[0].count
        // }
        // if(count < this.props.item.quantity){
        //     this.props.click(
        //         this.props.item
        //     );
        // }else{
        //     this.setState({
        //         showTips : true
        //     });
        //     this.clearTips();
        // }
        window.clearTimeout(this.state.cartTimer);
        this.setState({
            showTips : true
        });
        this.clearTips();
        this.props.click(
            this.props.item
        );
        e.stopPropagation();
        e.preventDefault();
    }

    clearTips(){
        this.state.cartTimer = window.setTimeout(()=>{
            this.setState({
                showTips : false
            });
            this.props.setCartErrorMessageEmpty();
        },2000);
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
        let tips = props.quantity <= 0 ? <div className="showTips font20">缺货</div> : '';
        // let tips1 = this.state.showTips ? <div className="showTips font20">剩余库存{props.quantity}件</div> : '';
        let tips1 = this.props.errorMessage && this.state.showTips ? <div className="showTips font20">剩余库存不足</div> : '';
        //ActiveType
        let campaignTag = props.campaign ? <div className="campaign font14">{props.tips}</div>:null;
        return (

            <div className={"itemBox " + (props.quantity > 0 ? " sellnormal" : " sellout" )} onClick={() => this.showClick.bind(this)(props)}  >
                <div className="productImg">
                {
                    props.imagePath ?
                        <img src={domain + this.getMiddlePic(props.imagePath)} />
                        :
                        <img src={require('./images/default.png')} />
                }
                    {tips1}
                    {tips}
                </div>
                <div className="brandProductContainer">
                    <p className="font12">{props.brandName}</p>
                    <p className="font16">{props.shortName}</p>
                </div>
                <div className="productPrice font18">
                    <span>{props.sellprice / 100 || 0}<span className="font10">元</span></span>
                    <span className={"font10 beforePrice " + (props.msrp <=0 ? 'hide' : '')}>原价{props.msrp / 100}元</span>
                </div>
                <div className="addCart" onClick={this.addClick.bind(this)}>
                    <img src={require('./images/add.png')} alt=""/>
                </div>
                {campaignTag}
                <div className="selloutInfo">
                    {/*<div className="selloutText font22">缺货</div>*/}
                </div>
            </div>
        );
    }
}