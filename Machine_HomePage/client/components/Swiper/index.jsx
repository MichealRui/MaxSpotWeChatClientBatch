'use strict';
import React from 'react'
import Swiper from 'swiper'
require('./index.css');

export default class SwiperComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            swiper:null
        }
    }

    componentDidMount() {
        let swiperConfig = this.props.swiperConfig;
        let swiperContainer = this.props.swiperContainer;
        this.setState({
            swiper: new Swiper ('.'+swiperContainer, swiperConfig)
        });
    }

    componentDidUpdate() {
        if(this.props.reload) {
            this.state.swiper.init();
        }
    }

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
    }
}