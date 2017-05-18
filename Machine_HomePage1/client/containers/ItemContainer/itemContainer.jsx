'use strict';
import React from 'react';
import Item from '../../components/Item/index'
import SwiperComponent from '../../components/Swiper/index'
require('./index.css');

var ItemContainer = React.createClass({
    render() {
        let swiperConfig = {
            pagination : '.swiper-pagination',
            freeMode: true,
            slidesPerView: 1,
        };
        let props = this.props.items;
        let items = props.map((item, index) => {
            return (<Item item={item} key={index}
                                 isSliderItem={false}
                                 click={this.props.itemClick}
                                 store={this.props.store}
                                 show={this.props.detailClick}
                                 ActiveType={this.props.ActiveType}
            />);

        });
        let newItems = new Array();
        let tempItems = new Array();
        let num = this.props.isActivity ? 8 : 12;
        props.forEach((item,index)=>{
            if(index % num == 0 && index != 0){
                newItems.push(tempItems);
                tempItems = [];
                tempItems.push(item);
            }else{
                tempItems.push(item);
            }
            if(index == items.length - 1){
                newItems.push(tempItems);
            }
        });
        let newHtml = newItems.map((item,index)=>{
            let temI = item.map((i,index)=>{
                return (<Item item={i} key={index}
                              isSliderItem={false}
                              click={this.props.itemClick}
                              store={this.props.store}
                              show={this.props.detailClick}
                              ActiveType={this.props.ActiveType}
                />);
            });
            return (
                <div key={index}>
                    {temI}
                </div>
            );
        });
        return (
            <div className="itemContainer" >
                <SwiperComponent
                    swiperConfig={swiperConfig}
                    swiperContainer={'swipers4'}
                    reload={this.props.reload}
                >
                    {newHtml}
                </SwiperComponent>
            </div>
        )
    }
});


module.exports = ItemContainer;