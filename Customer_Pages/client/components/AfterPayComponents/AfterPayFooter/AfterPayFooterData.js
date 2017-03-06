"use strict";

const ORDER_NORMAL = 1; //出货完成  绿色对勾 fa-check
const ORDER_WRONG = 2 ; //出货异常  红色叹号 fa-exclamation
const ORDER_WILLOUT = 0 ; //尚未出货
const ORDER_ALREADYOUT = 3; //已经出货
const ORDER_OUTING = 4; //正在出货 红色三个点 fa-ellipsis-h

let mock = [
    {
        status: ORDER_ALREADYOUT,
        id : 1,
        images : [
            './1.jpg',
            './1.jpg',
            './1.jpg',
            './1.jpg',
            './1.jpg',
        ]
    },
    {
        status: ORDER_OUTING,
        id : 2,
        images : [
            './1.jpg',
            './1.jpg',
            './1.jpg',
        ]
    },
    {
        status: ORDER_WILLOUT,
        id : 3,
        images : [
            './1.jpg',
            './1.jpg',
            './1.jpg',
        ]
    },
    {
        status: ORDER_WILLOUT,
        id : 4,
        images : [
            './1.jpg',
            './1.jpg',
            './1.jpg',
        ]
    },
    {
        status: ORDER_WILLOUT,
        id : 5,
        images : [
            './1.jpg',
            './1.jpg',
            './1.jpg',
        ]
    },
    {
        status: ORDER_WILLOUT,
        id : 6,
        images : [
            './1.jpg',
            './1.jpg',
            './1.jpg',
        ]
    },

];

export default mock;