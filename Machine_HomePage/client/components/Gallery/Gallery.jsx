'use strict';
import React from 'react';
require('./index.css')

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            current:'./images/default.png',
            current_key:0
        }
    }

    setCurrent(p,key) {
         this.setState({
             current:p,
             current_key:key
         });
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.images) != JSON.stringify(nextProps.images)) {
            this.setCurrent(
                nextProps.images[0],
                0
            )
        }
    }

    componentWillMount() {
        this.setCurrent(
            this.props.images[0],
            0
        )
    }

    render() {
        let props = this.props;
        const GalleryMaxLength=8;
        let images_item = props.images.length == 0 ? []:
            props.images.map((img, index) => {
                return (
                    <div className="thumbnailWrapper " key={index}>
                        <img className={"thumbnail " + (this.state.current_key == index ? 'active':'')}
                             src={img}
                             onClick={() => this.setCurrent(img,index)}
                        />
                    </div>
                )
            });

        for(let l=images_item.length; l < GalleryMaxLength; l++) {
            images_item.push(
                <div className="thumbnailWrapper" key={l}>
                </div>
            )
        }
        let back={backgroundImage:'url(' + this.state.current + ')',backgroundSize:'contain'};
        let detail = (
            <div className="detailContainer" style={back}>
                {/*<img className="detail" src={this.state.current?this.state.current:require('./images/default.png')}/>*/}
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

