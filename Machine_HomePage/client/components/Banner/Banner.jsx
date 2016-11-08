import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class Banner extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        // const {bannerData} = this.props;
        // let banners = bannerData.map((b, index) => {
        //     return (
        //         <a key={index} href={item.destUrl}>
        //             <img src={item.imagePath}
        //                  className={index == 0 ? "longBanner": "shorBanner"}/>
        //         </a>
        //     )
        // });

        return (
            <div className="bannerContainer">
                <a>
                    <img src={require('./images/WechatIMG397.jpeg')}
                         className="longBanner"/>
                </a>
                <a>
                    <img src={require('./images/WechatIMG397.jpeg')}
                         className="shortBanner"/>
                </a>
                <a>
                    <img src={require('./images/WechatIMG397.jpeg')}
                         className="shortBanner"/>
                </a>
                <a>
                    <img src={require('./images/WechatIMG397.jpeg')}
                         className="shortBanner"/>
                </a>
            </div>
        )
    }
}