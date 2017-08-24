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

            ctx.beginPath();

            if (effect === 'ripple') {
                //画圆
                ctx.arc(x, y, ratio * maxRadius, 0, 2 * Math.PI, false);
            } else {
                //画波纹 effect = 'wave'
                var angle = offset / 3 * Math.PI / 180;
                var waveSize = (height - y) * (1 - ratio);
                var delta = Math.sin(angle) * waveSize;
                var deltaRight = Math.cos(angle) * waveSize;
                var waveY = (1 - ratio) * y;

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
    }]);

    return Ripple;
}();

export default Ripple;