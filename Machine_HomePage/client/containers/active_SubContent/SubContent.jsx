'use strict';
import React from 'react'
import ItemContainer from '../active_ItemContainer/itemContainer'
require('./index.css')

export default class SubContent extends React.Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps, nextState){
        return !(JSON.stringify(this.props.contentData.items) == JSON.stringify(nextProps.contentData.items));
    }

    render() {
        let props = this.props;
        let current = props.contentData;
        return (
            <div className="active_subContentContainer">

                <ItemContainer items={current.items}
                               itemClick={this.props.addToCart}
                               store={this.props.storeData}
                               detailClick={this.props.showProduct}

                />
            </div>
        )
    }
}