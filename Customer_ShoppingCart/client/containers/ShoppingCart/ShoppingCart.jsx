'use static';
import React from 'react';
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';
import ProductSection from '../../components/ShopSection/ShopSection';
import { connect }  from 'react-redux';
import { fetchItem, increment, decrement, deleteItem, setMessage, initShoppingCart, toggleShop, clearCart } from '../../actions/actions';
// import ShoppingCartData from './ShoppingCartData.js';
require('./index.css');

class ShoppingCart extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(initShoppingCart())
    }
    
    render(){
        const { dispatch, itemInfo} = this.props;
        const itemMethods = {
            increase: shopId => item => dispatch(increment(shopId, item)),
            decrease: shopId => item => dispatch(decrement(shopId, item)),
            delete: shopId => item => dispatch(deleteItem(shopId, item)),
            toggle: shopId => () => dispatch(toggleShop(shopId))
        };
        console.log(itemInfo.remainTime)
        return(
            <div>
	            <div className="contentContainer">
	            	<TopBar logo={itemInfo.logo} searchClick={()=>console.log('click')}/>
                    {
                    itemInfo.skus.map(
                        (sku, index) => {
                            if(!sku.productList || sku.productList.length == 0) {
                                return ''
                            } else {
                                let specifiedMethods = {};
                                for(let k in itemMethods) {
                                    specifiedMethods[k] = itemMethods[k](sku.shopId)
                                }
                                return (<ProductSection key={index}
                                                        itemMethod={specifiedMethods}
                                                        itemInfo={sku}
                                />)
                            }
                    }

                    )}
                    {/*<ProductSection itemMethod={itemMethods} address={itemInfo.machineAddress} itemInfo={this.props.itemInfo}/>*/}
                    {/*<ShoppingTitle machineAddress={itemInfo.machineAddress} statusText={itemInfo.statusText}/>*/}
	                {/*<ul className="container" style={productListStyle}>*/}
	                    {/*{*/}
                            {/*itemInfo.productList.map((product, index) =>*/}
	                            {/*<ProductItem key={product.skuNumber} data={product}*/}
	                                         {/*increase={item => dispatch(increment(item))}*/}
	                                         {/*decrease={item => dispatch(decrement(item))}*/}
	                                         {/*delete={item => dispatch(deleteItem(item))}*/}
	                            {/*/>*/}
	                        {/*)*/}
	                    {/*}*/}
	                {/*</ul>*/}
                    {/*<ProductEdit {...itemInfo} />*/}
                    {/*<Repurchase {...itemInfo} />*/}
	            </div>
                <BottomBar totalMoney={this.props.itemInfo.totalMoney}
                           itemList={this.props.itemInfo.productList}
                           remainTime={this.props.itemInfo.remainTime}
                           clearCart={() => dispatch(clearCart())}
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
    return {
        itemInfo: state
    }
}

export default connect(select)(ShoppingCart)