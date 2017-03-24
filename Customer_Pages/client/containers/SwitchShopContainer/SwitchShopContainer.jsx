"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { initShopList } from '../../actions/SwitchShop';
import ShopItem from '../../components/SwitchShopComponents/ShopItem/ShopItem'
require('./index.css');
class SwitchShopContainer extends React.Component {
    constructor(props){
        super (props);
        this._storeId = this.props.params.storeId;
    }
    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(initShopList(this._storeId))
    }

    render(){
        let { state,dispatch } = this.props;
        let {current,others} = state.switchShop;
        let currentShop = current ? current.map(
            (shop,index)=>{
                return <ShopItem key={index} {...shop}/>
            }
        ) : [];
        let otherShop = others ? others.map(
            (shop,index)=>{
                return (
                    <li key={index}>
                        <ShopItem  {...shop} />
                    </li>
                )
            }
        ) : [];
        return (
            <div className="shopContainer">
                {
                    currentShop.length ? (<div className="currentShop">
                        <h1 className='current font16'>当前站点：</h1>
                        {currentShop}
                    </div>) : ''
                }

                <div className="otherShop">
                    <h1 className='other font16'>选择一个站点购买：</h1>
                    <ul>
                        {otherShop}
                    </ul>
                </div>
            </div>
        )
    }
}
function select(store) {
    return Object.assign({}, {state: store})
}
export default connect(select)(SwitchShopContainer)