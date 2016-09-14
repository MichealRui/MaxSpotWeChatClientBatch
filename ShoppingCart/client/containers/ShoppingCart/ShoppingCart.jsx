'use static';
import React from 'react';
import TopBar from '../../components/TopBar/TopBar';
import ShoppingTitle from '../../components/ShoppingTitle/ShoppingTitle';
import ProductItem from '../../components/ProductItem/ProductItem';
import ProductEdit from '../../components/ProductEdit/ProductEdit';
import Repurchase from '../../components/Repurchase/Repurchase';
import BottomBar from '../../components/BottomBar/BottomBar';
import { connect }  from 'react-redux';
import { fetchItem, increment, decrement, deleteItem, setMessage} from '../../actions/actions';
import ShoppingCartData from './ShoppingCartData.js';
require('./index.css');

class ShoppingCart extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const productListStyle = { width:'100%', margin:0, listStyle: 'none'};
        const { dispatch } = this.props;
        return(
            <div>
	            <div className="contentContainer">
	            	<TopBar logo={ShoppingCartData.logo} searchClick={()=>console.log('click')}/>
                    <ShoppingTitle machineAddress={ShoppingCartData.machineAddress} statusText={ShoppingCartData.statusText}/>
	                <ul className="container" style={productListStyle}>
	                    {
	                        ShoppingCartData.productList.map((product, index) =>
	                            <ProductItem key={product.skuNumber} data={product}
	                                         increase={item => dispatch(increment(item))}
	                                         decrease={item => dispatch(decrement(item))}
	                                         delete={item => dispatch(deleteItem(item))}
	                            />
	                        )
	                    }
	                </ul>
                    <ProductEdit {...ShoppingCartData} />
                    <Repurchase {...ShoppingCartData} />
	            </div>
                <BottomBar totalMoney={this.props.itemInfo.totalMoney}
                           itemList={this.props.itemInfo.productList}
                           onError={(message) => dispatch(setMessage(message))}
                />
            </div>
        );
    }
}

/*CheckIn.defaultProps = {
    itemInfo: {productList:[]}
};*/

function select(state) {
    console.log('dispatched')
    console.log(state)
    return {
        itemInfo: state
    }
}

export default connect(select)(ShoppingCart)