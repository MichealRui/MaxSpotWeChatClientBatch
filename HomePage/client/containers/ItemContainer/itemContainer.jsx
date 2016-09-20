'use strict';
import React from 'react';
import Item from '../../components/Item/index'
import AddButton from '../../components/AddButton/addButton'
require('./index.css');

export default class ItemContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let props = this.props.items;
        let items = props.map((item, index) => {
            return <Item item={item} key={index}>
                <AddButton item={item}/>
            </Item>
        });
        return (
            <div className="itemContainer">
                {items}
            </div>
        )
    }
}