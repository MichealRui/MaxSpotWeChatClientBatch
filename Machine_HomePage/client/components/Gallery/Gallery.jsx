'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            current:''
        }
    }

    setCurrent(p) {
         this.setState({
             current:p
         })
        console.log('Been set')
    }

    static get defaultProps () {
        return {
            imagePath: ['./images/product.jpg', './images/product.jpg',
                './images/product.jpg', './images/product.jpg', './images/last.jpg']
        }
    }

    render() {
        let path = ['./images/product.jpg', './images/product.jpg',
            './images/product.jpg', './images/product.jpg', './images/last.jpg'];
        let s = this.props.imagePath.map((p, index) => {
            return (
                <div className="thumbnailWrapper" key={index}>
                    <img className="thumbnail"
                         src={require(p)}
                         onClick={() => this.setCurrent(p)}
                    />
                </div>
            )
        });
        let detail = (
            <div className="detailContainer">
                <img className="detail" src={this.state.current?require(this.state.current):require('./images/product.jpg')}/>
            </div>);
        return (
            <div className="galleryContainer">
                {detail}
                <div className="picList">
                    {s}
                </div>
            </div>
        )
    }
}

