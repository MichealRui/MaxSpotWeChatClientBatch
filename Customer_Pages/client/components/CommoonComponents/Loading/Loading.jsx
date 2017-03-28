"use strict";
import React from 'react';
require('./index.css')
export default class Loading extends React.Component{
    constructor(props){
        super(props);
        this._show = true;
    }

    static defaultProps = {
        loadingData : {status : true}
    };

    render(){
        const {loadingData} = this.props;
        if(loadingData.status){
            return (
                <div className="loadingPage">
                    <img src={require('./images/loading.gif')} alt=""/>
                </div>
            )
        }else{
            return null;
        }
    }
}