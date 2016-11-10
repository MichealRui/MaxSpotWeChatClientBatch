'use strict';
import ReactDOM from 'react-dom'
import React from 'react'
import { connect }  from 'react-redux';
import Header from '../../components/Header/Header'
import Banner from '../../components/Banner/Banner'
import SubContent from '../../containers/SubContent/SubContent'
import CartContainer from '../../containers/CartContainer/CartContainer';
import { initMainContent } from '../../actions/index'
import { addToCart } from '../../actions/index'

class PageContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cartVisible:false
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

    render() {
        let {state, dispatch} = this.props;
        return (
            <div className="pageContainer">
                <Header cartClick={() => this.onCartBtnClick.bind(this)}/>
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
            </div>
        )
    }
}

function select(store) {
    console.log('dispatched');
    return Object.assign({}, {state: store})
}

export default connect(select)(PageContainer)