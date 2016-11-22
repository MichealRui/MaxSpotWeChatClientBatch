'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import Header from '../../components/Header/Header';
import GetSku from '../../components/GetSku/GetSku';
import GetSuccess from '../../components/GetSuccess/GetSuccess';
import GetFail from '../../components/GetFail/GetFail';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import Util from '../../util/WeChatUtil'
import {initAfterPay,initStart,initSuccess,addLike} from '../../actions/index'
require('./index.css');

class AfterPay extends React.Component {
	constructor(props){
		super(props);
		this.orderStatusApi = ENV.domain + '/web/buyer_api/order_detail.ction';
		this.sleepTime = 1000;
        this.state = {
            pageStatus: 1
        }
	}
	componentWillMount() {
	    let state = Util.getUrlParam().state
        if(state) {
	        this.setState({
	            pageStatus : state
            })
        }
	}

    componentDidMount() {
        let orderNumber = Util.getUrlParam().ordernumber;
        this.fetchOrderStatus(orderNumber);
    }

    fetchOrderStatus(on) {
        const CompleteTaking = 5;
        fetch( this.orderStatusApi,
            {
                method: 'POST',
                mode: 'cors',
                Origin: '*',
                body: JSON.stringify({
                    order_number: on ,
                })
            })
            .then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    console.log("status: " + json.order.status);
                    if(json.order.status == CompleteTaking) {
                        this.setState({
                            pageStatus :2
                        })
                    } else {
                        window.setTimeout( () => this.fetchOrderStatus(on), this.sleepTime)
                    }
                } else {
                    this.setState({
                        pageStatus :3
                    })
                }
            })
    }

	render(){
		// props = CouponData;
		const { dispatch, itemInfo} = this.props;
				let getting = <GetSku itemInfo={itemInfo} />;
                let succ = <GetSuccess itemInfo={itemInfo}  addLike={()=>dispatch(addLike())} />;
				let fail = <GetFail />;

        let stateInfo = {
            1: getting,
            2: succ,
            3: fail
        }

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