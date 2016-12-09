'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            current:'./images/default.png'
        }
    }

    setCurrent(p) {
         this.setState({
             current:p
         })
        console.log('Been set')
    }


    render() {
        let props = this.props
        console.log(props)
        let images_item = this.props.images.map((img, index) => {

            return (
                <div className="thumbnailWrapper" key={index}>
                    <img className="thumbnail"
                         src={ENV.domain + img}
                         onClick={() => this.setCurrent(ENV.domain + img)}
                    />
                </div>
            )
        });
        let detail = (
            <div className="detailContainer">
                <img className="detail" src={this.state.current?this.state.current:require('./images/default.png')}/>
            </div>);
        return (
            <div className="galleryContainer">
                {detail}
                <div className="picList">
                    {images_item}
                </div>
            </div>
        )
    }
}

