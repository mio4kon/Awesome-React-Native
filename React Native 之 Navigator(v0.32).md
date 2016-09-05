# React Native 之 Navigator(v0.32)


## 编写场景(Scence)


**MyScene.js**

```javascript

import React, {Component,PropTypes} from 'react';
import {View, Text,TouchableHighlight} from 'react-native';


export default class MyScene extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onForward: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
    }
    render() {
        return (
            <View>
                {/*第一行展示当前页的title*/}
                <Text>当前页面为: { this.props.title }</Text>
                {/*点击内容*/}
                <TouchableHighlight onPress={this.props.onForward}>
                    <Text>点击进入下一个页面</Text>
                </TouchableHighlight>
                {/*点击内容*/}
                <TouchableHighlight onPress={this.props.onBack}>
                    <Text>点击回到上一个页面</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

```
`MyScene` 定义了一个属性和两个属性方法.  
上面要求`title`是String的而且必须要有,同样`onForward`,`onBack`两个方法也必须要有.  

**Tips**:组件的属性可以接受任意值，字符串、对象、函数等等,有时候,我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。组件类的`PropTypes`属性，就是用来验证组件实例的属性是否符合要求.


[官方文档](https://facebook.github.io/react/docs/reusable-components.html)

## 编写导航页面


**NavigatorDemo.js**

```javascript
import React, {Component, PropTypes} from 'react';
import {Navigator, Text, TouchableHighlight, View} from 'react-native';

import MyScene from './MyScene'

export default class NavigatorDemo extends Component {

    render() {
        return (
            <Navigator
                initialRoute={{title: '初始页面', index: 0}}
                renderScene={(route, navigator) => {

                    return (
                        <MyScene
                            title={route.title}
                            onForward={ () => {
                                const nextIndex = route.index + 1;
                                navigator.push({
                                    title: '页面- ' + nextIndex,
                                    index: nextIndex,
                                });
                            }}

                            onBack={() => {
                                if (route.index > 0) {
                                    navigator.pop();
                                }
                            }}
                        />
                    )
                }}
            />
        )
    }
}

```

...是不是被这么一坨吓到了? 我们分析一下就会发现很简单.

`<Navigator>`是`React Native`的一个控件.

`initialRoute`这个属性是初始化导航控件的.`renderScene`是用来根据`route`切换场景的.

**官方说明:**

Use `Navigator` to transition between different scenes in your app. To accomplish
this, provide route objects to the navigator to identify each scene, and also a
`renderScene` function that the navigator can use to render the scene for a given
route.  To change the animation or gesture properties of the scene, provide a
`configureScene` prop to get the config object for a given route. See
`Navigator.SceneConfigs` for default animations and more info on scene config
options. 

这里实现了用了之前写的`MyScene`然后实现三个属性.
其中`onForward`方法实现里面做了几件事:

* index+1
* navigator push了`title`和`index`

## 实现效果

替换入口:

```javascript
import React from 'react';
import {AppRegistry} from 'react-native';
import NavigatorDemo from './NavigatorDemo';

AppRegistry.registerComponent('HelloWorldApp', () => NavigatorDemo);

```

![](art/navigator.gif)



