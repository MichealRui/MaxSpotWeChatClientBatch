'use strict';
import React, { Component } from 'react';
require ('./index.css');

const productClassItems=[
    {
        itemName:'全部',
        itemIcon:'itemIcon fa fa-th-large font30'
    },
    {
        itemName:'零食',
        itemIcon:'itemIcon fa fa-empire font30'
    },
    {
        itemName:'酒饮',
        itemIcon:'itemIcon fa fa-glass font30'
    },
    {
        itemName:'美妆',
        itemIcon:'itemIcon fa fa-tint font30'
    },
    {
        itemName:'日用品',
        itemIcon:'itemIcon fa fa-umbrella font30'
    },
    {
        itemName:'母婴',
        itemIcon:'itemIcon fa fa-deviantart font30'
    }
];

export default class ProductClass extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let props = this.props;
        let items = [];
        productClassItems.map((item, index)=>
            items.push(
                <li key={index} className='item'>
                    <div className={item.itemIcon}></div>
                    <div className='itemName font14'>{item.itemName}</div>
                </li>
            ));
        return (
            <ul className="productClass">
                {items}
            </ul>
        );
    }
}