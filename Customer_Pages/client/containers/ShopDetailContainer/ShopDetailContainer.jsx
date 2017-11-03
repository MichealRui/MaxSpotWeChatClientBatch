"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { initStore } from '../../actions/ShopDetail';
import { initWxConfig } from '../../actions/WeiXin';
import ShopDetailHeader from '../../components/ShopDetailComponents/ShopDetailHeader/ShopDetailHeader';
import ShopDetailInfo from '../../components/ShopDetailComponents/ShopDetailInfo/ShopDetailInfo'
import ShopDetailGallery from '../../components/ShopDetailComponents/ShopDetailGallery/ShopDetailGallery'
class ShopDetailContainer extends React.Component {
    constructor(props){
        super (props);
        this._storeId = this.props.params.storeId;
    }
    componentWillMount(){
        const { dispatch } = this.props;
        let i_link = 'http://www.mjitech.com/buyer_pages/index.html/#/';
        dispatch(initWxConfig(i_link,initStore(this._storeId)));
    }

    render(){
        let { state,dispatch } = this.props;
        let { store } = state.shopDetail
        return (
            <div className="shopDetailContainer">
                <ShopDetailHeader storeInfo={store}/>
                <ShopDetailInfo storeInfo={store}/>
                <ShopDetailGallery storeInfo={store}/>
            </div>
        )
    }
}
function select(store) {
    return Object.assign({}, {state: store})
}
export default connect(select)(ShopDetailContainer)