'use strict';
import React from 'react';
import SwiperComponent from '../../components/Swiper/index'
import Cart from '../../components/Cart/Cart'
import CartItem from '../../components/CartItem/CartItem'
import CartBottom from '../../containers/CartBottom/CartBottom'
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import Empty from '../../components/Empty/Empty'
require('./index.css');

export default class DefaultCart extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            sleepTime:1000,
            maxCount:120,
            currentCount:120,
            alertVisible:false,
            timer:null,
            alertMax:30
        }
    }

    componentDidMount() {
        this.countBack()
    }

    componentWillUnmount() {
        window.clearTimeout(this.state.timer);
    }

    countOne(){
        this.setState({
            currentCount: this.state.currentCount - 1
        });
    }

    countBack() {
        if(this.state.currentCount > 0 && this.props.isModalVisible){
            this.state.timer=
                window.setTimeout( () => {
                    this.countOne();
                    this.countBack();
                }, this.state.sleepTime)
        } else if(this.state.currentCount > 0 && !this.props.isModalVisible){
            window.clearTimeout(this.state.timer);
        } else {
            window.clearTimeout(this.state.timer);
            this.showAlertModal()
        }
    }

    showAlertModal() {
        this.setState({
            alertVisible:true
        })
    }

    cancelAlertModal() {
        this.setState({
            alertVisible:false
        });
        this.restartCount()
    }

    restartCount() {
        this.setState({currentCount: this.state.maxCount},
            () => this.countBack()
        )
    }

    renewAlert() {
        this.setState({currentCount: this.state.maxCount})
    }

    render() {
        let props = this.props;
        let swiperConfig = {
            freeMode: true,
            slidesPerView: 6,
        };
        let item_count = props.items.length;
        let items = props.items.map((item, index) => {
            return <CartItem item={item}
                             key={index}
                             dec={props.decItem}
                             add={props.addToCart}
                             remove={props.removeItem}
            />
        });

        /**
         * for valentine
         */

        // let giftData = {
        //     brandName: '怪兽家',
        //     shortName: '怪兽家情人节礼盒',
        //     imagePath: '/static/sku/0/0/895/1486959009314.jpg',
        //     isGift:true,
        //     giftAvailable:props.totalPrice >= 29
        // };
        // //
        // let gift = (
        //     <CartItem
        //         item={giftData}
        //         key={-1}
        //     />
        // );
        //
        // items.push(gift);
        /**
         * end for valentine
         */

        let showPayAlert = props.items.filter( item =>
                (item.quantity == 0) || (item.count > item.quantity) || (item.status == 0)
            ).length > 0;
        return (
            <div onClick={() => this.renewAlert.bind(this)()}>
                <Cart cartStyle={{top:-43+'px',right:199+'px'}} count={props.count || 0} totalPrice={props.totalPrice || 0}/>
                <div className={"itemContainer " + (item_count > 0 ? '':'hide')} >
                    <SwiperComponent
                        swiperConfig={swiperConfig}
                        swiperContainer={'swiper3'}
                        reload={false}
                    >
                        {items}
                    </SwiperComponent>
                </div>
                <div className={"emptyContainer " + (item_count > 0 ? 'hide' : '')}>
                    <Empty cancel={() => this.props.goBack()}/>
                </div>
                <CartBottom moreItems={props.moreItems}
                            itemClick={props.addToCart}
                            totalPrice={props.totalPrice}
                            totalDiscount={props.totalDiscount}
                            submit={props.submit}
                            clearCart={() => props.clearCart()}
                            showAlert={showPayAlert}
                />
                {
                    this.state.alertVisible?
                        <AlertDialog
                            alertVisible={this.state.alertVisible}
                            max={this.state.alertMax}
                            cancel={() => this.cancelAlertModal.bind(this)()}
                            goBack={() => this.props.goBack()}
                            sleepTime={this.state.sleepTime}
                            clearCart={() => props.clearCart()}
                        /> : ''
                }
            </div>
        )
    }
}