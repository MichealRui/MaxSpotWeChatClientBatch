'use static';

import React from 'react';
require ('./index.css');

export default class QuerySku extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ableButton: false
        }
    }
    
    inputChange() {
        this.setState({
            ableButton: !this.refs.queryInput.value.length <= 0
        })
    }
    
    queryClick() {
        const click = this.props.onQueryClick;
        let skuNumber = this.refs.queryInput.value;
        if(skuNumber) {
            this.refs.queryInput.value = "";
            this.inputChange();
            return click(skuNumber)
        } else {
            //todo show '不能为空'
        }
    }
    
    render(){
        const props = this.props;
        let activeStyle = 'searchButton active J_queryItem';
        let disableStyle = 'searchButton J_queryItem';
        return(
            <div className='queryContainer font18'>
                <input className="searchInput" type="number" ref="queryInput" placeholder="输入四位数商品码"
                       onChange={this.inputChange.bind(this)}/>
                <span ref='searchButton' className={ this.state.ableButton ? activeStyle : disableStyle }
                      onClick={this.queryClick.bind(this)}>录入</span>
            </div>
        );
	}
}