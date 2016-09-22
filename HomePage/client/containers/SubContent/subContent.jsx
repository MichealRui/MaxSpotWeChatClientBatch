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
            slidesPerView: 2,
            spaceBetween: 20,
        };
        console.log(props.freeItems)
        let freeItems = props.freeItems.map((i, index) => {
            return <Item item={i} key={index} isSliderItem={true}/>
        });
        freeItems.push(<div className="item more"><div><p className='font16'>查看全部</p><p className='font14'>See All</p></div></div>);
        // let listItems = props.items.map((i) => {
        //     return <Item item= {i}>
        //         <AddButton item={i}/>
        //     </Item>
        // })
        return (
            <div className="subContentContainer" >
                <SubBanner data={props.banner}/>
                <SwiperComponent swiperConfig={swiperConfig}>
                    {freeItems}
                </SwiperComponent>
                <ItemContainer items={props.items}/>
            </div>
        )
    }
}