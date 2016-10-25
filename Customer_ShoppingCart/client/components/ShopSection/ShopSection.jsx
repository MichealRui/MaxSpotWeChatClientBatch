'use strict';
import React from 'react';
import ProductItem from '../../components/ProductItem/ProductItem';
import ProductItemLocked from '../../components/ProductItemLocked/ProductItemLocked';
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
        this.setState({
            checked:!this.state.checked
        });
        this.props.itemMethod.toggle();
    }

    editChange() {
        this.setState({
            edit:!this.state.edit
        });
    }

    render() {
        const productListStyle = { width:'100%', margin:0, listStyle: 'none'};
        const labelClassName = this.state.checked? 'fa fa-check checkLabel checked font14':'checkLabel font14';
        const itemMethod = this.props.itemMethod;
        const itemInfo = this.props.itemInfo;
        return (
            <div className='editContainer'>
                <div className="editTitle">
                    <label className={labelClassName} onClick={this.checkboxChange}>
                    </label>
                    <span className='machineAddress font14'>
		              {itemInfo.name}
		            </span>
                    <span className='editButton font14 J_edit' onClick={this.editChange}>
                        {this.state.edit? '编辑': '完成'}
		            </span>
                </div>
                <ul className="container" style={productListStyle}>
                    {
                        itemInfo.productList.map(
                            (product, index) =>
                                this.state.edit ?
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