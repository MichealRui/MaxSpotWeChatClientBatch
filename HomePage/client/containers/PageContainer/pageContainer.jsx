'use static';
import React from 'react'
import { connect }  from 'react-redux';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import BottomButton from '../../components/BottomButton/BottomButton';
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
    }
    
    render() {
        let props = this.props.state;
        console.log(props)
        const { dispatch } = this.props;
        return (
            <div>
                <HomeHeader />
                <BannerContainer bannerData={props.banner}/>
                <SelectContainer selectorData={props.selector}
                                 onSelectClick={ key => dispatch(changeSubContent(key))}/>
                <SubContent contentData={props.currentSub} />
                <BottomButton cart={props.cart}/>
            </div>
        )
    }
}

function select(store) {
    console.log('dispatched')
    return Object.assign({}, {state: store})
}

export default connect(select)(PageContainer)