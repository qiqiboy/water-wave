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

        if (effect === 'wave') { //画波纹 effect = 'wave'
            const angle = offset / 3 * Math.PI / 180;
            const waveSize = Math.max(height / 2, height - y) * (1 - ratio)
            const delta = Math.sin(angle) * waveSize;
            const deltaRight = Math.cos(angle) * waveSize;
            const waveY = (1 - ratio) * y;

            ctx.moveTo(x - maxDistX, waveY + delta);
            ctx.bezierCurveTo(x, waveY + delta - waveSize, x, waveY + deltaRight - waveSize, x + maxDistX, waveY + deltaRight);
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
        } else if (effect === 'petal') {
            const arcSize = ratio * maxRadius;

            if (!this.petalNumber) {
                this.petalNumber = parseInt(Math.random() * 7) + 4; //随机出花瓣数量
            }

            const angle = Math.PI * 2 / this.petalNumber; //每个花瓣的角度大小
            const x2 = Math.sin(angle) * arcSize;
            const y2 = -Math.cos(angle) * arcSize;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(Math.PI * ratio);
            ctx.moveTo(0, 0);

            for (let i = 0; i < this.petalNumber; i++ ) {
                ctx.bezierCurveTo(0, -arcSize, x2, y2, 0, 0);
                ctx.rotate(angle);
            }

            ctx.restore();
        } else if (effect === 'starLight'){ // 画星光 effect = 'starLight'
            const arcSize = ratio * Math.min(width, height);
            ctx.arc(x, y, arcSize, 0, 2 * Math.PI, false);

            if (!this.stars) {
                const number = parseInt(Math.random() * 10) + 10; //随机出星光数量

                this.stars = [];
                for (let i = 0; i < number; i++) {
                    this.stars[i] = Math.random() * maxRadius;
                }
            }

            const angle = Math.PI * 2 / this.stars.length; //每个星星的角度大小

            ctx.save();
            ctx.translate(x, y); //移动原点
            ctx.moveTo(0, -arcSize);

            this.stars.forEach((size, i) => {
                ctx.rotate(angle / 2);
                ctx.lineTo(0, -arcSize - ratio * size);

                ctx.rotate(angle / 2);
                ctx.lineTo(0, -arcSize);
            });

            ctx.restore();
        } else { //画圆 effect = 'ripple'
            ctx.arc(x, y, ratio * maxRadius, 0, 2 * Math.PI, false);
        }

        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.closePath();
        ctx.fill();

        return offset < duration;
    }
}

export default Ripple;
