'use strict';
import React from 'react'
import SubBanner from '../../components/SubBanner/index'
import SwiperComponent from '../../components/Swiper/index'
import ItemContainer from '../ItemContainer/itemContainer'
import Item from '../../components/Item/index'
require('./index.css');

export default class SubContent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let props = this.props.contentData;
        let swiperConfig = {
            freeMode: true,
            slidesPerView: 2
        };
        let freeItems = props.freeItems.map((i, index) => {
            return (
                <Item item={i}
                      key={index}
                      isSliderItem={true}
                      storeid={this.props.storeData.id}
                />)
        });
        let all = <div className="item more" key={'All'}>
            <div>
                <p className='font16'>查看全部</p>
                <p className='font14'>See All</p>
            </div>
        </div>;
        if(freeItems.length != 0) {
            freeItems.push(all);
        }
        return (
            <div className="subContentContainer" >
                {/*<SubBanner data={props.banner}/>*/}
                {/*<SwiperComponent*/}
                    {/*swiperConfig={swiperConfig}*/}
                    {/*swiperContainer={'swiper2'}*/}
                {/*>*/}
                    {/*{freeItems}*/}
                {/*</SwiperComponent>*/}
                <ItemContainer items={props.items}
                               itemClick={this.props.addToCart}
                               store={this.props.storeData}
                />
            </div>
        )
    }
}