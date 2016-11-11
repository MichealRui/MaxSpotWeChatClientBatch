'use strict';
import ReactDOM from 'react-dom'
import React from 'react'
import { connect }  from 'react-redux';
import Header from '../../components/Header/Header'
import Banner from '../../components/Banner/Banner'
import SubContent from '../../containers/SubContent/SubContent'
import CartContainer from '../../containers/CartContainer/CartContainer';
import SkuContainer from '../../containers/SkuContainer/SkuContainer';
import { initMainContent } from '../../actions/index'
import { addToCart } from '../../actions/index'

class PageContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cartVisible:false,
            skuVisible:false
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(initMainContent());
    }

    onCartBtnClick() {
        console.log("show");
        this.setState({
            cartVisible: true
        })
    }

    hideCart() {
        console.log("hide");
        this.setState({
            cartVisible: false
        })
    }

    onSkuBtnClick(){
        console.log('sku_show');
        this.setState({
            skuVisible:true
        })
    }

    hideSku(){
        console.log('sku_hide');
        this.setState({
            skuVisible:false
        })
    }

    render() {
        let {state, dispatch} = this.props;
        return (
            <div className="pageContainer">
                <Header cartClick={() => this.onCartBtnClick.bind(this)}
                        skuClick ={()=>this.onSkuBtnClick.bind(this)}
                />
                <Banner/>
                <SubContent
                    contentData={state.currentSub}
                    storeData={state.storeInfo}
                    addToCart={(item) => dispatch(addToCart(item))}
                />
                <CartContainer visible={this.state.cartVisible}
                               onCancel={ () => this.hideCart.bind(this) }
                               items={state.cart.items}
                               moreItems={ state.cart.moreItems }
                               storeData={state.storeInfo}
                               addToCart={(item) => dispatch(addToCart(item))}
                />
                <SkuContainer visible={this.state.skuVisible}
                              onCancel={()=>this.hideSku.bind(this)}
                />
            </div>
        )
    }
}

function select(store) {
    console.log('dispatched');
    return Object.assign({}, {state: store})
}

export default connect(select)(PageContainer)