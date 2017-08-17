var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { requestAnimationFrame, cancelAnimationFrame } from 'raf-dom';

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
            var position = window.getComputedStyle(this.refs.canvas.parentNode, null).position;

            if (position === 'static') {
                this.refs.canvas.parentNode.style.position = 'relative';
            }

            this.refs.canvas.parentNode.addEventListener('click', this.createWave, false);
            this.refs.canvas.parentNode.classList.add('water-wave-target');
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            cancelAnimationFrame(this.timer);
            this.refs.canvas.parentNode.removeEventListener('click', this.createWave, false);
            this.refs.canvas.parentNode.classList.remove('water-wave-container');
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