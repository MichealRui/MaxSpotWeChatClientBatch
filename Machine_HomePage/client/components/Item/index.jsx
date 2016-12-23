'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Floating from '../../components/Floating/Floating'
require('./index.css');

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showFloat: false
        }
        // this.animation = { x:1000, y:-100, duration: 2000 };
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

    onTweenOneEnd() {
        this.setState({
            showFloat: false
        })
    }

    addFloating() {
        let domain=ENV.domain;
        let props = this.props.item
        let floating = (<Floating
            showPros={this.state.showFloat}
            style={'J_animate'}

        >
            <img src={domain + this.getMiddlePic(props.imagePath)} className='productImg '/>
        </Floating>);
        let root = this.refs.imageContainer;

        ReactDOM.render(
            floating,
            root
        );
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
        let tweenOneStyle={position: 'absolute', left: 0, top: 0,'z-index':9999};
        return (
            <div className={"item sliderItem"} onClick={() => this.showClick.bind(this)(props)}>
                {
                    props.imagePath ?
                        <div className="imageContainer" ref="imageContainer">
                            <img src={domain + this.getMiddlePic(props.imagePath)} className='productImg'/>
                            {/*{*/}
                                {/*this.state.showFloat? (*/}
                                    {/*<Floating*/}
                                        {/*style={'J_animate fly'}*/}
                                    {/*>*/}
                                        {/*<img src={domain + this.getMiddlePic(props.imagePath)} className='productImg '/>*/}
                                    {/*</Floating>*/}
                                {/*):''*/}
                            {/*}*/}
                        </div>
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