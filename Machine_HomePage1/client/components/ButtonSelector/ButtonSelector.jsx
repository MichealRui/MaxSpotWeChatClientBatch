import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class ButtonSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubClick(key, parentKey) {
        this.props.changeContent(parentKey, key)
    }

    componentWillReceiveProps(nextProps) {
        // if(JSON.stringify(this.props) != JSON.stringify(nextProps)) { //parent selector has changed
        if(this.props.selectorKey != nextProps.selectorKey){
            this.setState({
                activated:0
            })
        }
    }

    /*
     <li key={index}
     className={
     "subSelector font26 " + (s == selector.subKey ?'activated' : '')
     }
     onClick={(e) => this.onSubClick(s, selector.key)}
     >{s}</li>
     */

    render() {
        let {selector} = this.props;
        let tag = selector.subSelector && selector.subSelector.length != 0 ?
            selector.subSelector.map((s, index) => {
                return (
                    <div key={index} className={"subTag font20 "+(s == selector.subKey ?'active' : '')} onClick={(e) => this.onSubClick(s, selector.key)} >{s}</div>
                )

            }) : '';

        return (
            <div className="subTags">
                <div className="subTag active font20">全部</div>
                {tag}
            </div>
        )
    }
}

ButtonSelector.defaultProps = {
    selector:{
        subSelector:[]
    }
};