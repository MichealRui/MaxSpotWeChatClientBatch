/**
 * Created by ruibing on 16/8/29.
 */
class WeChatUtil {
    
    static getUrlParam() {
        var arr = window.location.search.substring(1).split("&");
        var res = {};
        arr.forEach(function( value, index ){
            var xObj = value.split("=");
            res[ xObj[0] ] = xObj[1];
        });
        return res;
    }
    
    static setWeXinCode() {
        let urlRes = this.getUrlParam();
        if(urlRes['code']) {
            sessionStorage.wexinCode = urlRes['code'];
            return urlRes['code'];
        } else {
            sessionStorage.wexinCode = "";
            return "";
        }
    }
    
    static getWeXinCode() {
        let code = sessionStorage.wexinCode;
        return  code ? code : ""
    }
    
    static isInWeXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == 'micromessenger';
    }
}

module.exports = WeChatUtil;