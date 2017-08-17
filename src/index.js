import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { requestAnimationFrame, cancelAnimationFrame } from 'raf-dom';

class Water extends Component {
    componentDidMount() {
        const position = window.getComputedStyle(this.refs.canvas.parentNode, null).position;

        if (position === 'static') {
            this.refs.canvas.parentNode.style.position = 'relative';
        }

        this.refs.canvas.parentNode.addEventListener('click', this.createWave, false);
        this.refs.canvas.parentNode.classList.add('water-wave-target');
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.timer);
        this.refs.canvas.parentNode.removeEventListener('click', this.createWave, false);
        this.refs.canvas.parentNode.classList.remove('water-wave-container');
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

