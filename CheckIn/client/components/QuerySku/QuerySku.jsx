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
        return(
            <div className='queryContainer'>
                <input className="searchInput" type="number" ref="queryInput"/>
                <span className="searchButton J_queryItem"
                      onClick={this.queryClick.bind(this)}>确定</span>
            </div>
        );
	}
}