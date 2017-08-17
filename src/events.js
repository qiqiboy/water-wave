export const event2code = {
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
}

export const getCode = type =>
    event2code[type.toLowerCase()];

export const getGroup = type =>
    type.toLowerCase().match(/(touch|pointer|mouse)/i)[0];

export const format = ev => {
    const group = getGroup(ev.type);

    if (group === 'touch') {
        const { clientX, clientY } = ev.changedTouches.item(0);

        return Object.assign(ev, {
            clientX,
            clientY
        });
    }

    return ev;
}
