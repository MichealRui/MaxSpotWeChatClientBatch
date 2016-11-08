'use strict';
import ReactDOM from 'react-dom'
import React from 'react'
import { connect }  from 'react-redux';
import Header from '../../components/Header/Header'
import Banner from '../../components/Banner/Banner'
import SubContent from '../../containers/SubContent/SubContent'
import { initMainContent } from '../../actions/index'
import { addToCart } from '../../actions/index'

class PageContainer extends React.Component{
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(initMainContent());
    }

    render() {
        let {state, dispatch} = this.props;
        return (
            <div className="pageContainer">
                <Header/>
                <Banner/>
                <SubContent
                    contentData={state.currentSub}
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