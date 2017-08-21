var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { requestAnimationFrame, cancelAnimationFrame } from 'raf-dom';
import * as events from './events';

var WATER_DURATION_CLASS = 'water-wave-canvas-duration';

var Water = function (_Component) {
    _inherits(Water, _Component);

    function Water() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Water);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Water.__proto__ || Object.getPrototypeOf(Water)).call.apply(_ref, [this].concat(args))), _this), _this.createWave = function (ev) {
            var canvas = _this.refs.canvas;
            var canvasParent = canvas.parentNode;
            var disabled = typeof _this.props.disabled === 'boolean' ? _this.props.disabled : canvasParent.disabled;

            if (!disabled) {
                var dpr = window.devicePixelRatio || 1;

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
                    duration = _this$props.duration,
                    radius = _this$props.radius,
                    alpha = _this$props.alpha,
                    press = _this$props.press;

                var maxRadius = typeof radius === 'number' ? radius : Math.max(width, height);

                var _this$getOrigin = _this.getOrigin(width, height),
                    _this$getOrigin2 = _slicedToArray(_this$getOrigin, 2),
                    x = _this$getOrigin2[0],
                    y = _this$getOrigin2[1];

                _canvas.width = width * dpr;
                _canvas.height = height * dpr;

                ctx.scale(dpr, dpr);
                _canvas.classList.add(WATER_DURATION_CLASS);

                var startTime = Date.now();
                var run = function run() {
                    var now = Date.now();
                    var offset = now - startTime;

                    cancelAnimationFrame(_this.timer);

                    if (offset < duration) {
                        var ratio = offset / duration;
                        var opacity = press === 'down' && _this.startState ? alpha : Math.min(alpha, 1 - ratio);

                        ctx.clearRect(0, 0, width, height);
                        _this.draw(ctx, isNaN(x) ? pointX : x, isNaN(y) ? pointY : y, ratio * maxRadius, opacity);

                        _this.timer = requestAnimationFrame(run);
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

            var _window$getComputedSt = window.getComputedStyle(canvasParent, null),
                position = _window$getComputedSt.position;

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

            cancelAnimationFrame(this.timer);
            clearTimeout(this.clearTimer);

            canvasParent.style.webkitTapHighlightColor = null;

            Object.keys(events.event2code).forEach(function (type) {
                canvasParent.removeEventListener(type, _this3, false);
            });
        }
    }, {
        key: 'handleEvent',
        value: function handleEvent(ev) {
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
                                this.createWave(_ev);
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
                case 3:
                    this.clearEvent();
                    break;
            }
        }
    }, {
        key: 'clearEvent',
        value: function clearEvent() {
            var _this4 = this;

            delete this.startState;
            this.clearTimer = setTimeout(function () {
                delete _this4.eventGroup;
            }, 500);
        }
    }, {
        key: 'draw',
        value: function draw(ctx, x, y, radius, opacity) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.props.color;
            ctx.globalAlpha = opacity;
            ctx.fill();
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
            return React.createElement('canvas', { ref: 'canvas', className: 'water-wave-canvas' });
        }
    }]);

    return Water;
}(Component);

Water.defaultProps = {
    duration: 500,
    color: '#fff',
    origin: 'auto',
    radius: 'auto',
    alpha: .3,
    press: 'up'
};
Water.propTypes = {
    duration: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    origin: PropTypes.string.isRequired,
    radius: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
    alpha: PropTypes.number.isRequired,
    press: PropTypes.oneOf(['up', 'down']).isRequired
};


export default Water;