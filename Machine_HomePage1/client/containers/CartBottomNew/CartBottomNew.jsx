'use strict';
import React from 'react';
import OtherItem from '../../components/OtherItem/index'
import SwiperComponent from '../../components/Swiper/index'
require('./index.css');

export default class CartBottomNew extends React.Component {
    constructor(props) {
        super(props)
    }

    onClickQr() {
        if(this.props.showAlert || this.props.totalPrice <= 0) {
            return false;
        } else {
            // this.props.setCartLoading();
            this.props.submit()
        }
    }

    render() {
        let swiperConfig = {
            freeMode: true,
            slidesPerView: 4,
        };
        let items = this.props.moreItems && this.props.moreItems.length > 0 ?
            this.props.moreItems.map((item, index) => {
            return (
                <OtherItem item={item} key={index}
                      click={this.props.itemClick}
                />
            )
        }) : null;
        return (
            <div className="otherItemContainer">
                <div className="otherText font16">大家都在买：</div>
                <div className="otherItems">
                    <SwiperComponent
                        swiperConfig={swiperConfig}
                        swiperContainer={'swipers2'}
                        reload={true}
                    >
                        {items}
                    </SwiperComponent>
                </div>

            </div>

            )
    }
}