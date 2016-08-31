'use static';
import React from 'react';
import ConfirmWindow from '../../components/ConfirmWindow/ConfirmWindow';
import QrCode from '../../components/QrCode/QrCode';
import WindowText from '../../components/WindowText';
require('./index.css');

class CheckOut extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            isSuccess:true
        };
    }
    
    acknowledgedFalse() {
        this.setState({
            isSuccess:false
        })
    }
    
    acknowledgedTrue() {
        this.setState({
            isSuccess:true
        })
    }
    
    render(){
        return(
            <div>
                <QrCode order={this.props.order} onFailClick={this.acknowledgedFalse.bind(this)}/>
                <ConfirmWindow windowText={WindowText}
                               isHidden={this.state.isSuccess}
                               hideClick={this.acknowledgedTrue.bind(this)}/>
            </div>
        );
    }
}

export default CheckOut