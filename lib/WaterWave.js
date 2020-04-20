'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rafDom = require('raf-dom');

var _events = require('./events');

var events = _interopRequireWildcard(_events);

var _Ripple = require('./Ripple');

var _Ripple2 = _interopRequireDefault(_Ripple);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WATER_DURATION_CLASS = 'water-wave-canvas-duration';

var root = typeof window === 'undefined' ? global : window;

var Water = function (_Component) {
    _inherits(Water, _Component);

    function Water() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Water);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Water.__proto__ || Object.getPrototypeOf(Water)).call.apply(_ref, [this].concat(args))), _this), _this.ripples = [], _this.createWave = function (ev) {
            var canvas = _this.refs.canvas;
            var canvasParent = canvas.parentNode;
            var disabled = typeof _this.props.disabled === 'boolean' ? _this.props.disabled : canvasParent.disabled;

            if (!disabled) {
                var dpr = root.devicePixelRatio || 1;

                var _canvasParent$getBoun = canvasParent.getBoundingClientRect(),
                    top = _canvasParent$getBoun.top,
                    left = _canvasParent$getBoun.left,
                    width = _canvasParent$getBoun.width,
                    height = _canvasParent$getBoun.height;

                var clientX = ev.clientX,
                    clientY = ev.clientY;

                var pointX = clientX - left;
                var pointY = clientY - top;
                var _canvas = _this.refs.canvas;
                var ctx = _canvas.getContext('2d');
                var _this$props = _this.props,
                    press = _this$props.press,
                    stopPropagation = _this$props.stopPropagation;

                var _this$getOrigin = _this.getOrigin(width, height),
                    _this$getOrigin2 = _slicedToArray(_this$getOrigin, 2),
                    x = _this$getOrigin2[0],
                    y = _this$getOrigin2[1];

                if (!_this.dispatchEvent(stopPropagation)) {
                    //事件被取消，则不触发效果
                    return;
                }

                _canvas.width = width * dpr;
                _canvas.height = height * dpr;

                ctx.scale(dpr, dpr);
                _canvas.classList.add(WATER_DURATION_CLASS);

                var startTime = Date.now();

                _this.ripples.push(new _Ripple2.default(ctx, isNaN(x) ? pointX : x, isNaN(y) ? pointY : y, width, height, startTime, true, _this.props));

                var run = function run() {
                    (0, _rafDom.cancelAnimationFrame)(_this.timer);

                    ctx.clearRect(0, 0, width, height);
                    _this.ripples = _this.ripples.filter(function (ripple) {
                        return ripple.render();
                    });

                    if (_this.ripples.length) {
                        _this.timer = (0, _rafDom.requestAnimationFrame)(run);
                    } else if (press === 'down' && _this.startState) {
                        _this.clearShadow = function () {
                            delete _this.clearShadow;

                            _canvas.classList.remove(WATER_DURATION_CLASS);
                        };
                    } else {
                        _canvas.classList.remove(WATER_DURATION_CLASS);
                    }
                };

                run();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Water, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var canvasParent = this.refs.canvas.parentNode;

            var _root$getComputedStyl = root.getComputedStyle(canvasParent, null),
                position = _root$getComputedStyl.position;

            if (position === 'static') {
                canvasParent.style.position = 'relative';
            }

            canvasParent.style.webkitTapHighlightColor = 'rgba(0,0,0,0)';

            Object.keys(events.event2code).forEach(function (type) {
                canvasParent.addEventListener(type, _this2, false);
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _this3 = this;

            var canvasParent = this.refs.canvas.parentNode;

            (0, _rafDom.cancelAnimationFrame)(this.timer);
            clearTimeout(this.clearTimer);

            canvasParent.style.webkitTapHighlightColor = null;

            Object.keys(events.event2code).forEach(function (type) {
                canvasParent.removeEventListener(type, _this3, false);
            });
        }
    }, {
        key: 'handleEvent',
        value: function handleEvent(ev) {
            var _this4 = this;

            var code = events.getCode(ev.type);
            var group = events.getGroup(ev.type);
            var press = this.props.press;


            switch (code) {
                case 0:
                    if (!this.eventGroup) {
                        this.eventGroup = group;
                    }

                case 2:
                case 3:
                case 4:
                case 5:
                    //确保前后一致的事件类型
                    if (this.eventGroup === group || code > 3) {
                        var _ev = events.format(ev);
                        var pageX = _ev.pageX,
                            pageY = _ev.pageY;


                        clearTimeout(this.clearTimer);

                        if (code === 0) {
                            if (!this.startState) {
                                this.startState = {
                                    pageX: pageX,
                                    pageY: pageY
                                };
                            }

                            if (press === 'down') {
                                setTimeout(function () {
                                    return _this4.startState && _this4.createWave(_ev);
                                }, 0);
                            }
                        } else {
                            if (press === 'up' && code === 2) {
                                if (this.startState && Math.abs(pageX - this.startState.pageX) < 10 && Math.abs(pageY - this.startState.pageY) < 10) {
                                    this.createWave(_ev);
                                }
                            }

                            if (press === 'down') {
                                if (this.clearShadow) {
                                    this.clearShadow();
                                }
                            }

                            this.clearEvent();
                        }
                    }

                    break;
                case 6:
                    if (ev.target !== this.refs.canvas.parentNode && (ev.detail.shouldCancel || ev.defaultPrevented)) {
                        this.clearEvent();
                    }

                    break;
            }
        }
    }, {
        key: 'clearEvent',
        value: function clearEvent() {
            var _this5 = this;

            if (this.ripples.length) {
                this.ripples.slice(-1)[0].pressUp();
            }

            delete this.startState;

            this.clearTimer = setTimeout(function () {
                delete _this5.eventGroup;
            }, 500);
        }
    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent() {
            var stopPropagation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var ev = void 0;

            if (typeof root.CustomEvent === 'function') {
                ev = new CustomEvent('waterwave', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        shouldCancel: stopPropagation
                    }
                });
            } else {
                ev = document.createEvent('CustomEvent');

                ev.initCustomEvent('waterwave', true, true, {
                    shouldCancel: stopPropagation
                });
            }

            return this.refs.canvas.parentNode.dispatchEvent(ev);
        }
    }, {
        key: 'getOrigin',
        value: function getOrigin(width, height) {
            var ret = this.props.origin.split(/\s+/);
            var left = this.getPoint(ret[0], width);
            var top = this.getPoint(ret[1], height);

            return [left, top];
        }
    }, {
        key: 'getPoint',
        value: function getPoint() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';
            var size = arguments[1];

            var numOrPer = name;

            if (/^\d+%?$/.test(name) === false) {
                switch (name) {
                    case 'top':
                    case 'left':
                        numOrPer = '0';
                        break;
                    case 'right':
                    case 'bottom':
                        numOrPer = '100%';
                        break;
                    case 'center':
                        numOrPer = '50%';
                        break;
                }
            }

            return parseFloat(numOrPer) * (numOrPer.substr(-1) === '%' ? size / 100 : 1);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('canvas', { ref: 'canvas', className: 'water-wave-canvas' });
        }
    }]);

    return Water;
}(_react.Component);

Water.defaultProps = {
    duration: 550,
    color: '#fff',
    origin: 'auto',
    radius: 'auto',
    alpha: 0.3,
    press: 'up',
    effect: 'ripple'
};
Water.propTypes = {
    duration: _propTypes2.default.number.isRequired,
    color: _propTypes2.default.string.isRequired,
    disabled: _propTypes2.default.bool,
    origin: _propTypes2.default.string.isRequired,
    radius: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['auto']), _propTypes2.default.number]).isRequired,
    alpha: _propTypes2.default.number.isRequired,
    press: _propTypes2.default.oneOf(['up', 'down']).isRequired,
    effect: _propTypes2.default.oneOf(['ripple', 'wave', 'starLight', 'petal', 'helix']).isRequired,
    stopPropagation: _propTypes2.default.bool
};
exports.default = Water;