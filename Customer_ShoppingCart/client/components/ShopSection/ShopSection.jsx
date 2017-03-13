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
        this._itemMethod = this.props.itemMethod;
    }

    checkboxChange(){
        this.props.itemMethod.toggle();
    }

    editChange() {
        this.props.itemMethod.editState();
    }

    generateProductStructure(campaignDetail) {
        let {store, itemInfo} = this.props;
        let editable = store[itemInfo.id].editable;
        console.log('editable:' + editable);
        let {campaignId, campaignTag, presentSku, list, activate, isAllSku} = campaignDetail;

        let productStructure = list.length > 0 ?
                <ul className="campaignContainer">
                    {
                        campaignId && !isAllSku ?
                            <div className={"font11 campaignTag "+ (activate?"activate":"fail")}>
                                { (activate?"已满足 ":"不满足 ") + "【"+campaignTag+"】"}
                            </div>:null
                    }
                    {
                        !isAllSku ?
                            (!editable ? list.map(product =>
                                <ProductItemLocked key={product.skuNumber} data={product}/>
                            ) : list.map(product =>
                                <ProductItem key={product.skuNumber} data={product}
                                         increase={this._itemMethod.increase}
                                         decrease={this._itemMethod.decrease}
                                         delete={this._itemMethod.delete}
                                />)) : null
                    }
                    {
                        presentSku ? <ProductItemLocked data={presentSku} isGift={true} activate={activate}/> : null
                    }
                </ul>
             : null;

        return new Array(productStructure)
    }

    reduceProductStructure(campaignDetail) {
        return this.generateProductStructure(campaignDetail)
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
                <div className="container" style={productListStyle}>
                    {
                        itemInfo.campaignedProductList.map(this.reduceProductStructure.bind(this)).reverse()
                    }
                </div>
            </div>
        )
    }
}