import React from 'react';
require('./index.css')


export default class Cart extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            cartActive:'',
            cartTimer : null,
            cartLock : false,
            timer : null,
            currentCount:0,
            maxCount:1000,
            sleepTime:1000,
        };
        this.count = 0;
    }

    componentWillReceiveProps(nextProps){
        // console.log(nextProps);
        if((nextProps.count > this.props.count) && nextProps.count != 0 && !this.state.cartLock){
            this.setState({
                cartActive:'active',
                cartLock : true
            });
            this.state.cartTimer = (
                window.setTimeout( () => {
                    this.setState({
                        cartActive:'',
                        cartLock : false
                    })
                }, 2000)
            )
        }

        if(nextProps.count > 0 && this.count == 0){
            this.countOne();
        }
        if(nextProps.count == 0){
            this.count = 0;
            window.clearTimeout(this.state.timer);
        }
        if(nextProps.beginBack){
            this.countOne()
        }else{
            this.count = 0;
        }
    }

    componentDidMount() {
        if(this.props.count > 0){
            this.countOne()
        }

    }

    componentWillUnmount() {
        window.clearTimeout(this.state.timer);
    }


    countOne(){
        this.count ++ ;
        if(this.count > this.state.maxCount ){
            window.clearTimeout(this.state.timer);
            this.props.remindShow();
        }else{
            this.state.timer = window.setTimeout(()=>this.countOne(),this.state.sleepTime)
        }

    }

    countBack(){
        this.setState({
            currentCount : this.state.currentCount + 1
        });
        if(this.state.currentCount < this.state.maxCount && this.props.count){
            this.state.timer =
                window.setTimeout(() => this.countBack() ,this.state.sleepTime)
        }else{
            this.props.remindShow();
        }
    }

    submitClick(){
        window.clearTimeout(this.state.timer);
        this.props.click()
    }

    render() {
        let props = this.props;
        let style = this.props.cartStyle ? this.props.cartStyle : {}
        return (
            <div className="shoppingCart">
                <div className={"cart "+ this.state.cartActive}>
                    <img src={require("./images/cart.png")} />
                        <span className="countBg"></span>
                        <span className="count font20">{props.count || 0}</span>
                        <div className="money font40"><span className="font18">￥</span>{props.totalPrice || 0}</div>
                </div>
                <div className={"balance " + (this.props.count > 0 ? '' :'bgcolorccc')} onClick={()=>this.submitClick()}>
                    立即结算
                </div>
            </div>
        )
    }
}