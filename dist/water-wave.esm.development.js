import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cancelAnimationFrame, requestAnimationFrame } from 'raf-dom';

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var root = typeof window === 'undefined' ? global : window;
var event2code = 'onpointerdown' in root ? {
  pointerdown: 0,
  //pointermove: 1,
  pointerup: 2,
  pointercancel: 3,
  pointerleave: 4,
  blur: 5,
  waterwave: 6
} : {
  touchstart: 0,
  mousedown: 0,
  //touchmove: 1,
  //mousemove: 1,
  touchend: 2,
  mouseup: 2,
  touchcancel: 3,
  mouseleave: 4,
  blur: 5,
  waterwave: 6
};
var getCode = function getCode(type) {
  return event2code[type.toLowerCase()];
};
var getGroup = function getGroup(type) {
  var ret = type.toLowerCase().match(/(touch|pointer|mouse)/i);
  return ret && ret[0];
};
var format = function format(ev) {
  var group = getGroup(ev.type);

  if (group === 'touch') {
    var _ev$changedTouches$it = ev.changedTouches.item(0),
        clientX = _ev$changedTouches$it.clientX,
        clientY = _ev$changedTouches$it.clientY,
        pageX = _ev$changedTouches$it.pageX,
        pageY = _ev$changedTouches$it.pageY;

    return Object.assign(ev, {
      clientX: clientX,
      clientY: clientY
    }, 'pageX' in ev ? {} : {
      pageX: pageX,
      pageY: pageY
    });
  }

  return ev;
};

var Tween = function Tween(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
};

var Ripple = /*#__PURE__*/function () {
  function Ripple() {
    _classCallCheck(this, Ripple);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.rippleData = args;
  }

  _createClass(Ripple, [{
    key: "pressUp",
    value: function pressUp() {
      this.rippleData.splice(-2, 1, false);
    }
  }, {
    key: "render",
    value: function render() {
      var now = Date.now();

      var _this$rippleData = _slicedToArray(this.rippleData, 8),
          ctx = _this$rippleData[0],
          x = _this$rippleData[1],
          y = _this$rippleData[2],
          //起始坐标
      width = _this$rippleData[3],
          height = _this$rippleData[4],
          //画布尺寸
      startTime = _this$rippleData[5],
          //开始时间
      keeping = _this$rippleData[6],
          //是否保持按住,
      props = _this$rippleData[7];

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

var WATER_DURATION_CLASS = 'water-wave-canvas-duration';
var root$1 = typeof window === 'undefined' ? global : window;

var Water = /*#__PURE__*/function (_Component) {
  _inherits(Water, _Component);

  var _super = _createSuper(Water);

  function Water() {
    var _this;

    _classCallCheck(this, Water);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.ripples = [];

    _this.createWave = function (ev) {
      var canvas = _this.refs.canvas;
      var canvasParent = canvas.parentNode;
      var disabled = typeof _this.props.disabled === 'boolean' ? _this.props.disabled : canvasParent.disabled;

      if (!disabled) {
        var dpr = root$1.devicePixelRatio || 1;

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

        _this.ripples.push(new Ripple(ctx, isNaN(x) ? pointX : x, isNaN(y) ? pointY : y, width, height, startTime, true, _this.props));

        var run = function run() {
          cancelAnimationFrame(_this.timer);
          ctx.clearRect(0, 0, width, height);
          _this.ripples = _this.ripples.filter(function (ripple) {
            return ripple.render();
          });

          if (_this.ripples.length) {
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
    };

    return _this;
  }

  _createClass(Water, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var canvasParent = this.refs.canvas.parentNode;

      var _root$getComputedStyl = root$1.getComputedStyle(canvasParent, null),
          position = _root$getComputedStyl.position;

      if (position === 'static') {
        canvasParent.style.position = 'relative';
      }

      canvasParent.style.webkitTapHighlightColor = 'rgba(0,0,0,0)';
      Object.keys(event2code).forEach(function (type) {
        canvasParent.addEventListener(type, _this2, false);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      var canvasParent = this.refs.canvas.parentNode;
      cancelAnimationFrame(this.timer);
      clearTimeout(this.clearTimer);
      canvasParent.style.webkitTapHighlightColor = null;
      Object.keys(event2code).forEach(function (type) {
        canvasParent.removeEventListener(type, _this3, false);
      });
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(ev) {
      var _this4 = this;

      var code = getCode(ev.type);
      var group = getGroup(ev.type);
      var press = this.props.press;

      switch (code) {
        case 0:
          if (!this.eventGroup) {
            this.eventGroup = group;
          }

        case 2: // eslint-disable-line

        case 3:
        case 4:
        case 5:
          //确保前后一致的事件类型
          if (this.eventGroup === group || code > 3) {
            var _ev = format(ev);

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
    key: "clearEvent",
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
    key: "dispatchEvent",
    value: function dispatchEvent() {
      var stopPropagation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var ev;

      if (typeof root$1.CustomEvent === 'function') {
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
    key: "getOrigin",
    value: function getOrigin(width, height) {
      var ret = this.props.origin.split(/\s+/);
      var left = this.getPoint(ret[0], width);
      var top = this.getPoint(ret[1], height);
      return [left, top];
    }
  }, {
    key: "getPoint",
    value: function getPoint() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';
      var size = arguments.length > 1 ? arguments[1] : undefined;
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
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("canvas", {
        ref: "canvas",
        className: "water-wave-canvas"
      });
    }
  }]);

  return Water;
}(Component);

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
  duration: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  origin: PropTypes.string.isRequired,
  radius: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
  alpha: PropTypes.number.isRequired,
  press: PropTypes.oneOf(['up', 'down']).isRequired,
  effect: PropTypes.oneOf(['ripple', 'wave', 'starLight', 'petal', 'helix']).isRequired,
  stopPropagation: PropTypes.bool
};

export default Water;
