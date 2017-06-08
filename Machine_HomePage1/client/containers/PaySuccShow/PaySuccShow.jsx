'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class PaySuccShow extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            cur_pics:1,
        }
    }

    addPicNum(){
        let pic_num = this.state.cur_pics + 1 > 3 ? 3 : this.state.cur_pics + 1;
        this.setState({
            cur_pics:pic_num
        })
    }
    delPicNum(){
        let pic_num = this.state.cur_pics - 1 < 1 ? 1 : this.state.cur_pics - 1;
        this.setState({
            cur_pics:pic_num
        })
    }

    render() {

        return (
            <div className="PaySuccShow">
                <div className="info">
                    <div className={"pics pics1 " +　(this.state.cur_pics ==  1 ? 'active': '')}>
                        <img src={require('./image/01.gif')} alt=""/>
                        <div className="text">
                            <p className="step font34"> 第 <span>1</span>步</p>
                            <p className="infotxt font32">点击“立即取货”</p>
                        </div>
                    </div>
                    <div className={"pics " +　(this.state.cur_pics ==  2 ? 'active': '')}>
                        <img src={require('./image/02.gif')} alt=""/>
                        <div className="text">
                            <p className="step font34"> 第 <span>2</span>步</p>
                            <p className="infotxt font32">进入到二维码页面</p>
                        </div>
                    </div>
                    <div className={"pics " +　(this.state.cur_pics ==  3 ? 'active': '')}>
                        <img src={require('./image/03.gif')} alt=""/>
                        <div className="text">
                            <p className="step font34"> 第 <span>3</span>步</p>
                            <p className="infotxt font32">将二维码对准机器扫码</p>
                        </div>
                    </div>
                    <div className={"lefticon icon " + (this.state.cur_pics > 1 ? 'action': '')} onClick={(e)=>this.delPicNum(e)}><span className="triangle_border_left"></span></div>
                    <div className={"righticon icon " + (this.state.cur_pics < 3 ? 'action': '')} onClick={(e)=>this.addPicNum(e)}><span className="triangle_border_right"></span></div>
                </div>
            </div>

        )
    }
}


