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

### 效果
待补充...
