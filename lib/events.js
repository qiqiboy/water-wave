export var event2code = {
    touchstart: 0,
    pointerdown: 0,
    mousedown: 0,

    touchmove: 1,
    pointermove: 1,
    mousemove: 1,

    touchend: 2,
    pointerup: 2,
    mouseup: 2,

    touchcancel: 3,
    pointercancel: 3
};

export var getCode = function getCode(type) {
    return event2code[type.toLowerCase()];
};

export var getGroup = function getGroup(type) {
    return type.toLowerCase().match(/(touch|pointer|mouse)/i)[0];
};

export var format = function format(ev) {
    var group = getGroup(ev.type);

    if (group === 'touch') {
        var _ev$changedTouches$it = ev.changedTouches.item(0),
            clientX = _ev$changedTouches$it.clientX,
            clientY = _ev$changedTouches$it.clientY,
            pageX = _ev$changedTouches$it.pageX,
            pageY = _ev$changedTouches$it.pageY;

        return Object.assign(ev, {
            clientX: clientX,
            clientY: clientY,
            pageX: pageX,
            pageY: pageY
        });
    }

    return ev;
};