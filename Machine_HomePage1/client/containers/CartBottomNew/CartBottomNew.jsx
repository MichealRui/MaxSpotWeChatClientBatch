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
                let temp = this.props.productList.filter(pro=>pro.id == item.id);
                item.count = temp && temp.length > 0 ? temp[0].count : 0;
                item.errMessage = this.props.errItem && this.props.errItem.id == item.id ? this.props.errItem.errorMessage : '';
            return (
                <OtherItem item={item} key={index}
                      click={this.props.itemClick}
                           setCartErrorMessageEmpty={this.props.setCartErrorMessageEmpty}
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