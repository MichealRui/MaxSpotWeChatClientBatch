'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import Header from '../../components/Header/Header';
import GetSku from '../../components/GetSku/GetSku';
import GetSuccess from '../../components/GetSuccess/GetSuccess';
import GetFail from '../../components/GetFail/GetFail';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import {initAfterPay,initStart,initSuccess,addLike} from '../../actions/index'
require('./index.css');

class AfterPay extends React.Component {
	constructor(props){
		super(props);
		this.orderStatusApi = ENV.domain + '/web/buyer_api/order_detail.ction';
		this.sleepTime = 1000;
	}
	componentWillMount() {
		const { dispatch } = this.props;
		let arr = window.location.search.substring(1).split('&');
		let param = {};
		arr.forEach(function (value,index) {
			let obj = value.split("=");
			param[obj[0]] = obj[1];
		})
		console.log(param);
		let ori_state = param.state
		dispatch(initAfterPay(ori_state));
	}

    componentDidMount() {
        this.fetchOrderStatus(this.props.order.order.orderNumber);
    }

    fetchOrderStatus(on) {
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
                    if(json.order.status == '2') {
                        window.location.href = "http://www.mjitech.com/buyer_takestatus/index.html"
                    } else {
                        window.setTimeout( () => this.fetchOrderStatus(on), this.sleepTime)
                    }
                }
            })
    }

	render(){
		// props = CouponData;
		const { dispatch, itemInfo} = this.props;

		let stateinfo;
		switch (itemInfo.ori_state){
			case "1":
				stateinfo = <GetSku itemInfo={itemInfo} />;
				break;
			case "2":
				stateinfo = <GetSuccess itemInfo={itemInfo}  addLike={()=>dispatch(addLike())} />;
				break;
			case "3":
				stateinfo = <GetFail />;
				break;
		}

		return (
			<div className='AfterPayContainer'>
				<Header/>
				{stateinfo}
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