'use strict';
import React from 'react'
import ItemContainer from '../ItemContainer/itemContainer'
require('./index.css')

export default class SubContent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let props = this.props;
        let current = props.contentData;
        const NEW_ITEM = 1;
        const HOT_ITEM = 2;
        const OTHER_ITEM = 0;
        return (
            <div className={"active_subContentContainer" + (props.ActiveType == NEW_ITEM ? ' new_subContent' : '')}>
                <ItemContainer items={current.items}
                               itemClick={this.props.addToCart}
                               store={this.props.storeData}
                               detailClick={this.props.showProduct}
                               ActiveType={this.props.ActiveType}
                />
            </div>
        )
    }
}