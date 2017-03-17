'use strict';

import React from 'react';
import {Link} from 'react-router'
require ('./index.css');

export default class Empty extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const props = this.props;
        let newInfo = props.itemInfo.filter(
            sku => sku.productList && sku.productList.length > 0
        );
        let style = {};
        // let style = this.state.show_empty ? {display:'block'} : {display:'none'};
        // let style = props.showEmpty ? {display:'block'} : {display:'none'};
        // let style = newInfo && newInfo.length > 0 ? {display:'none'} : {display:'block'};
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
    itemInfo:React.PropTypes.array,
    showEmpty : React.PropTypes.bool
}

Empty.defaultProps = {
    itemInfo : [],
    showEmpty : false
}


