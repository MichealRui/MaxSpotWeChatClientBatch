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
        // let isGift = this.props.item.isPresent;
        let isGift = this.props.isGift;
        let giftAvailable = this.props.item.giftAvailable;
        var atts = this.getAtts(props.attributes);
        let domain= IMAGECONFIG.host;//ENV.domain == 'http://www.mjitech.com' ? 'http://114.215.143.97': 'http://139.129.108.180';
        let itemKey = this.props.itemKey;
        let campaignTags = this.props.campaign && !this.props.isAllSku ?
            <div className={"campaignTag font10 " + (this.props.activate?"activate" : "fail")}>
                { (this.props.activate?"已满足":"不满足") + "【"+this.props.campaignTag+"】"}
            </div>
            :null;

        return (
            <div className={"cart-item " + (itemKey==0?'first':'')}>
                {
                    itemKey == 0 ? campaignTags : null
                }
                <div className="pic">
                    <img src={domain + this.getMiddlePic(props.imagePath)} />

                        <div className={"giftLayer font12 " + (isGift ? '':'hide ') + (this.props.activate ? '':'bg999')}>赠品</div>
                        <div className="tags">
                            {
                                this.state.showDelete && !isGift ? <p className="font16 showDeleteText">删除此商品？</p>:
                                    <div>
                                        <h3 className="font16">{props.name}</h3>
                                        <h3 className="font16">
                                            <span className={"currentMoney " + (isGift?'hide ':'') +(this.props.activate ? '':'color255') }>{props.sellprice/100 || 0}<span className="font10">元</span></span>
                                            <span className={"beforeMoney font10 "+(props.msrp && !isGift ? '':'hide') + (this.props.activate ? '':' color255')}>原价 {props.msrp/100 || 0}<span className="font10">元</span></span>
                                            <span className={"giftCount font16 " + (isGift?'':'hide') + (this.props.activate ? '':' color255')}><span className="font10">×</span>{props.count}</span>
                                        </h3>
                                    </div>
                            }

                        </div>

                    {
                        !isGift && props.status != 1 ? <div className={"picLayer "}></div> : null
                    }
                </div>
                <div className="moneyCount">
                    {
                        !isGift ?
                            (props.quantity && props.status == 1 ?
                            <CountControl key={props.id} item={props} decrease={this.props.dec} deleteItem={this.props.remove} addItem={this.props.add} countClass="shoppingCartCount"/> :
                            <span className="emptyTips font12">此商品暂时缺货</span>) : null
                    }
                    <img src={require("./images/icon-trash.png")} onClick={() => {
                        this.toggleDelete.bind(this)();
                    }} className={" "+(isGift ? 'hide' : '')} />
                    <div className={"gift " + (isGift ? '' : 'hide')}>
                        <div>{
                            this.props.activate ?
                            <img src={require("./images/gift-active.png")} />:
                            <img src={require("./images/gift-fail.png")} />
                        }</div>
                        <div className="giftText fon20"><span className="font16">满200</span> / 享赠</div>
                    </div>
                    {
                        this.state.showDelete && !isGift ?
                            <div className="closeLayer clearfix">
                                <div className="btn_yes btn font16" onClick={() => {
                                    this.toggleDelete.bind(this)();
                                    this.removeItem.bind(this)();
                                }}>确定</div>
                                <div className="btn_no btn font16" onClick={() => this.toggleDelete.bind(this)()}>取消</div>
                            </div> : ''
                    }

                    {
                        props.count > props.quantity && props.status == 1 ?
                            <div className="errTips font16">剩余库存{props.quantity}件</div> : null
                    }

                </div>
                <div className="itemEmpty"></div>
            </div>
        )
    }
}
