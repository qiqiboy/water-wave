var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tween = function Tween(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
};

var Ripple = function () {
    function Ripple() {
        _classCallCheck(this, Ripple);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        this.rippleData = args;
    }

    _createClass(Ripple, [{
        key: 'pressUp',
        value: function pressUp() {
            this.rippleData.splice(-2, 1, false);
        }
    }, {
        key: 'render',
        value: function render() {
            var now = Date.now();

            var _rippleData = _slicedToArray(this.rippleData, 8),
                ctx = _rippleData[0],
                x = _rippleData[1],
                y = _rippleData[2],
                //起始坐标
            width = _rippleData[3],
                height = _rippleData[4],
                //画布尺寸
            startTime = _rippleData[5],
                //开始时间
            keeping = _rippleData[6],
                //是否保持按住,
            props = _rippleData[7];

            var effect = props.effect,
                duration = props.duration,
                alpha = props.alpha,
                color = props.color;

            var offset = now - startTime;
            var maxDistX = Math.max(x, width - x);
            var maxDistY = Math.max(y, height - y);
            var maxRadius = typeof props.radius === 'number' ? props.radius : Math.sqrt(Math.pow(maxDistX, 2) + Math.pow(maxDistY, 2));
            var ratio = Math.max(Math.min(1, Tween(offset, 0, 1, duration)), 0);
            var opacity = keeping ? alpha : Math.min(alpha, alpha - (ratio - .7) * alpha / .3);

            ctx.globalAlpha = opacity;
            ctx.beginPath();

            if (effect === 'wave') {
                //画波纹 effect = 'wave'
                var angle = offset / 3 * Math.PI / 180; //摆动一个周期需要1080ms
                var waveSize = Math.max(height / 2, height - y) * (1 - ratio);
                var delta = Math.sin(angle) * waveSize;
                var deltaRight = Math.cos(angle) * waveSize;
                var waveY = (1 - ratio) * y;

                ctx.moveTo((x - maxDistX) * ratio, waveY + delta);
                ctx.bezierCurveTo(x, waveY + delta - waveSize, x, waveY + deltaRight - waveSize, width + (x + maxDistX - width) * ratio, waveY + deltaRight);
                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
            } else if (effect === 'petal') {
                var petalSize = typeof props.radius === 'number' ? props.radius : ratio * Math.max(width, height) / 2;
                var originSize = petalSize * .5; // 花瓣圆心的大小，这里设置为5%。越大画出的花瓣分离度越小

                if (!this.petalNumber) {
                    this.petalNumber = parseInt(Math.random() * 17) + 4; //随机出花瓣数量
                }

                var radian = Math.PI * 2 / this.petalNumber; //每个花瓣的弧度大小
                var originX = Math.sin(radian) * originSize;
                var originY = -Math.cos(radian) * originSize;
                var arcSize = petalSize / Math.cos(radian / 2) * 1.3;
                var x2 = Math.sin(radian) * arcSize;
                var y2 = -Math.cos(radian) * arcSize;

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(Math.PI * ratio);
                ctx.moveTo(0, originY);

                for (var i = 0; i < this.petalNumber; i++) {
                    ctx.bezierCurveTo(0, -arcSize, x2, y2, originX, originY);
                    ctx.rotate(radian);
                }

                ctx.restore();
            } else if (effect === 'starLight') {
                // 画星光 effect = 'starLight'
                var _arcSize = ratio * Math.min(width, height, maxRadius);
                ctx.arc(x, y, _arcSize, 0, 2 * Math.PI, false);

                if (!this.stars) {
                    var number = parseInt(Math.random() * 10) + 10; //随机出星光数量

                    this.stars = [];
                    for (var _i = 0; _i < number; _i++) {
                        this.stars[_i] = Math.random() * maxRadius;
                    }
                }

                var _radian = Math.PI * 2 / this.stars.length; //每个星星的弧度大小

                ctx.save();
                ctx.translate(x, y); //移动原点
                ctx.moveTo(0, -_arcSize);

                this.stars.forEach(function (size, i) {
                    ctx.rotate(_radian / 2);
                    ctx.lineTo(0, -_arcSize - ratio * size);

                    ctx.rotate(_radian / 2);
                    ctx.lineTo(0, -_arcSize);
                });

                ctx.restore();
            } else if (effect === 'helix') {
                // 螺旋圈 effect = 'helix'
                var minDelta = 2;
                var levels = Math.min(10, parseInt(maxRadius / minDelta));
                var totalDegs = ratio * 360 * (levels + 1);
                var levelSize = maxRadius / levels;

                ctx.save();
                ctx.translate(x, y); //移动原点
                ctx.rotate(offset * Math.PI / 180); //360ms旋转一圈
                ctx.moveTo(0, 0);

                for (var _i2 = 0; _i2 < totalDegs; _i2++) {
                    var radius = _i2 / 360 * levelSize;
                    ctx.lineTo(Math.cos(_i2 * Math.PI / 180) * radius, Math.sin(_i2 * Math.PI / 180) * radius);
                }

                ctx.restore();

                ctx.lineWidth = levelSize * ratio;
                ctx.lineCap = 'round';
                ctx.strokeStyle = color;
                ctx.stroke();

                return offset < duration;
            } else {
                //画圆 effect = 'ripple'
                ctx.arc(x, y, ratio * maxRadius, 0, 2 * Math.PI, false);
            }

            ctx.fillStyle = color;
            ctx.closePath();
            ctx.fill();

            return offset < duration;
        }
    }]);

    return Ripple;
}();

export default Ripple;