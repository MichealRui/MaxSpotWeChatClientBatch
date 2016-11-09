'use strict';
import React from 'react';
import Item from '../../components/Item/index'
import AddButton from '../../components/AddButton/addButton'
import MasonryMixin from './MasonryMixin'
require('./index.css');

var masonryOptions = {
    transitionDuration: 0
};

var ItemContainer = React.createClass({
    mixins:[MasonryMixin(React)('masonryContainer',masonryOptions)],

    render() {
        let props = this.props.items;
        let items = props.map((item, index) => {
            return <Item item={item} key={index} isSliderItem={false} storeid={this.props.store.id}>
                <AddButton item={item}
                           click={this.props.itemClick}
                           store={this.props.store}
                />
            </Item>
        });
        return (
            <div className="itemContainer" ref="masonryContainer">
                {items}
            </div>
        )
    }
});


module.exports = ItemContainer;
/*
export default class ItemContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let props = this.props.items;
        let items = props.map((item, index) => {
            return <Item item={item} key={index} isSliderItem={false}>
                <AddButton item={item}/>
            </Item>
        });
        return (
            <div className="itemContainer">
                {items}
            </div>
        )
    }
}*/
