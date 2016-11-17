'use static';
import React from 'react'
import Selector from '../../components/Selector'
import icon_all from './image/icon_1.png'
require('./index.css');

export default class SelectorContainer extends React.Component {
    constructor(props) {
        super (props)
        this.state={
            activated:[]
        }
    }

    onclick(e) {
        let key = e.target.getAttribute("data-key");
        key?this.props.onSelectClick(key) : false;
    }

    render() {
        let keys = this.props.selectorData;
        console.log(this.props.currentKey)
        let tags = keys.map((selector, index) => {
            return (
                <Selector
                    key={index}
                    data={selector}
                    onclick={(k) => this.props.onSelectClick(k)}
                    isActivated={selector.key == this.props.currentKey}
                />
            )
        });
        let defaultKey = 'all';
        return (
            <ul className="selectorContainer" onClick={this.onclick.bind(this)}>
                <li className="selector J_all" key="all"
                    onClick={() => this.props.onSelectClick(defaultKey)}>
                    <div className={"itemIcon font30"}><img src={icon_all} alt=""/></div>
                    <div className='itemName font14'>全部</div>
                    <span className={"triangle " + (this.props.currentKey == defaultKey? 'activated':'')}
                          data-key={defaultKey}></span>
                </li>
                {tags}
                {/*<li className="selector J_food">*/}
                    {/*<span>*/}
                        {/*零食*/}
                    {/*</span>*/}
                {/*</li>*/}
                {/*<li className="selector J_drink">*/}
                    {/*<span>*/}
                        {/*酒饮*/}
                    {/*</span>*/}
                   {/**/}
                {/*</li>*/}
                {/*<li className="selector J_makeup">*/}
                    {/*<span>*/}
                        {/*美妆*/}
                    {/*</span>*/}
                  {/**/}
                {/*</li>*/}
                {/*<li className="selector J_daily">*/}
                    {/*<span>*/}
                        {/*日用品*/}
                    {/*</span>*/}
                   {/**/}
                {/*</li>*/}
                {/*<li className="selector J_baby">*/}
                    {/*<span>*/}
                        {/*母婴*/}
                    {/*</span>*/}
                {/*</li>*/}
            </ul>
        )
    }
}