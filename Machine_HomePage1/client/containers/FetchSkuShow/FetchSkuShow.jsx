'use strict';
import React from 'react';

require('./index.css');

export default class FetchSkuShow extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            fetch_cur_pics:1,
        }
    }

    addPicNum(){
        let pic_num = this.state.fetch_cur_pics + 1 > 4 ? 4 : this.state.fetch_cur_pics + 1;
        this.setState({
            fetch_cur_pics:pic_num
        })
    }
    delPicNum(){
        let pic_num = this.state.fetch_cur_pics - 1 < 1 ? 1 : this.state.fetch_cur_pics - 1;
        this.setState({
            fetch_cur_pics:pic_num
        })
    }

    render() {
        return (
            <div className="FetchSkuShow">
                <div className="info">
                    <div className={"pics pics1 " +　(this.state.fetch_cur_pics ==  1 ? 'active': '')}>
                        <p className="step font34"> 第 <span>1</span>步</p>
                        <img src={require('./image/01.gif')} alt=""/>
                        <p className="infotxt font32">在微信“怪兽家便利店”进入购买记录页，找到你要取货的订单。</p>
                    </div>
                    <div className={"pics " +　(this.state.fetch_cur_pics ==  2 ? 'active': '')}>
                        <p className="step font34"> 第 <span>2</span>步</p>
                        <img src={require('./image/02.gif')} alt=""/>
                        <p className="infotxt font32">在订单详情页点击“立即取货”，得到取货二维码。</p>
                    </div>
                    <div className={"pics " +　(this.state.fetch_cur_pics ==  3 ? 'active': '')}>
                        <p className="step font34"> 第 <span>3</span>步</p>
                        <img src={require('./image/03.gif')} alt=""/>
                        <p className="infotxt font32">将手机上二维码对准机器的扫码区扫码</p>
                    </div>
                    <div className={"pics " +　(this.state.fetch_cur_pics ==  4 ? 'active': '')}>
                        <p className="step font34"> 第 <span>4</span>步</p>
                        <img src={require('./image/04.gif')} alt=""/>
                        <p className="infotxt font32">扫码成功请在出货口取货</p>
                    </div>
                    <div className={"lefticon icon " + (this.state.fetch_cur_pics > 1 ? 'action': '')}
                         onClick={(e)=>this.delPicNum(e)}
                    >
                        <span className="triangle_border_left"></span>
                    </div>
                    <div className={"righticon icon " + (this.state.fetch_cur_pics < 4 ? 'action': '')}
                         onClick={(e)=>this.addPicNum(e)}
                    >
                        <span className="triangle_border_right"></span>
                    </div>
                </div>
            </div>

        )
    }
}


