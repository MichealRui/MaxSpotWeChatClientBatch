'use static';
import React from 'react';
import QuerySku from '../../components/QuerySku/QuerySku';
import Message from '../../components/Message/Message';
import ProductItem from '../../components/ProductItem/ProductItem';
import BottomBar from '../../components/BottomBar/BottomBar';
import { connect }  from 'react-redux';
import { fetchItem, increment, decrement, deleteItem } from '../../actions/actions';
require('./index.css');

class CheckIn extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const productListStyle = { width:'100%', margin:0, listStyle: 'none'};
        const { dispatch } = this.props;
        return(
            <div>
	            <div className="contentContainer">
	            	<QuerySku onQueryClick={skuId => dispatch(fetchItem(skuId))} itemInfo={this.props.itemInfo}/>
	            	<Message msgContent={this.props.itemInfo.alertMessage}/>
	                <ul className="container" style={productListStyle}>
	                    {
	                        this.props.itemInfo.productList.map((product, index) =>
	                            <ProductItem key={product.skuId} data={product}
	                                         increase={item => dispatch(increment(item))}
	                                         decrease={item => dispatch(decrement(item))}
	                                         delete={item => dispatch(deleteItem(item))}
	                            />
	                        )
	                    }
	                </ul>
	            </div>
                <BottomBar totalMoney={this.props.itemInfo.totalMoney}/>
            </div>
        );
    }
}

CheckIn.defaultProps = {
    itemInfo: {productList:[]}
};

function select(state) {
    console.log('dispatched')
    console.log(state)
    return {
        itemInfo: state
    }
}

export default connect(select)(CheckIn)