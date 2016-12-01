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

    render() {
        let path = ['./images/product.jpg', './images/product.jpg',
            './images/product.jpg', './images/product.jpg', './images/last.jpg'];
        let s = path.map((p, index) => {
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
                <img className="detail" src={this.state.current?require(this.state.current):require(path[0])}/>
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