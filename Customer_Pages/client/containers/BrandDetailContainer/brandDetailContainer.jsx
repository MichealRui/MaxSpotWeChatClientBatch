"use strict";
import React from 'react';
import { connect } from 'react-redux';
import Message from '../../components/CommoonComponents/Message/Message';
import { setMessage } from '../../actions/Message';
import ButtonBottom from '../../components/HomeComponents/Cart/Cart'
import { clearCart , addToCart } from '../../actions/Cart';
import { initBrand } from '../../actions/BrandDetail';
import BrandHeader from '../../components/BrandDetailComponents/BrandHeader/BrandHeader'
import BrandItem from '../../components/BrandDetailComponents/BrandItem/BrandItem'
import ButtomButtom from '../../components/HomeComponents/Cart/Cart'
require('./index.css');
class BrandDetailContainer extends React.Component {
    constructor(props){
        super (props);
        this._brandId = this.props.params.brandId;
        this._storeId = this.props.params.storeId;
    }
    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(initBrand(this._brandId,this._storeId))
    }

    render(){
        let { state,dispatch } = this.props;
        let {cart , brandDetail} = state;
        let { brand , skus } = brandDetail;

        return (
            <div className="brandContainer">
                <BrandHeader brandInfo={brand}/>
                <BrandItem items={skus} storeId={this._storeId} addToCart={(item)=>dispatch(addToCart(item))}/>
                <ButtomButtom
                    cart={cart.cart}
                    clearCart={()=>dispatch(clearCart())}
                />
            </div>
        )
    }
}
function select(store) {
    return Object.assign({}, {state: store})
}
export default connect(select)(BrandDetailContainer)