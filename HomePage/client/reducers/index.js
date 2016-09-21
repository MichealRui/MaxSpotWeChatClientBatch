/**
 * Created by ruibing on 16/9/19.
 */
import { CHANGE_SUBCONTENT } from '../actions/index'
import { INIT_START, INIT_SUCCESS, INIT_FAIL} from '../actions/index'

let bannerdata = [
    {
        destUrl: "",
        imagePath: ""
    },
];

let selector = [
    {key: '', content: '', faIcon: ''},
];

let subContent =
{
    'all':{
        banner:{
            imgPath: '',
            bannerDist: ''
        },
        freeItems: [
            {}, {}, {}
        ],
        items: [
            {},
            {},
            {}
        ]
    }
};

let data = {
    banner: bannerdata,
    selector: selector,
    subContent: subContent,
    currentSub: subContent['all']
};

function changeSubContent(content, key) {
    console.log("change")
    console.log(key)
    let currentSub = content['subContent'][key];
    let newContent = Object.assign({}, content)
    newContent.currentSub = currentSub;
    return newContent
}

function initStart(content) {
    return Object.assign({}, content)
}

function initSuccess(content, data){
    return Object.assign({}, content, {
        banner: data.banner,
        selector: data.selector,
        subContent: data.subContent,
        currentSub: subContent['all'],
        key:"12345",
    })
}

function initFail(content) {
    return Object.assign({}, content, {
        errorMessage: "fail init"
    })
}

export default function (
    content=data, action) {
    switch (action.type) {
        case INIT_START:
            return initStart(content);
        case INIT_SUCCESS:
            return initSuccess(content, action.content);
        case INIT_FAIL:
            return initFail(content);
        case CHANGE_SUBCONTENT:
            return changeSubContent(content, action.key);
        default:
            return content;
    }
}