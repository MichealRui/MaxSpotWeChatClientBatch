'use static';
import React from 'react'
import ReactDOM from 'react-dom';
import Swiper from 'swiper'
require('./index.css');

export default class SwiperComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props.swiperConfig)
        this.initSwiper(ReactDOM.findDOMNode(this), this.props.swiperConfig)
    }
    initSwiper(root, config) {
        /*
         * warning: this is the hack for delay render components
         * */
        window.setTimeout(
            () => this.swipe = new Swiper(root, config)
            , 0);
    }
    render() {
        let props = this.props;
        return (
            React.createElement('div', Object.assign({}, this.props, {className: 'swiper-container'}),
            React.createElement('div', {className: 'swiper-wrapper'},
                React.Children.map(this.props.children, function (child, index) {
                    return React.createElement('div', {className: 'swiper-slide'}, React.cloneElement(child));
                })
            ), <div className="swiper-pagination"></div>
        )
    );
    }
}


// var SwiperComponent = React.createClass({
//     componentDidMount() {
//         this.initSwiper(ReactDOM.findDOMNode(this), this.props.config)
//     },
//
//     initSwiper(root, config) {
//         /*
//          * warning: this is the hack for delay render components
//          * */
//         window.setTimeout(
//             () => this.swipe = new Swiper(ReactDOM.findDOMNode(this), config)
//             , 0);
//     },
//
//     render() {
//         return React.createElement('div', Object.assign({}, this.props, {className: 'swiper-container'}),
//             React.createElement('div', {className: 'swiper-wrapper'},
//                 React.Children.map(this.props.children, function (child, index) {
//                     return React.createElement('div', {className: 'swiper-slide'}, React.cloneElement(child));
//                 })
//             )
//         );
//     }
// });