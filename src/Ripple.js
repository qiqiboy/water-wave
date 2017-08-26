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

        ctx.globalAlpha = opacity;
        ctx.beginPath();

        if (effect === 'wave') { //画波纹 effect = 'wave'
            const angle = offset / 3 * Math.PI / 180; //摆动一个周期需要1080ms
            const waveSize = Math.max(height / 2, height - y) * (1 - ratio);
            const delta = Math.sin(angle) * waveSize;
            const deltaRight = Math.cos(angle) * waveSize;
            const waveY = (1 - ratio) * y;

            ctx.moveTo((x - maxDistX) * ratio, waveY + delta);
            ctx.bezierCurveTo(x, waveY + delta - waveSize,
                x, waveY + deltaRight - waveSize,
                width + (x + maxDistX - width) * ratio, waveY + deltaRight);
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
        } else if (effect === 'petal') {
            const arcSize = ratio * maxRadius;
            const originSize = arcSize * .2; // 花瓣圆心的大小，这里设置为20%。越大画出的花瓣分离度越小

            if (!this.petalNumber) {
                this.petalNumber = parseInt(Math.random() * 17) + 4; //随机出花瓣数量
            }

            const radian = Math.PI * 2 / this.petalNumber; //每个花瓣的弧度大小
            const originX = Math.sin(radian) * originSize;
            const originY = Math.cos(radian) * originSize;
            const x2 = Math.sin(radian) * arcSize;
            const y2 = -Math.cos(radian) * arcSize;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(Math.PI * ratio);
            ctx.moveTo(0, -originY);

            for (let i = 0; i < this.petalNumber; i++) {
                ctx.bezierCurveTo(0, -arcSize, x2, y2, originX, -originY);
                ctx.rotate(radian);
            }

            ctx.restore();
        } else if (effect === 'starLight') { // 画星光 effect = 'starLight'
            const arcSize = ratio * Math.min(width, height, maxRadius);
            ctx.arc(x, y, arcSize, 0, 2 * Math.PI, false);

            if (!this.stars) {
                const number = parseInt(Math.random() * 10) + 10; //随机出星光数量

                this.stars = [];
                for (let i = 0; i < number; i++) {
                    this.stars[i] = Math.random() * maxRadius;
                }
            }

            const radian = Math.PI * 2 / this.stars.length; //每个星星的弧度大小

            ctx.save();
            ctx.translate(x, y); //移动原点
            ctx.moveTo(0, -arcSize);

            this.stars.forEach((size, i) => {
                ctx.rotate(radian / 2);
                ctx.lineTo(0, -arcSize - ratio * size);

                ctx.rotate(radian / 2);
                ctx.lineTo(0, -arcSize);
            });

            ctx.restore();
        } else if (effect === 'helix') { // 螺旋圈 effect = 'helix'
            const minDelta = 2;
            const levels = Math.min(10, parseInt(maxRadius / minDelta));
            const totalDegs = ratio * 360 * (levels + 1);
            const levelSize = maxRadius / levels;

            ctx.save();
            ctx.translate(x, y); //移动原点
            ctx.rotate(offset * Math.PI / 180); //360ms旋转一圈
            ctx.moveTo(0, 0);

            for (let i = 0; i < totalDegs; i++) {
                const radius = i / 360 * levelSize;
                ctx.lineTo(Math.cos(i * Math.PI / 180) * radius, Math.sin(i * Math.PI / 180) * radius);
            }

            ctx.restore();

            ctx.lineWidth = levelSize * ratio;
            ctx.lineCap = 'round';
            ctx.strokeStyle = color;
            ctx.stroke();

            return offset < duration;
        } else { //画圆 effect = 'ripple'
            ctx.arc(x, y, ratio * maxRadius, 0, 2 * Math.PI, false);
        }

        ctx.fillStyle = color;
        ctx.closePath();
        ctx.fill();

        return offset < duration;
    }
}

export default Ripple;
