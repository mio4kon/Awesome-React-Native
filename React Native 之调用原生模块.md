# React Native 之调用原生模块


实现Js调用原生所写的方法

效果:在`index.android.js`中调用`ToastAndroidDiy.showToast`显示`Toast`

## 编写原生接口
### 定义Module

在Android项目中写一个`Module`类,具体如下:

1. 类继承`ReactContextBaseJavaModule`
2. 需要实现`getName`方法,返回的名称用于在Js中使用
3. 如果Js中需要使用原生常量,可以通过`getContants`方法,接受一个`Map`
4. Js要调用的方法用注解`@ReactMethod`标记,返回必须为`Void`类型,如果Js想要返回值需要通过回调

**case:**

```java
public class ToastDiyModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORTT";
    private static final String DURATION_LONG_KEY = "LONG";
    private static final String MODULE_NAME = "ToastAndroidDiy";

    public ToastDiyModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void showToast(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

}
```

### 注册Module

在Android项目中写一个`ReactPackage`类,具体如下:

1. 类实现`ReactPackage`
2. 实现三个方法`createNativeModules`,`createJSModules`,`createViewManagers`
3. 在`createNativeModules`方法中添加需要注册的`Module`
4. `createJSModules`与`createViewManagers`没用到则返回`Collections.emptyList();`


**case:**

```java
public class AnExampleReactPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new ToastDiyModule(reactContext));
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
```

### 提供Package

在`Application`中有`getPackages`方法,添加刚才创建的`Package`

**case:**

```java
public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    //add Package
                    new AnExampleReactPackage()

            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
```

至此,原生接口编写完成.


## JS调用原生接口

创建一个javascript文件:`ToastAndroidDiy.js`:

```javascript
'use strict';
import {NativeModules} from 'react-native';
module.exports = NativeModules.ToastAndroidDiy;
```
上面的`ToastAndroidDiy`一定要对应原生Module中的`getName`

在`index.android.js`中调用原生接口:

```javascript
var ToastAndroidDiy = require('./ToastAndroidDiy');

 ToastAndroidDiy.showToast('hello world', ToastAndroidDiy.SHORT);
```

上面的调用的原生常量对应`Module`中的`getContants`方法中Map的Key


---



参考:[https://facebook.github.io/react-native/docs/native-modules-android.html](https://facebook.github.io/react-native/docs/native-modules-android.html)

