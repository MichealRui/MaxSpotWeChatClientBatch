'use strict';
import React from 'react'
import Selector from '../Selector/index'
import Swiper from '../../CommoonComponents/Swiper/index'
require('./index.css');

export default class SelectorContainer extends React.Component {
    constructor(props) {
        super (props);
        this.state={
            activated:[]
        };
        this._onclick = e => {
            let key = e.target.getAttribute("data-key");
            key ? this.props.onSelectClick(key) : false;
        }
    }

    render() {
        let swiperConfig = {
            pagination:'',
            freeMode: false,
            slidesPerView: 5,
            spaceBetween: 0,
        };
        let swiperConfigs = {
            pagination:'',
            freeMode: false,
            slidesPerView: 4,
            spaceBetween: 0,
        };
        let swiperContainer = 'swiper-containers';
        let swiperContainers = 'swiper-containerss';
        let props = this.props;
        let keys = props.selectorData;
        let tags = keys.map((selector, index) => {
            return (
                <Selector
                    key={index}
                    data={selector}
                    onclick={(k,subKey) => props.onSelectClick(k,subKey)}
                    isActivated={selector.key == props.currentSelector.key}
                />
            )
        });

        let chosentags = keys.filter(seletor => seletor.key == props.currentSelector.key);
        let subTags = '';
        if(chosentags && chosentags.length > 0){
            subTags = chosentags[0].subSelector.map((s,index)=>{
                return (
                    <li key={index} className={"subSelector font14 " + (s == props.currentSelector.subKey ? 'actived' : '')} onClick={(k,subKey) => props.onSelectClick(props.currentSelector.key,s)}>
                        {s}
                    </li>
                )
            })
        }
        return (
            <div>
                <ul className="selectorContainer" onClick={this._onclick.bind(this)}>
                    <Swiper swiperConfig={swiperConfig} swiperContainer={swiperContainer}>
                        {tags}
                    </Swiper>
                </ul>
                <ul className="selectorContainer sub">
                    <Swiper swiperConfig={swiperConfigs} swiperContainer={swiperContainers}>
                        {subTags}
                    </Swiper>
                </ul>
            </div>

        )
    }
}

SelectorContainer.PropTypes = {
    selectorData:React.PropTypes.Array,
    currentSelector:React.PropTypes.object,
};

SelectorContainer.defaultProps = {
    selectorData:[],
    currentSelector :{
        key : '',
        subKey : ''
    }
};