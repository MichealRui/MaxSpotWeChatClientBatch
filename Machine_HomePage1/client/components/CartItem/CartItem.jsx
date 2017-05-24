import React from 'react';
import ReactDOM from 'react-dom';
import CountControl from '../../components/CountControl/CountControl'
require('./index.css')

export default class CartItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            showDelete: false
        }
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

    removeItem() {
        this.props.remove(this.props.item)
    }

    decrease() {
        this.props.dec(
            this.props.item
        )
    }

    addItem() {
        this.props.add(
            this.props.item
        )
    }

    getAtts(attributes){
        let def = <span></span>
        var atts = def;
        if(attributes && attributes.length > 0){
            atts = attributes.map((item,index)=>{
                if(item.value){
                    return item.value + item.unit;
                }else{
                    return ''
                }
            }).reduce((pre,next)=>{
                if(pre == '' && next == ''){
                    return ''
                }else{
                    return pre + next + ' '
                }
            },'')
        }
        if(atts == ''){
            atts = def
        }
        return atts;
    }

    toggleDelete () {
        this.setState({
            showDelete: !this.state.showDelete
        })
    }

    render() {
        let props = this.props.item;
        let isGift = this.props.item.isPresent;
        let giftAvailable = this.props.item.giftAvailable;
        var atts = this.getAtts(props.attributes);
        let domain= IMAGECONFIG.host;//ENV.domain == 'http://www.mjitech.com' ? 'http://114.215.143.97': 'http://139.129.108.180';
        let soldOut = props.quantity ? (
            <div className={"counting clearfix "}>
                <a className="btn-minus" disabled={props.count == 1} onClick={() => this.decrease.bind(this)()}>-</a>
                <span type="text" className="quantity" value={props.count} readOnly="readOnly">{props.count}</span>
                <a className="btn-plus" disabled={ props.quantity <= props.count} onClick={() => this.addItem.bind(this)()}>+</a>
            </div>
        ) : <div className={ 'counting undershop font20' }>此商品已售罄</div>;

        let gift = (
            <div>
                <div className="gift-count">
                    x 1
                </div>
                <div className= {"gift-footer " + (giftAvailable?"gift-active":"gift-fail")}>
                    <span className="gift-desc1">满29 </span> <span className="gift-desc2">/ 享赠</span>
                </div>
                {
                    giftAvailable ? null: <div className="gift-fail-cover"></div>
                }
            </div>
        );

        let footer = isGift? gift
            :
            (
                <div>
                    <h3 className="item-price">
                        <span className="final-price">{props.sellprice /100 || 0}<span className="font20">元</span></span>
                    </h3>
                    <div className="item-panel clearfix">
                        {soldOut}
                        <a className="trash" onClick={() => this.toggleDelete.bind(this)()}>Remove this item!</a>
                    </div>
                    <div className={"layer " + (this.state.showDelete ? '': 'hide')}>
                        <div className="dialog">
                            <div className="font26 del">删除此商品？</div>
                            <div className="btn clearfix">
                                <div className="btn_yes font30" onClick={() => {
                                    this.toggleDelete.bind(this)();
                                    this.removeItem.bind(this)();
                                }}>确定</div>
                                <div className="btn_no font30" onClick={() => this.toggleDelete.bind(this)()}>取消</div>
                            </div>
                        </div>
                    </div>
                    {
                        props.count > props.quantity ? <div className="noQuantity">
                            <span className="triangle-up"></span>
                            <span className="font20 noQuantity">{"剩余库存 " + props.quantity + " 件"}</span>
                        </div>:''
                    }
                    <div className={ "layer " + (props.quantity > 0 ? 'hide':'')}></div>
                </div>
            );
        let marketPrice = props.msrp > 0 ? <span className="market-price font20">市场价¥{props.msrp/100}元</span> :'';
        let itemKey = this.props.itemKey;
        let campaignTags = this.props.campaign ?
            <div className={"campaignTag font10 " + (this.props.activate?"activate" : "fail")}>
                { (this.props.activate?"已满足":"不满足") + "【"+this.props.campaignTag+"】"}
            </div>
            :null;
        return (
            <div className={"cart-item " + (itemKey==0?'first':'')}>
                {
                    itemKey == 0 ? campaignTags : null
                }
                <div className="pic"><img src={domain + this.getMiddlePic(props.imagePath)} />
                    <div className={"giftLayer font12 " +(isGift ? '' : 'hide') }>赠品</div>
                    <div className="tags">
                        {
                            this.state.showDelete ? <p className="font16 showDeleteText">删除此商品？</p>:
                                <div>
                                    <h3 className="font16">{props.name}</h3>
                                    <h3 className="font16">
                                        <span className={"currentMoney " + (giftAvailable?'hide':'')}>{props.sellprice/100 || 0}<span className="font10">元</span></span>
                                        <span className={"beforeMoney font10 "+(props.msrp ? '':'hide')}>原价 {props.msrp/100 || 0}<span className="font10">元</span></span>
                                        <span className={"giftCount font10 " + (giftAvailable?'':'hide')}><span className="font10">×</span>1</span>
                                    </h3>
                                </div>
                        }

                    </div>
                </div>
                <div className="moneyCount">
                    {
                        !isGift ?
                            (props.quantity ?
                            <CountControl key={props.id} item={props} decrease={this.props.dec} deleteItem={this.props.remove} addItem={this.props.add} countClass="shoppingCartCount"/> :
                            <span className="emptyTips font12">此商品暂时缺货</span>) : null
                    }
                    <img src={require("./images/icon-trash.png")} onClick={() => {
                        this.toggleDelete.bind(this)();
                    }} />
                    <div className={"gift " + (isGift ? '' : 'hide')}>
                        <div><img src={require("./images/gift-active.png")} /></div>
                        <div className="giftText fon20"><span className="font16">满200</span> / 享赠</div>
                    </div>
                    {
                        this.state.showDelete ?
                            <div className="closeLayer clearfix">
                                <div className="btn_yes btn font16" onClick={() => {
                                    this.toggleDelete.bind(this)();
                                    this.removeItem.bind(this)();
                                }}>确定</div>
                                <div className="btn_no btn font16" onClick={() => this.toggleDelete.bind(this)()}>取消</div>
                            </div> : ''
                    }

                </div>
                <div className="itemEmpty"></div>
            </div>
        )
    }
}
