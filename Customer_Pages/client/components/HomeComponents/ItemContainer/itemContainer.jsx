'use strict';
import React from 'react';
import Item from '../../CommonComponents/Item/index'
import AddButton from '../../CommonComponents/AddButton/addButton'
require('./index.css');

export default class ItemContainer extends React.Component{

    constructor(props) {
        super(props)
    }

    render() {
        let props = this.props.items;
        let items = props.map((item, index) => {
            return(
                <Item item={item} key={index} isSliderItem={false} storeid={this.props.store.id}>
                    <AddButton item={item}
                               click={this.props.itemClick}
                               store={this.props.store}
                    />
                </Item>
            )
        });
        return (
            <div className="itemContainer" ref="masonryContainer">
                {items}
            </div>
        )
    }
}

ItemContainer.propTypes={
    items:React.PropTypes.array
};
ItemContainer.defaultProps={
    items:[]
};