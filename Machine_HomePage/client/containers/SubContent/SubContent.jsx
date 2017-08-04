'use strict';
import React from 'react'
import Selector from '../../components/Selector/index'
import ItemContainer from '../ItemContainer/itemContainer'

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
            <div className="subContentContainer">
                <Selector selector={this.props.selector}
                          changeContent={this.props.changeContent}
                />
                {/*<SubSelector/>*/}
                <ItemContainer items={current.items}
                               itemClick={this.props.addToCart}
                               store={this.props.storeData}
                               detailClick={this.props.showProduct}
                               reload={true}
                />
            </div>
        )
    }
}