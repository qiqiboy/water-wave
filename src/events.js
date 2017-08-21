export const event2code = 'onpointerdown' in window ? {
    pointerdown: 0,
    //pointermove: 1,
    pointerup: 2,
    pointercancel: 3,
    pointerleave: 4,

    blur: 5
} : {
    touchstart: 0,
    mousedown: 0,

    //touchmove: 1,
    //mousemove: 1,

    touchend: 2,
    mouseup: 2,

    touchcancel: 3,

    mouseleave: 4,

    blur: 5
}

export const getCode = type =>
    event2code[type.toLowerCase()];

export const getGroup = type =>
    type.toLowerCase().match(/(touch|pointer|mouse)/i)[0];

export const format = ev => {
    const group = getGroup(ev.type);

    if (group === 'touch') {
        const { clientX, clientY, pageX, pageY } = ev.changedTouches.item(0);

        return Object.assign(ev, {
            clientX,
            clientY
        }, 'pageX' in ev ? {} : {
            pageX,
            pageY
        });
    }

    return ev;
}
