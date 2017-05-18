"use strict";
import React from 'react';
import PromoteItem from '../PromotionItems/PromotionItems';
import Add from '../../CommonComponents/AddButton/addButton';
export default class PromotionContent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        let item;
        if(props.promotionData && props.promotionData.skus && props.promotionData.skus.length > 0){
            item = props.promotionData.skus.map(
                (pro,index)=>{
                    return <PromoteItem key={index} itemData={pro} type={props.type}>
                                <Add item={pro} click={props.addCart} store={props.storeInfo}></Add>
                            </PromoteItem>
                }
            )
        }else{
            item = null
        }
        return(
            <div className="promotionContent">
                {item}
            </div>
        )
    }
}

PromotionContent.PropTypes = {
    promotionData : React.PropTypes.array,
    type : React.PropTypes.number,
    storeInfo : React.PropTypes.object
};
PromotionContent.defaultProps = {
    promotionData : {
        skus : []
    },
    type : 0,
    storeInfo : {}
};