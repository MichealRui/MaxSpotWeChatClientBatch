'use strict';
import React from 'react'
import ReactDOM from 'react-dom';
import Swiper from 'swiper'
require('./index.css');

export default class SwiperComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // console.log(this.props.swiperConfig)
        let swiperConfig = this.props.swiperConfig;
        let swiperContainer = this.props.swiperContainer;
        //this.swipe = new Swiper('.swiper-container', this.props.swiperConfig);
        window.onload = function () {
            //initialize swiper when document ready
            setTimeout(function(){
                var mySwiper = new Swiper ('.'+swiperContainer, swiperConfig);
            },100);

        };
    }
/*    initSwiper(root, config) {
        /!*
         * warning: this is the hack for delay render components
         * *!/
        this.swipe = new Swiper('.swiper-container', this.props.swiperConfig);
        
        // window.setTimeout(
        //     () => this.swipe = new Swiper(root, config)
        //     , 0);
    }*/
    render() {
        let childNodes = React.Children.map(this.props.children, function(child, index){
            return (
                <div className="swiper-slide">
                    {child}
                </div>
            );
        });
        let swiperContainer = this.props.swiperContainer;
        return (
            <div className={"swiper-container "+swiperContainer}>
                <div className="swiper-wrapper">
                    {childNodes}
                </div>
                <div className="swiper-pagination"></div>
            </div>
        );
        /*return (
            React.createElement('div', Object.assign({}, this.props, {className: 'swiper-container'}),
            React.createElement('div', {className: 'swiper-wrapper'},
                React.Children.map(this.props.children, function (child, index) {
                    return React.createElement('div', {className: 'swiper-slide'}, React.cloneElement(child));
                })
            ), <div className="swiper-pagination"></div>
        )
    );*/
    }
}