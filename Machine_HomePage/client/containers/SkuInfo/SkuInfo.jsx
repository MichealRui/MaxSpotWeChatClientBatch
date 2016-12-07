'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import image from '../../components/Gallery/images/product-3.jpg'
require('./index.css')

export default class skuInfo extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        let sku_detail = (
            <div>
                <div className="comment ">
                    <div className="circle_img"><img src={image} /></div>
                    <div className="comment_text">
                        <p className="font26">爱跑步的女孩</p>
                        <p className="font26">“这是我吃过最好吃的面包干，没有之一”
                        </p>
                    </div>
                </div>
                <div className="item_info comment_text font26">Lipo蛋奶酥脆面包干来自越南，是风靡全球的美味零食，纯正的蛋奶香味让人心旷神怡，酥脆的面包干让你瞬间动力十足。纯正的蛋奶香味让人心旷神怡，酥脆的面包干让你瞬间动力十足。纯正的蛋奶香味让人心旷神怡.酥脆的面包干让你瞬间动力十足。
                </div>
            </div>
        )

        let sku_about = (
            <div className="clearfix">
                <img className="square_img" src={image} />
                <div className="comment_text font24">“不二家”是日本的一家食品生产商，成立于1910年产品包括泡芙、巧克力等，至今是广受大家新来和喜爱的一家特色店，真的是一家很了不起历史悠久的老点，质量品质都么有问题，绝对靠谱，很了不起，很了不起，绝对靠谱，没错，赶紧来买吧来买吧</div>
            </div>
        )

        return (

            <div className="skuInfo_popup">
                <div>
                    <div className="tag sku_detail_tag active font27">商品详情</div>
                    <div className="tag sku_about_tag font27">关于Lipe</div>
                    <div className="sku_detail hide">
                        {sku_detail}
                    </div>
                    <div className="sku_about">
                        {sku_about}
                    </div>
                </div>
            </div>


        )

    }

}


