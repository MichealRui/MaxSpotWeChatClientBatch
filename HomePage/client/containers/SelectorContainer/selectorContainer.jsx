'use static';
import React from 'react'
import Selector from '../../components/Selector'
require('./index.css');

export default class SelectorContainer extends React.Component {
    constructor(props) {
        super (props)
    }
    
    render() {
        let keys = this.props.selectorData;
        let tags = keys.map((key, index) => {
            return <Selector key={index} data={key}/>
        });
        return (
            <ul className="selectorContainer">
                <li className="selector J_all">
                    <span>
                        全部
                    </span>
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