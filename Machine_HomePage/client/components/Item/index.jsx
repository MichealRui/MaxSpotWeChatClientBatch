'use strict';
import React from 'react';
require('./index.css');

export default class Item extends React.Component {
    constructor(props) {
        super(props)
    }

    addClick(e) {
        // todo update cart
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

    render() {
        let props = this.props.item;
        // let sliderItem = this.props.isSliderItem? "sliderItem":"commonItem";
        return (
            <div className={"item sliderItem"} onClick={() => this.showClick.bind(this)(props)}>
                {
                    props.imagePath ?
                        <img src={'http://114.215.143.97' + this.getMiddlePic(props.imagePath)} className='productImg'/>
                        :
                        <img src={require('./images/default.png')} className='productImg'/>
                }

                <span className='brandProductContainer'>
                    <p className={'productName font23'}>{props.brandName}</p>
                    <p className='productDesc font23'>{props.shortName}</p>
                </span>
                <span className='unitPrice font28'>{props.sellprice / 100 || 0}元</span>
                <span className="add font30" onClick={this.addClick.bind(this)}>+</span>
            </div>
        );
    }
}