'use strict';
import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import ProductItemLocked from '../ProductItemLocked/ProductItemLocked';
require('./index.css');

export default class ProductSection extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            checked:true,
            edit: false
        };
        this.checkboxChange = this.checkboxChange.bind(this);
        this.editChange = this.editChange.bind(this);
    }

    checkboxChange(){
        // this.setState({
        //     checked:!this.state.checked
        // });
        this.props.itemMethod.toggle();
    }

    editChange() {
        // this.setState({
        //     edit:!this.state.edit
        // });
        this.props.itemMethod.editState();
    }

    render() {
        const productListStyle = { width:'100%', margin:0, listStyle: 'none'};

        const itemMethod = this.props.itemMethod;
        const itemInfo = this.props.itemInfo;
        const store = this.props.store;
        const editable = store[itemInfo.id].editable;
        const activated = store[itemInfo.id].activated;
        const labelClassName = activated ? 'fa fa-check checkLabel checked font14':'checkLabel font14';
        return (
            <div className='editContainer'>
                <div className="editTitle">
                    <label className={labelClassName} onClick={this.checkboxChange}>
                    </label>
                    <div className='machineAddress font14'>
		              <p className="machineAddressName">{itemInfo.name}</p>
		              <p className="machineAddressAdd font10">{itemInfo.address}</p>
		            </div>
                    <span className='editButton font14 J_edit' onClick={() => itemMethod.editState()}>
                        {!editable ? '编辑': '完成'}
		            </span>
                </div>
                <ul className="container" style={productListStyle}>
                    {
                        itemInfo.productList.map(
                            (product, index) =>
                                !editable ?
                                    <ProductItemLocked key={product.skuNumber} data={product}/>
                                    :
                                    <ProductItem key={product.skuNumber} data={product}
                                                 increase={itemMethod.increase}
                                                 decrease={itemMethod.decrease}
                                                 delete={itemMethod.delete}
                                                 shopId={itemInfo.shopId}
                                    />

                        )
                    }
                </ul>
            </div>
        )
    }
}