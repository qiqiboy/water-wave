# water-wave
一个创建点击后产生水波纹效果的React组件

### 安装
    $ npm install --save water-wave

### 使用
`water-wave`是一个react组件，所以是需要在react项目环境中调用（推荐在`create-react-app`或者`tiger-new`生成的项目中使用）。组件中调用了`classlist`，为了兼容更多浏览器环境，推荐项目中也要引入`classlist`的polyfill。

也有一段很小的css需要引入到项目中（主要是去掉ios上的tap阴影、设置渲染水波纹的canvas的位置等）。

`water-wave`对使用位置没有任何限制，可以自由应用于button、链接、div等任意节点中。

示例如下：

```jsx
import React from 'react';
import WaterWave from 'water-wave';
import 'water-wave/style.css';

const MyComponent = () =>
    <button className="btn">
        按钮
        <WaterWave color="#fff" duration={800} />
    </button>;
```

#### 组件属性参数说明
* `color` 颜色值，默认值：#ffffff
* `alpha` 透明度，默认值：0.3
* `duration` 动画持续毫秒数，默认值：500
* `disabled` 是否禁用效果。默认情况下根据父节点是否被disabled决定
* `radius` 波浪半径。默认为最大的宽度或长度。手动指定只支持传入一个确定的数字
* `origin` 波浪圆心位置，以父节点为参考，类似`background-origin`，例如`auto`、 `left center`、 `30% 70%`、 `100 100`。默认值：auto
* `press` 触发时机，可选值 `up`（离开时才触发mouseup touchend）、`down`（按下去立即触发tocuhstart mousedown）。默认值：up
* `effect` 触发效果，可选值 `ripple`（中心点圆形荡漾效果）、`wave`（横向线行波纹）、`starLight`（星光发散效果）、`petal`（花瓣旋转效果）、`helix`（螺旋效果）。默认值：ripple,
* `stopPropagation` 阻止效果冒泡。通过设置该参数为true，可以阻止父级节点触发效果。默认值：无

#### waterwave事件
当组件触发了效果时，会在当前节点派生一个名为 `waterwave` 的自定义事件。这是一个标准的DOM事件，所以可以通过 `addEventListener` 来监听。如果调用了事件的 `preventDefault`，也可以同时阻止当前节点以及所有父节点触发效果。

### 效果
#### effect = "ripple"
![](https://user-images.githubusercontent.com/3774036/29410146-e8f2e4d8-8381-11e7-98ed-661c798a8d65.gif)

gif图中效果代码示例：
```jsx
<button className="btn1">BUTTON <Water /></button>
<button className="btn2">BUTTON <Water /></button>
<button className="btn3">BUTTON <Water color="#ff4081"/></button>
<button className="btn4">BUTTON <Water color="#26a69a" /></button>
<button className="btn5">BUTTON <Water duration={2000} /></button>
<button className="btn6">BUTTON <Water duration={200} /></button>
<button className="btn7">BUTTON <Water color="rgba(0,0,0,.5)" duration={2000} /></button>
<button className="btn8">BUTTON <Water color="rgba(0,0,0,.5)" duration={200} /></button>
```

#### effect = "wave"
![](https://user-images.githubusercontent.com/3774036/29657635-cf385e88-88ea-11e7-9722-8ced31052ac5.gif)

#### effect = "starLight"
![](https://user-images.githubusercontent.com/3774036/29701337-aee4201e-899d-11e7-9390-ee0fa3d5de0c.gif)

#### effect = "petal"
![](https://user-images.githubusercontent.com/3774036/29701343-b94f9862-899d-11e7-825b-d5cc57c802fc.gif)

### 示例

点此[查看示例](http://github.boy.im/water-wave)
