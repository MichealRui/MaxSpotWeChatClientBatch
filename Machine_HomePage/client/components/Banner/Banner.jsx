import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class Banner extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {bannerData} = this.props;
        let banners = bannerData.map((b, index) => {
            return (
                <a key={index} href={item.destUrl}>
                    <img width="100%" height="200" src={item.imagePath}/>
                </a>
            )
        });

        return (
            <div className="bannerContainer">
                {banners}
            </div>
        )
    }
}