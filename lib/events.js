'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var event2code = exports.event2code = 'onpointerdown' in window ? {
    pointerdown: 0,
    //pointermove: 1,
    pointerup: 2,
    pointercancel: 3,
    pointerleave: 4,

    blur: 5,

    waterwave: 6
} : {
    touchstart: 0,
    mousedown: 0,

    //touchmove: 1,
    //mousemove: 1,

    touchend: 2,
    mouseup: 2,

    touchcancel: 3,

    mouseleave: 4,

    blur: 5,

    waterwave: 6
};

var getCode = exports.getCode = function getCode(type) {
    return event2code[type.toLowerCase()];
};

var getGroup = exports.getGroup = function getGroup(type) {
    var ret = type.toLowerCase().match(/(touch|pointer|mouse)/i);
    return ret && ret[0];
};

var format = exports.format = function format(ev) {
    var group = getGroup(ev.type);

    if (group === 'touch') {
        var _ev$changedTouches$it = ev.changedTouches.item(0),
            clientX = _ev$changedTouches$it.clientX,
            clientY = _ev$changedTouches$it.clientY,
            pageX = _ev$changedTouches$it.pageX,
            pageY = _ev$changedTouches$it.pageY;

        return Object.assign(ev, {
            clientX: clientX,
            clientY: clientY
        }, 'pageX' in ev ? {} : {
            pageX: pageX,
            pageY: pageY
        });
    }

    return ev;
};