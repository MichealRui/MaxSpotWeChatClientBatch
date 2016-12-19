import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class ButtonSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activated: 0
        }
    }

    onSubClick(e, index, key, parentKey) {
        this.setState({
            activated:index
        });
        this.props.changeContent(parentKey, key)
    }

    componentWillReceiveProps(nextProps, nextState) {
        // if(JSON.stringify(this.props) != JSON.stringify(nextProps)) { //parent selector has changed
        if(this.props.selectorKey != nextProps.selectorKey){
            this.setState({
                activated:0
            })
        }
    }

    render() {
        let {selector} = this.props;
        let tag = selector.subSelector && selector.subSelector.length != 0 ?
            selector.subSelector.map((s, index) => {
                return (
                    <li key={index}
                           className={
                               "subSelector font26 " + (index == this.state.activated ?'activated' : '')
                           }
                           onClick={(e) => this.onSubClick(e, index, s, selector.key)}
                    >{s}</li>
                )

            }) : '';

        return (
            <ul className="buttonSelectorContainer">
                {tag}
            </ul>
        )
    }
}