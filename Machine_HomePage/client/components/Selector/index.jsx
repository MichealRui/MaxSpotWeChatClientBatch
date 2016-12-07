'use strict';
import React from 'react';
import SubSelector from '../../components/ButtonSelector/ButtonSelector'
require ('./index.css');

export default class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selector:[]
        }
    }

    setSubSelector(selector) {
        this.setState({
            selector: selector
        })
        this.props.changeContent(selector.key, selector.subSelector[0])
    }

    componentWillReceiveProps(nextProps) {
        // Bad Hack
        if(this.state.selector.length == 0) {
            this.setState({
                selector: nextProps.selector[0]
            })
        }
    }

    render() {
        let props = this.props;
        console.log("in")
        console.log(props)
        let keys = props.selector;
        let tag = keys.map(
            (sel,index)=>{
                return (
                    <li key={index} className={ "selector " }
                        onClick={
                            () => this.setSubSelector(sel)
                        }
                    >
                        <div className={"imageScale " + (props.selectKey == sel.key ? 'active':'')}>
                            <div className={"itemIcon font34 fa "}>
                                <img width='100%' src={sel.image}/>
                            </div>
                            <div className='itemName font24'>
                                <span>{sel.content}</span>
                            </div>
                        </div>
                        <span className={'triangle ' + (props.selectKey == sel.key ? 'action' : '')}></span>
                    </li>
                )
            }
        )

        return (
            <div>
                <ul className="selectorContainer">
                    {tag}
                </ul>
                <SubSelector selector={this.state.selector} changeContent={this.props.changeContent}/>
            </div>
        )
    }
}