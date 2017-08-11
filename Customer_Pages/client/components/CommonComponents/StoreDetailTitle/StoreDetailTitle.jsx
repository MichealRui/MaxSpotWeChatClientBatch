"use strict";
import React from 'react';
require('./index.css')
export default class StoreDetailTitle extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        let props = this.props;
        return (
            <div className={'storeDetailTitle ' + props.storeInfo.className} >
                <span className={"fa " + props.storeInfo.orderTitleIcon + (props.storeInfo.orderIconShow ? '' : ' hide')}>{props.storeInfo.orderIconText}</span>
                {
                    props.storeInfo.className === 'phoneInfo' && props.storeInfo.orderTitleText != '' ?
                        <a href={'tel:'+props.storeInfo.orderTitleText}>
                            <span className={"orderAddress font14" + (props.storeInfo.orderTitleShow ? '' : ' hide')}>{props.storeInfo.orderTitleText }</span>
                        </a> :
                        <span className={"orderAddress font14" + (props.storeInfo.orderTitleShow ? '' : ' hide')}>{props.storeInfo.orderTitleText }</span>
                }
                <span className={'fa orderAddressArrow '+ props.storeInfo.orderArrowIcon + (props.storeInfo.orderArrowShow ? '' : ' hide')}>{props.storeInfo.orderArrowText}</span>
            </div>
        );
    }
}

StoreDetailTitle.PropTypes = {
    storeInfo : React.PropTypes.object
};
StoreDetailTitle.defaultProps = {
    storeInfo : {
        orderTitleIcon : '',
        orderIconText : '',
        orderTitleText : '',
        orderIconShow : true,
        orderTitleShow : true,
        orderArrowShow : true,
        className : '',
        orderArrowIcon : 'fa-angle-right font24',
        orderArrowText : ''
    }
}