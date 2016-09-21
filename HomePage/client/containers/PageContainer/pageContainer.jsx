'use static';
import React from 'react'
import { connect }  from 'react-redux';
import BannerContainer from '../BannerContainer/bannerContainer';
import SelectContainer from '../SelectorContainer/selectorContainer';
import SubContent from '../SubContent/subContent'

class PageContainer extends React.Component {
    constructor(props) {
        super (props)
    }
    
    componentWillMount() {
        
    }
    
    render() {
        let props = this.props.data;
        import { connect }  from 'react-redux';
        return (
            <div>
                <BannerContainer bannerData={props.banner}/>
                <SelectContainer selectorData={props.selector}/>
                <SubContent contentData={props.subContent} />
            </div>
        )
    }
}

function select(state) {
    console.log('dispatched')
    console.log(state)
    return {
        current: state.current,
        content: state.content
    }
}

export default connect(select)(PageContainer)