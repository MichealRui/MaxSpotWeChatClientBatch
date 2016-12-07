import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class CartItem extends React.Component{
    constructor(props) {
        super(props)
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
        return (
            <div className="cart-item my-item">
                <div className="item-pic">
                    <img src={'http://114.215.143.97' + this.getMiddlePic(props.imagePath)} alt="Product name" />
                </div>
                <h2 className="item-name">
                    <span>{props.brandName}</span>
                    <span>{props.shortName}</span>
                </h2>
                <h3 className="item-price clearfix">
                    <span className="final-price">¥{props.sellprice /100 || 0}</span>
                    {/*<span class="market-price">市场价¥126</span>*/}
                </h3>
                <div className="item-panel clearfix">
                    <div className="counting clearfix">
                        <a className="btn-minus">-</a>
                        <span type="text" className="quantity" value={props.count} readOnly="readOnly">{props.count}</span>
                        <a className="btn-plus">+</a>
                    </div>
                    <a className="trash">Remove this item!</a>
                </div>
            </div>
        )
    }
}
