"use strict"

import React from 'react';
import {connect} from 'react-redux';
import BMap from 'BMap';
import {fkmapApi} from './bmaps'
import Message from '../../components/CommonComponents/Message/Message';
import { setMessage } from '../../actions/Message'
require('./index.css');
class BaiduMapContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type : 1
        }
    }

    getMap(){
        const {dispatch} = this.props;
        let that = this;
        let bMap = fkmapApi();
        const BUS = 1;
        const WALK = 2;
        const DRIVE = 3;
        var resultPoint = 'gsjhm';
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (result) {
            if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
                let lngTude = result.point.lng;
                let latTude = result.point.lat;
                switch (that.state.type){
                    case BUS:
                        bMap.routeBus('baidu_map', lngTude, latTude, resultPoint, 'map-result');
                        break;
                    case WALK:
                        bMap.routeWalking('baidu_map', lngTude, latTude, resultPoint, 'map-result');
                        break;
                    case DRIVE:
                        bMap.routeDrive('baidu_map', lngTude, latTude, resultPoint, 'map-result');
                        break;

                }
            } else {
                console.log('定位失败：' + this.getStatus());
                dispatch(setMessage({errorMessage: "定位失败"}));
            }
        }, {enableHighAccuracy: true});
    }

    click(type){
        this.setState({
            type : type
        });
        this.getMap.bind(this)();
    }

    componentDidMount(){
        let that = this;
        this.getMap.bind(this)();
    }

    render(){
        const BUS = 1;
        const WALK = 2;
        const DRIVE = 3;
        const { dispatch, state } = this.props;
        const { message} = state;
        /*
        // var resultPoint = 'gsjhm';
        // fkmapApi().drawMapPoint('baidu_map', 'fk-maptit', resultPoint, null, null);
         <div className="fk-maparea">
         <h4 className="fk-maptit" id="fk-maptit">目的地址...</h4>
         <div className="fk-baidumap" id="baidu_map"></div>
         <span className="fk-mapview">点击地图查看路线<br />(受手机设置影响，定位路线仅供参考)</span>
         <a className="fk-mapclk" href="showMap.html?workCode=kjy4"></a>
         </div>
        */
        return(
            <div>
                <Message msgContent={message}
                         clearMessage={() => dispatch(setMessage({errorMessage: ""}))}
                />
                <div className="bmap-content ">
                    <div className="bmap-maparea">
                        <div className="bmap-baidumap bmap-baidumap2" id="baidu_map"></div>
                        <div className="bmap-maptab">
                            <ul className="bmap-maptabul">
                                <li id="routeBus" className={this.state.type == BUS ? 'on' : ''} onClick={()=>this.click.bind(this)(BUS)}>公交</li>
                                <li id="routeWalking" className={this.state.type == WALK ? 'on' : ''} onClick={()=>this.click.bind(this)(WALK)} >步行</li>
                                <li id="routeDrive" className={this.state.type == DRIVE ? 'on' : ''} onClick={()=>this.click.bind(this)(DRIVE)} >驾车</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bmap-ewm-bg">
                        <div id="map-result"></div>
                    </div>
                </div>
            </div>
        )
    }
}

function select(store) {
    return Object.assign({},{state:store})
}

export default connect(select)(BaiduMapContainer)

