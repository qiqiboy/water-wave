import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { requestAnimationFrame, cancelAnimationFrame } from 'raf-dom';
import * as events from './events';

class Water extends Component {
    componentDidMount() {
        const canvasParent = this.refs.canvas.parentNode;
        const position = window.getComputedStyle(canvasParent, null).position;

        if (position === 'static') {
            canvasParent.style.position = 'relative';
        }

        canvasParent.classList.add('water-wave-target');

        Object.keys(events.event2code)
            .forEach(type => {
                canvasParent.addEventListener(type, this, false);
            });
    }

    componentWillUnmount() {
        const canvasParent = this.refs.canvas.parentNode;

        cancelAnimationFrame(this.timer);
        canvasParent.classList.remove('water-wave-container');

        Object.keys(events.event2code)
            .forEach(type => {
                canvasParent.removeEventListener(type, this, false);
            });
    }

    handleEvent(ev) {
        const code = events.getCode(ev.type);
        const group = events.getGroup(ev.type);

        switch (code) {
            case 0:
                if (!this.eventGroup) {
                    this.eventGroup = group;
                }
            case 2:
                //确保前后一致的事件类型
                if (this.eventGroup === group) {
                    const _ev = events.format(ev);
                    const { pageX, pageY } = _ev;

                    clearTimeout(this.clearTimer);

                    if (code === 0 && !this.startState) {
                        this.startState = {
                            pageX,
                            pageY
                        }
                    }

                    if (code === 2 && this.startState) {
                        if (Math.abs(pageX - this.startState.pageX) < 10 &&
                            Math.abs(pageY - this.startState.pageY) < 10) {
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

    clearEvent() {
        this.clearTimer = setTimeout(() => {
            delete this.eventGroup;
            delete this.startState;
        }, 500);
    }

    createWave = ev => {
        if (!this.refs.canvas.parentNode.disabled) {
            const dpr = window.devicePixelRatio || 1;
            const { top, left, width, height } = this.refs.canvas.parentNode.getBoundingClientRect();
            const { clientX, clientY } = ev;
            const x = clientX - left;
            const y = clientY - top;
            const canvas = this.refs.canvas;
            const ctx = canvas.getContext('2d');
            const { duration } = this.props;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            ctx.scale(dpr, dpr);

            const startTime = Date.now();
            const run = () => {
                const now = Date.now();
                const offset = now - startTime;

                cancelAnimationFrame(this.timer);
                ctx.clearRect(0, 0, width, height);

                if (offset < duration) {
                    this.draw(ctx, x, y, offset / duration * Math.max(width, height), Math.min(.3, 1 - offset / duration));

                    this.timer = requestAnimationFrame(run);
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

    render() {
        return (
            <canvas ref="canvas" className="water-wave-canvas"></canvas>
        );
    }

    static defaultProps = {
        duration: 500,
        color: '#fff'
    }

    static propTypes = {
        duration: PropTypes.number,
        color: PropTypes.string
    }
}

export default Water;
