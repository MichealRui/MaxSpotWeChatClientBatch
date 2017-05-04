"use strict"
import React from 'react';
import StoreDetailTitle from '../../CommonComponents/StoreDetailTitle/StoreDetailTitle'
require('./index.css');
export default class OrderDetailStoreInfo extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        let props = this.props;
        let storeNameInfo = {
            orderTitleIcon : 'font20 fa-th-large',
            orderTitleText : props.storeInfo.store.name,
            orderIconShow : true,
            orderTitleShow : true,
            orderArrowShow : true,
            className : '',
            orderArrowIcon : 'fa-angle-right font24',
            orderArrowText : ''
        };
        let storeAddressInfo = {
            orderTitleIcon : 'font20 fa-map-marker',
            orderTitleText : props.storeInfo.store.address,
            orderIconShow : true,
            orderTitleShow : true,
            orderArrowShow : true,
            className : '',
            orderArrowIcon : 'fa-angle-right font24',
            orderArrowText : ''
        };
        let storeClockInfo = {
            orderTitleIcon : 'font20 fa-clock-o',
            orderTitleText : '08:00 - 23:00',
            orderIconShow : true,
            orderTitleShow : true,
            orderArrowShow : false,
            className : 'clockInfo'
        };
        let storePhoneInfo = {
            orderTitleIcon : 'font20 fa-phone',
            orderTitleText : props.storeInfo.store.phone,
            orderIconShow : true,
            orderTitleShow : true,
            orderArrowShow : false,
            className : 'phoneInfo'
        };
        return(
            <div className="orderDetailStoreInfo">
                <StoreDetailTitle storeInfo={storeNameInfo}/>
                <StoreDetailTitle storeInfo={storeAddressInfo}/>
                <StoreDetailTitle storeInfo={storeClockInfo}/>
                <StoreDetailTitle storeInfo={storePhoneInfo}/>
            </div>
        )
    }
}
OrderDetailStoreInfo.PropTypes = {
    storeInfo : React.PropTypes.object
};
OrderDetailStoreInfo.defaultProps = {
    storeInfo : {
        store : {
            name : '',
            address : '',
            phone : ''
        }
    }
}