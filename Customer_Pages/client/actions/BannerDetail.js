import fetch from 'isomorphic-fetch';
import * as BannerDetailActionType from '../actionTypes/BannerDetail'
import * as messageAction from './Message'
const domain = ENV.domain;
export function initBannerDetail(storeId,campaignId) {
    return (dispatch) => {
        dispatch(initStart());
        fetch(domain + '/web/buyer_api/get_campaign_detail.action',{
            credentials : 'include',
            method : 'POST',
            mode : 'cors',
            body : JSON.stringify({
                store_id : storeId,
                campaign_id : campaignId
            })
        }).then((response) => response.json())
            .then(
                json => {
                    if(json.is_succ){
                        dispatch(initSuccess(Object.assign({},{products:json.products},{bannerImg:json.banner})))
                    }else{
                        dispatch(messageAction.setMessage({errorMessage:json.error_message}))
                    }
                }
            ).catch(e=>dispatch(messageAction.setMessage({errorMessage:'服务器问题'}))
        )
    }
}

function initStart() {
    return {
        type : BannerDetailActionType.INIT_BANNERDETAIL_START
    }
}

function initSuccess(content) {
    return {
        type : BannerDetailActionType.INIT_BANNERDETAIL_SUCCESS,
        content
    }

}