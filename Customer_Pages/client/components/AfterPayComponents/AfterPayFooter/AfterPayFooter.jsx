"use strict";
import React from 'react';
import Swiper from '../../CommonComponents/Swiper/index';
import AfterPayLine from '../AfterPayLine/AfterPayLine';
import Button  from '../../CommonComponents/Button/Button'
//import mock from './AfterPayFooterData'
require('./index.css')
export default class AfterPayFooter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentKey : 0
        }
    }

    componentDidMount(){
        // const ORDER_NORMAL = 1; //出货完成  绿色对勾 fa-check
        // const ORDER_WRONG = 2 ; //出货异常  红色叹号 fa-exclamation
        // const ORDER_WILLOUT = 0 ; //尚未出货
        // const ORDER_ALREADYOUT = 3; //已经出货
        // const ORDER_OUTING = 4; //正在出货 红色三个点 fa-ellipsis-h
        const ORDER_NORMAL = 5; //出货完成  绿色对勾 fa-check
        const ORDER_WRONG = 6 ; //出货异常  红色叹号 fa-exclamation
        const ORDER_WILLOUT = 3; //尚未出货
        const ORDER_ALREADYOUT = 5; //已经出货
        const ORDER_OUTING = 4; //正在出货 红色三个点 fa-ellipsis-h

        let start = 0;
    }


    changeKey(k){
        this.setState({
            currentKey : k
        })
    }
    render(){
        let props = this.props;
        // const ORDER_NORMAL = 1; //出货完成  绿色对勾 fa-check
        // const ORDER_WRONG = 2 ; //出货异常  红色叹号 fa-exclamation
        // const ORDER_WILLOUT = 0 ; //尚未出货
        // const ORDER_ALREADYOUT = 3; //已经出货
        // const ORDER_OUTING = 4; //正在出货 红色三个点 fa-ellipsis-h
        const ORDER_NORMAL = 5; //出货完成  绿色对勾 fa-check
        const ORDER_WRONG = 6 ; //出货异常  红色叹号 fa-exclamation
        const ORDER_WILLOUT = 3; //尚未出货
        const ORDER_ALREADYOUT = 7; //已经出货
        const ORDER_OUTING = 4; //正在出货 红色三个点 fa-ellipsis-h  4
        let domain = "http://114.215.143.97";
        let defaultImg = DEFALUT_INFO.defaultImg;
        let batches = props.itemData.batches;


        let itemInfo = batches && batches.length > 0 ? batches.map(
            (item,index) =>{
                let skusImg = item.skus.map((sku,index)=>{
                    let img = sku.sku.imagePath ? (domain + sku.sku.imagePath) : defaultImg;
                    return img;
                });
                let status = item.outStatus;
                if(index < props.currentKey){
                    status = 7;
                }
                let status_arr = [3,4,5,6];
                if(status_arr.indexOf(item.outStatus) == -1){
                    status = 3;
                }
                return {
                    status : status,
                    id : index,
                    images : skusImg
                }
            }
        ) : [];
        console.log("------");
        console.log(itemInfo);
        let mock = itemInfo;
        const length = mock.length <= 5 ? mock.length : 5;
        let swiperConfig = {
            pagination:'',
            freeMode: false,
            slidesPerView: length,
            spaceBetween: 0,
        };
        let swiperContainer = mock.length <= 5 ? 'swiper-containers'  : 'swiper-container';
        let lineClass = 'row-line';
        let len = mock.length;
        let sliders = mock.length > 1 ? mock.map(
            (item,index)=>
            {
                return (<AfterPayLine key={index} batch={item.id} lineClass={lineClass} lineStatus={item.status} chosen={index == this.state.currentKey} onButtonClick={(key)=>this.changeKey.bind(this)(index)}/>)
            }
        ) : '';

        let imgs = mock.length > 0 && mock  ? mock[this.state.currentKey].images.map(
            (item,key) =>{
                return (
                    <div className="img" key={key}><img src={item} alt=""/></div>
                )
            }

        ) : [];
        let moveKey = this.state.currentKey > 4 ? this.state.currentKey : 0;
        return(
            <div className="afterPayFooter">
                <div className={"progress-info " + (len > 1 ? '' : 'hide')}>
                    <Swiper swiperConfig={swiperConfig} swiperContainer={swiperContainer} moveto={moveKey}>
                        {sliders}
                    </Swiper>
                </div>
                <div className="info-img">
                    {imgs}
                    <div className={"info-img-layer " + (mock && mock.length > 0 && mock[this.state.currentKey].status == ORDER_WILLOUT ? ' show' : ' hide')}></div>
                </div>
            </div>
        )
    }

}

AfterPayFooter.PropTypes = {
    itemData : React.PropTypes.object,
    currentKey : React.PropTypes.number
};
AfterPayFooter.defaultProps = {
    itemData : {
        batches : []
    },
    currentKey : 0
};