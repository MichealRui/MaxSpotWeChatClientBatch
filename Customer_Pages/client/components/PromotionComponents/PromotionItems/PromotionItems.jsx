"use strict";
import React from 'react';
import util from '../../../util/WeChatUtil'
require('./index.css');

export default class PromotionItems extends React.Component{
    constructor(props){
        super(props);
    }

    getAttr(attributes){
        let def = <br></br>;
        let atts = def;
        if(attributes && attributes.length >0 ){
            atts = attributes.map(
                att => {
                    if(att.value){
                        return att.value + att.unit
                    }else{
                        return ''
                    }
                }
            ).reduce((pre , next)=>{
                if(pre == '' && next == ''){
                    return '';
                }else{
                    return pre+next+'';
                }
            },'')
        }
        if(atts == ''){
            atts = def;
        }
        return atts;
    }

    render(){
        let props = this.props;
        let domain = ENV.domain;
        domain = 'http://114.215.143.97';
        let defProductImg = DEFALUT_INFO.defaultImg
        let itemData = props.itemData;
        let itemTag = itemData.tags ?  <div className="activityItemsTags font12">{itemData.tags}</div>:'';
        let itemDesc = props.type == 1 ? <div className="activityDesc">{itemData.description}</div> : '';
        let attr = this.getAttr(itemData.attributes)
        return(
            <div className={"activityItems "+(itemData.quantity > 0 ? '' : 'sellout')}>
                <div className="activityItem">
                    <div className="activityItemsImg">
                        {
                            itemData.imagePath ?
                            <img src={ domain + util.getMiddlePic(itemData.imagePath) }/> :
                            <img src={defProductImg}/>

                        }

                    </div>
                    <div className="activityItemsInfo">
                        <p className="font12">{itemData.brandName}</p>
                        <p className="font14">{itemData.shortName}</p>
                        <p className="font12">{attr}</p>
                    </div>
                    <div className="activityItemsMoney font18">
                        {itemData.sellprice/100 || 0 } <span className="font12">元</span>
                    </div>

                </div>
                {itemTag}
                {itemDesc}
                <div className="activityLayer">
                    <div className="sellouts font14">缺货</div>
                </div>

            </div>
        )
    }
}

PromotionItems.PropTypes ={
    itemData : React.PropTypes.object
};
PromotionItems.defaultProps = {
    itemData : {}
};