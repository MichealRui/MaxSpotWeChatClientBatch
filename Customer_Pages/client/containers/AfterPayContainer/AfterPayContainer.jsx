"use strict";
import React from 'react';
import {connect} from 'react-redux';
import AfterPayHeader from '../../components/AfterPayComponents/AfterPayHeader/AfterPayHeader'
import AfterPayFooter from '../../components/AfterPayComponents/AfterPayFooter/AfterPayFooter'
import ConfirmWindow from '../../components/TakeGoodsComponents/ConfirmWindowComponent/ConfirmWindowComponent'
import WindowText from '../../components/TakeGoodsComponents/ConfirmWindowComponent/WindowText';
import Button from '../../components/CommoonComponents/Button/Button'
require('./index.css')
class AfterPayContainer extends React.Component{
    constructor(props){
        super(props);
        this._states = this.props.params.states;
        this._ordernumber = this.props.params.orderNumber;
        this.sleepTime = 1000;
        this.state = {
            pageStatus: 1,
            isShopErr : true
        }
    }

    componentWillMount(){
        console.log('afterpay');
        console.log(this._states)
        let state = this._states;
        if(state){
            this.setState({
                pageStatus : state
            })
        }
    }

    shopErrTrue(){
        this.setState({
            isShopErr:true
        })
    }

    shopErrFalse(){
        this.setState({
            isShopErr : false
        })
    }


    render(){
        return (
            <div className='AfterPayContainer'>
                {/*<Header/>*/}
                <AfterPayHeader />
                <AfterPayFooter />
                <Button
                    buttonClassName="enable"
                    buttonText="取货遇到问题"
                    buttonClick={this.shopErrFalse.bind(this)}
                />
                <ConfirmWindow windowText={WindowText}
                               isHidden={this.state.isShopErr}
                               hideClick={this.shopErrTrue.bind(this)}/>
            </div>
        );
    }
}

function select(store) {
    return Object.assign({},{state:store});
}

export default connect(select)(AfterPayContainer)