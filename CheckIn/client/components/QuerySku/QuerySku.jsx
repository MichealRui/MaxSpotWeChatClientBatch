'use static';

import React from 'react';
require ('./index.css');

export default class QuerySku extends React.Component {
    constructor(props){
        super(props);
    }
    
    queryClick() {
        const click = this.props.onQueryClick;
        let skuId = this.refs.queryInput.value;
    
        // todo fetch data from server
        let data = 				{
            productName:"喜之郎",
            productAddress:"美国加州进口朗姆酒",
            productTaste:"经典盐焗味",
            productCost:"12.5",
            skuId: "0001",
            count: 1
        }
        
        if(skuId) {
            return click(skuId)
        } else {
            //todo show '不能为空'
        }
    }
    
    render(){
        const props = this.props;
        const itemInfo = props.itemInfo;
        let className = '';
        if(itemInfo.productList.length>0){
            className='searchButton J_queryItem';
        }else {
            className='searchButton active J_queryItem';
        }
        return(
            <div className='queryContainer font18'>
                <input className="searchInput" type="text" ref="queryInput" placeholder="点击输入商品条形码"/>
                <span ref='searchButton' className={className}
                      onClick={this.queryClick.bind(this)}>录入</span>
            </div>
        );
	}
}