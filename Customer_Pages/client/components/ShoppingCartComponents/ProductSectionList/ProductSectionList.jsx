'use strict';
import React from 'react';
import ProductSetion from '../ShopSection/ShopSection';

export default class ProductSectionList extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        let props = this.props;
        let product_list = props.itemInfo.map(
            (sku,index) => {
                if(!sku.productList || sku.productList.length == 0){
                    return '';
                }else{
                    let specifiedMethods = {};
                    for(let k in props.itemMethods){
                        specifiedMethods[k] = props.itemMethods[k](sku.id);
                    }
                    let store = props.activateShop.filter(
                        s => Object.keys(s).shift() == sku.id
                    ).shift();
                    return (
                        <ProductSetion
                            key = {index}
                            itemMethod = {specifiedMethods}
                            itemInfo = {sku}
                            store = {store}
                        />
                    )
                }
            }
        );

        return (
            <div>
                {product_list}
            </div>
        )
    }
}

ProductSectionList.PropTypes = {
    itemInfo : React.PropTypes.array,
    itemMethods : React.PropTypes.object,
    activateShop : React.PropTypes.array
};

ProductSectionList.defaultProps = {
    itemInfo : [],
    itemMethods :{

    },
    activateShop : []
}