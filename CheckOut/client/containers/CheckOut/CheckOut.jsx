'use static';
import React from 'react';
import ConfirmWindow from '../../components/ConfirmWindow/ConfirmWindow';
import QrCode from '../../components/QrCode/QrCode';
import SettleInfo from '../../components/SettleInfo';
import WindowText from '../../components/WindowText';
require('./index.css');

class CheckOut extends React.Component {
    
    constructor(props){
        super(props);
    }
    
    success() {
        
    }
    
    fail() {
        
    }
    
    render(){
        return(
            <div>
                <QrCode settleInfo={SettleInfo}/>
                <ConfirmWindow windowText={WindowText}/>
            </div>
        );
    }
}

export default CheckOut