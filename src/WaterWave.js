import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { requestAnimationFrame, cancelAnimationFrame } from 'raf-dom';
import * as events from './events';

const WATER_DURATION_CLASS = 'water-wave-canvas-duration';

class Water extends Component {
    componentDidMount() {
        const canvasParent = this.refs.canvas.parentNode;
        const { position } = window.getComputedStyle(canvasParent, null);

        if (position === 'static') {
            canvasParent.style.position = 'relative';
        }

        canvasParent.style.webkitTapHighlightColor = 'rgba(0,0,0,0)';

        Object.keys(events.event2code)
            .forEach(type => {
                canvasParent.addEventListener(type, this, false);
            });
    }

    componentWillUnmount() {
        const canvasParent = this.refs.canvas.parentNode;

        cancelAnimationFrame(this.timer);
        clearTimeout(this.clearTimer);

        canvasParent.style.webkitTapHighlightColor = null;

        Object.keys(events.event2code)
            .forEach(type => {
                canvasParent.removeEventListener(type, this, false);
            });
    }

    handleEvent(ev) {
        const code = events.getCode(ev.type);
        const group = events.getGroup(ev.type);
        const { press } = this.props;

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
                    const _ev = events.format(ev);
                    const { pageX, pageY } = _ev;

                    clearTimeout(this.clearTimer);

                    if (code === 0) {
                        if (!this.startState) {
                            this.startState = {
                                pageX,
                                pageY
                            }
                        }

                        if (press === 'down') {
                            this.createWave(_ev);
                        }
                    } else {
                        if (press === 'up' && code === 2) {
                            if (this.startState &&
                                Math.abs(pageX - this.startState.pageX) < 10 &&
                                Math.abs(pageY - this.startState.pageY) < 10) {
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

    clearEvent() {
        delete this.startState;
        this.clearTimer = setTimeout(() => {
            delete this.eventGroup;
        }, 500);
    }

    createWave = ev => {
        const canvas = this.refs.canvas;
        const canvasParent = canvas.parentNode;
        const disabled = typeof this.props.disabled === 'boolean' ? this.props.disabled : canvasParent.disabled;

        if (!disabled) {
            const dpr = window.devicePixelRatio || 1;
            const { top, left, width, height } = canvasParent.getBoundingClientRect();
            const { clientX, clientY } = ev;
            const pointX = clientX - left;
            const pointY = clientY - top;
            const canvas = this.refs.canvas;
            const ctx = canvas.getContext('2d');
            const { duration, radius, alpha, press } = this.props;
            const maxRadius = typeof radius === 'number' ? radius :
                Math.sqrt(Math.max(pointX, width - pointX) ** 2 + Math.max(pointY, height - pointY) ** 2);
            const [x, y] = this.getOrigin(width, height);

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            ctx.scale(dpr, dpr);
            canvas.classList.add(WATER_DURATION_CLASS);

            const startTime = Date.now();
            const run = () => {
                const now = Date.now();
                const offset = now - startTime;

                cancelAnimationFrame(this.timer);

                if (offset < duration) {
                    const ratio = offset / duration;
                    const opacity = press === 'down' && this.startState ? alpha : Math.min(alpha, 1 - ratio);

                    ctx.clearRect(0, 0, width, height);
                    this.draw(ctx,
                        isNaN(x) ? pointX : x,
                        isNaN(y) ? pointY : y,
                        ratio * maxRadius,
                        opacity);

                    this.timer = requestAnimationFrame(run);
                } else if (press === 'down' && this.startState) {
                    this.clearShadow = () => {
                        delete this.clearShadow;

                        canvas.classList.remove(WATER_DURATION_CLASS);
                    }
                } else {
                    canvas.classList.remove(WATER_DURATION_CLASS);
                }
            }

            run();
        }
    }

    draw(ctx, x, y, radius, opacity) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.props.color;
        ctx.globalAlpha = opacity;
        ctx.fill();
    }

    getOrigin(width, height) {
        const ret = this.props.origin.split(/\s+/);
        const left = this.getPoint(ret[0], width);
        const top = this.getPoint(ret[1], height);

        return [left, top];
    }

    getPoint(name = 'auto', size) {
        let numOrPer = name;

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

    render() {
        return (
            <canvas ref="canvas" className="water-wave-canvas"></canvas>
        );
    }

    static defaultProps = {
        duration: 500,
        color: '#fff',
        origin: 'auto',
        radius: 'auto',
        alpha: .3,
        press: 'up'
    }

    static propTypes = {
        duration: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        origin: PropTypes.string.isRequired,
        radius: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
        alpha: PropTypes.number.isRequired,
        press: PropTypes.oneOf(['up', 'down']).isRequired
    }
}

export default Water;
