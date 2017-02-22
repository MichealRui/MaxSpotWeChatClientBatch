'use strict';

import React from 'react';
import {Link} from 'react-router'
require ('./index.css');

export default class Empty extends React.Component {
    constructor(props){
        super(props);
    }

    searchClick(){
        window.location.href = ENV.domain + '/buyer_home/index.html'
    }
    
    render(){
        const props = this.props;
        let newInfo = props.itemInfo.filter(
            sku => sku.productList && sku.productList.length > 0
        );
        let style = (!newInfo || newInfo.length == 0) ? {display:'block'} : {display:'none'};
        return(
            <div className='item_empty' style={style}>
                <div className="image"><img src={require('./images/empty.png')} className='logo'/></div>
                <div className="text">
                    <p className="font24">购物车是空的哦~</p>
                    <Link to="/">
                        <div className="button font24">去逛逛</div>
                    </Link>
                </div>
            </div>
        );
	}
}

Empty.PropTypes = {
    itemInfo:React.PropTypes.array
}

Empty.defaultProps = {
    itemInfo : [],
}


