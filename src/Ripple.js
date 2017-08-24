const Tween = function(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
}

class Ripple {
    constructor(...args) {
        this.rippleData = args;
    }

    pressUp() {
        this.rippleData.splice(-2, 1, false);
    }

    render() {
        const now = Date.now();
        const [ctx,
            x, y, //起始坐标
            width, height, //画布尺寸
            startTime, //开始时间
            keeping, //是否保持按住,
            props
        ] = this.rippleData;
        const { effect, duration, alpha, color } = props;
        const offset = now - startTime;
        const maxDistX = Math.max(x, width - x);
        const maxDistY = Math.max(y, height - y);
        const maxRadius = typeof props.radius === 'number' ? props.radius :
            Math.sqrt(maxDistX ** 2 + maxDistY ** 2);
        const ratio = Math.max(Math.min(1, Tween(offset, 0, 1, duration)), 0);
        const opacity = keeping ? alpha : Math.min(alpha, alpha - (ratio - .7) * alpha / .3);

        ctx.beginPath();

        if (effect === 'ripple') { //画圆
            ctx.arc(x, y, ratio * maxRadius, 0, 2 * Math.PI, false);
        } else { //画波纹 effect = 'wave'
            const angle = offset / 3 * Math.PI / 180;
            const waveSize = (height - y) * (1 - ratio)
            const delta = Math.sin(angle) * waveSize;
            const deltaRight = Math.cos(angle) * waveSize;
            const waveY = (1 - ratio) * y;

            ctx.moveTo(0, waveY + delta);
            ctx.bezierCurveTo(x, waveY + delta - waveSize, x, waveY + deltaRight - waveSize, width, waveY + deltaRight);
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
        }

        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.closePath();
        ctx.fill();

        return offset < duration;
    }
}

export default Ripple;
