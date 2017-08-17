var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { requestAnimationFrame, cancelAnimationFrame } from 'raf-dom';
import * as events from './events';

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
            if (!_this.refs.canvas.parentNode.disabled) {
                var dpr = window.devicePixelRatio || 1;

                var _this$refs$canvas$par = _this.refs.canvas.parentNode.getBoundingClientRect(),
                    top = _this$refs$canvas$par.top,
                    left = _this$refs$canvas$par.left,
                    width = _this$refs$canvas$par.width,
                    height = _this$refs$canvas$par.height;

                var clientX = ev.clientX,
                    clientY = ev.clientY;

                var x = clientX - left;
                var y = clientY - top;
                var canvas = _this.refs.canvas;
                var ctx = canvas.getContext('2d');
                var duration = _this.props.duration;


                canvas.width = width * dpr;
                canvas.height = height * dpr;

                ctx.scale(dpr, dpr);

                var startTime = Date.now();
                var run = function run() {
                    var now = Date.now();
                    var offset = now - startTime;

                    cancelAnimationFrame(_this.timer);
                    ctx.clearRect(0, 0, width, height);

                    if (offset < duration) {
                        _this.draw(ctx, x, y, offset / duration * Math.max(width, height), Math.min(.3, 1 - offset / duration));

                        _this.timer = requestAnimationFrame(run);
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
            var position = window.getComputedStyle(canvasParent, null).position;

            if (position === 'static') {
                canvasParent.style.position = 'relative';
            }

            canvasParent.classList.add('water-wave-target');

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
            canvasParent.classList.remove('water-wave-container');

            Object.keys(events.event2code).forEach(function (type) {
                canvasParent.removeEventListener(type, _this3, false);
            });
        }
    }, {
        key: 'handleEvent',
        value: function handleEvent(ev) {
            var code = events.getCode(ev.type);
            var group = events.getGroup(ev.type);

            switch (code) {
                case 0:
                    if (!this.eventGroup) {
                        this.eventGroup = group;
                    }
                case 2:
                    //确保前后一致的事件类型
                    if (this.eventGroup === group) {
                        var _ev = events.format(ev);
                        var pageX = _ev.pageX,
                            pageY = _ev.pageY;


                        clearTimeout(this.clearTimer);

                        if (code === 0 && !this.startState) {
                            this.startState = {
                                pageX: pageX,
                                pageY: pageY
                            };
                        }

                        if (code === 2 && this.startState) {
                            if (Math.abs(pageX - this.startState.pageX) < 10 && Math.abs(pageY - this.startState.pageY) < 10) {
                                this.createWave(_ev);
                            }
                        }

                        if (code === 2) {
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
        key: 'render',
        value: function render() {
            return React.createElement('canvas', { ref: 'canvas', className: 'water-wave-canvas' });
        }
    }]);

    return Water;
}(Component);

Water.defaultProps = {
    duration: 500,
    color: '#fff'
};
Water.propTypes = {
    duration: PropTypes.number,
    color: PropTypes.string
};


export default Water;