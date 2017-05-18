'use strict';
import React from 'react';
import SubSelector from '../../components/ButtonSelector/ButtonSelector'
require ('./index.css');

export default class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selector:[],
            selectorKey:'food'
        }
    }

    setSubSelector(selector) {
        // this.setState({
        //     selector: selector,
        //     selectorKey:selector.key
        // });
        this.props.changeContent(selector.key, selector.subSelector[0])
    }

    // componentWillReceiveProps(nextProps) {
    //     // Bad Hack
    //     if(this.state.selector.length == 0) {
    //         this.setState({
    //             selector: nextProps.selector[0]
    //         })
    //     }
    // }

    render() {
        let props = this.props;
        let keys = props.selector;
        let banners = props.bannerData;
        let channel = props.channelData;
        let channelHtml = channel ? channel.map(
            (cha,index)=>{
                return(
                    <div className={"activityItem "+(cha.type == 1 ? 'new' : 'hot')} key={index}>
                        {
                            cha.type == 1 ? <img src={require('./images/new.png')} alt=""/> : <img src={require('./images/hot.png')} alt=""/>
                        }
                    </div>
                )
            }
        ) : null;
        let bannerHtml = banners ? banners.map((banner,index)=>{
            return (
                <div className="activityItem " key={index}>
                    <img src={banner.imagePath} alt=""/>
                </div>
            )
        }) : null;
        let tag = keys.map(
            (sel,index)=>{
                return (
                    <div key={index} className={ "activityItem contentTag " + (props.currentSelector.key == sel.key ? 'active' : '')  }
                        onClick={
                            () => this.setSubSelector(sel)
                        }
                    >
                        <img src={sel.image} />
                        <div className="contentText font18">{sel.content}</div>

                    </div>
                )
            }
        );
    /*
     <div className={"imageScale " }>
     <div className={"itemIcon font34 fa "}>
     <img width='100%' src={sel.image}/>
     </div>
     <div className='itemName font24'>
     <span>{sel.content}</span>
     </div>
     </div>

        // <div>
        //     <ul className="selectorContainer">
        //         {tag}
        //     </ul>
        //     <SubSelector selector={props.currentSelector}
        //                  changeContent={this.props.changeContent}
        //     />
        // </div>
        */
        return (
            <div className="activityTagsContainer">
                <div className="contentActivityTags">
                    {channelHtml}
                    {bannerHtml}
                    {tag}
                </div>
                <SubSelector selector={props.currentSelector}
                    changeContent={this.props.changeContent}
                />

            </div>
        )
    }
}