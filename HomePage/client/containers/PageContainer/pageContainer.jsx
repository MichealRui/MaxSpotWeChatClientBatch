'use static';
import React from 'react'
import { connect }  from 'react-redux';
import BannerContainer from '../BannerContainer/bannerContainer';
import SelectContainer from '../SelectorContainer/selectorContainer';
import SubContent from '../SubContent/subContent'
import { initSubContent, initStart, changeSubContent } from '../../actions/index'

class PageContainer extends React.Component {
    constructor(props) {
        super (props)
    }
    
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(initStart())
        dispatch(initSubContent())
        // this.props.start()
        // this.props.init()
    }
    
    render() {
        console.log(3)
        let props = this.props.test;
        console.log(this.props)
        const { dispatch } = this.props;
        console.log(dispatch);
        return (
            <div>
                <BannerContainer bannerData={props.banner}/>
                <SelectContainer selectorData={props.selector}
                                 onSelectClick={ key => dispatch(changeSubContent(key))}/>
                <SubContent contentData={props.currentSub} />
            </div>
        )
    }
}

function select(store) {
    console.log('dispatched')
    return Object.assign({}, {test: store})
}

export default connect(select)(PageContainer)