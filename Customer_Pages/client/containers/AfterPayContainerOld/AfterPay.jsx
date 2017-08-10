'use strict';
import React from 'react';
import fetch from 'isomorphic-fetch';
import Header from '../../components/AfterPayComponentsOld/Header/Header';
import GetSku from '../../components/AfterPayComponentsOld/GetSku/GetSku';
import GetSuccess from '../../components/AfterPayComponentsOld/GetSuccess/GetSuccess';
import GetFail from '../../components/AfterPayComponentsOld/GetFail/GetFail';
import Footer from '../../components/AfterPayComponentsOld/Footer/Footer';
import { connect } from 'react-redux';
require('./index.css');

class AfterPay extends React.Component {
	constructor(props){
		super(props);
		this.orderStatusApi = ENV.domain + '/web/buyer_api/order_detail.ction';
		this.sleepTime = 1000;

        this.state = {
            pageStatus: 1,
            timer : null
        }
	}
	componentWillMount() {
        let state = this.props.params.states;
        if(state) {
	        this.setState({
	            pageStatus : state
            })
        }
	}

    componentDidMount() {
        let orderNumber = this.props.params.orderNumber;
        this.fetchOrderStatus.bind(this)(orderNumber);
    }

    fetchOrderStatus(on) {
        const CompleteTaking = 5;
        fetch( this.orderStatusApi,
            {
                credentials : 'include',
                method: 'POST',
                mode: 'cors',
                Origin: '*',
                body: JSON.stringify({
                    order_number: on
                })
            })
            .then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    if(json.order.status == CompleteTaking) {
                        this.setState({
                            pageStatus :2
                        })
                    } else {
                        this.state.timer = window.setTimeout( () => this.fetchOrderStatus(on), this.sleepTime)
                    }
                } else {
                    this.setState({
                        pageStatus :3
                    })
                }
            })
    }

    componentWillUnmount(){
        window.clearTimeout(this.state.timer);
    }

	render(){
		// props = CouponData;

        let getting = <GetSku />;
        let succ = <GetSuccess />;
        let fail = <GetFail />;

        let stateInfo = {
            1: getting,
            2: succ,
            3: fail
        };
		return (
			<div className='AfterPayContainer'>
				<Header/>
				{stateInfo[this.state.pageStatus]}
				<Footer />
			</div>
		);
	}
}


function select(state) {
	return {
		itemInfo: state
	}
}

export default connect(select)(AfterPay)
