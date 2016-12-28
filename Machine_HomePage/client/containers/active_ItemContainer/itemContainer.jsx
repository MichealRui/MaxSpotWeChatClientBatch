'use strict';
import React from 'react';
import Item from '../../components/active_Item/index'
import SwiperComponent from '../../components/Swiper/index'
require('./index.css');

var ItemContainer = React.createClass({

    render() {
        let swiperConfig = {
            freeMode: true,
            slidesPerView: 6,
        };
        let props = this.props.items;
        let items = props.map((item, index) => {
            return(
                <Item item={item} key={index}
                      isSliderItem={false}
                      click={this.props.itemClick}
                      store={this.props.store}
                      show={this.props.detailClick}
                />
            )
        });
        return (
            <div className="active_itemContainer" style={{height:'392px'}}>
                <SwiperComponent
                    swiperConfig={swiperConfig}
                    swiperContainer={'swiper2'}

                >
                    {items}
                </SwiperComponent>
            </div>
        )
    }
});


module.exports = ItemContainer;