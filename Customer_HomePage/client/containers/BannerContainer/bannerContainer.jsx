'use strict';
import React from 'react'
import SwiperComponent from '../../components/Swiper/index'
// require('./index.css');

export default class BannerContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let swiperConfig = {
            pagination: '.swiper1 .swiper-pagination',
            freeMode: true,
            slidesPerView: 1
        };
        let props = this.props;
        let items = props.bannerData.map((item, index) =>  {
            return (
                <a key={index} href={item.destUrl}>
                    <img width="100%" height="200" src={item.imagePath}/>
                </a>
            )
        });
            
        return (
            <SwiperComponent swiperConfig={swiperConfig} swiperContainer={'swiper1'}>
                {items}
            </SwiperComponent>
        )
    }
}

//
//
// var Index = React.createClass({
//
//     getInitialState: function() {
//         return {
//             movies: []
//         };
//     },
//
//     componentDidMount() {
//         this.setState({
//             movies: [
//                 "http://photos.cntraveler.com/2014/09/29/5429c32b425f183f61bf7316_new-york-city-skyline.jpg",
//                 "https://ephemeralnewyork.files.wordpress.com/2010/08/broadway47thstreet2010.jpg",
//                 "https://ephemeralnewyork.files.wordpress.com/2010/08/broadway47thstreet2010.jpg",
//                 "http://photos.cntraveler.com/2014/09/29/5429c32b425f183f61bf7316_new-york-city-skyline.jpg"
//             ],
//         });
//     },
//
//
//     render: function() {
//         let items = this.state.movies;
//         let config = {
//             pagination: '.swiper-pagination',
//             paginationClickable: true
//         };
//         return (
//             <SwiperComponent config={config} bannerData={}>
//                 {
//                     items.map((item, index) => {
//                         return (
//                             <a href=""><img src={item} width="100%" height="200" key={index}/></a>
//                         )
//                     })
//                 }
//             </SwiperComponent>
//         )
//     }
// });