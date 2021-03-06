#### 一.导入方法

```js
import { connect , Dispatch } from 'react-redux'
```

#### 二.定义 react 组件

```js
class HomePage extends React.component {

}
```

#### 三.定义自取 state 和 dispatch 方法，以及 合并后的最终传入的 props

```js
function stateFn(){
  return {
  }
}

function dispatchFn(){
  return {
  }
}

function mergePropsFn(){
  return {
  }
}
```

#### 四.建立连接
```js
const HomePageContainer = connect(
  stateFn,
  dispatchFn,
  mergePropsFn,
)(HomePage)
```

第4步，连接过程的执行流程是：
1. 先执行connect 方法，该方法传入三个参数，每一个参数都是一个方法，每个方法依次执行，最后返回一个 WrapWithConnect 方法，

2. 其中三个方法的作用分别为：
stateFn => 从 state 树中提取，当前需要的值
dispatchFn => 从 actions 中提取出当前组件需要的操作函数
mergePropsFn => 将 stateFn 和 dispatchFn 提取的结果，以及原生传入的 props 合并成一个对象，作为新的传入的 props 对象。 

3. 其中三个参数函数的执行的参数分别为，参数的传递都由 connect 函数内部查找提供并传入。
stateFn => 参数为整个注册的状态树对象，即 state 对象
dispatchFn => 参数为 react-redux 提供的 dispatch 函数对象
mergePropsFn => 共三个参数，分别为 stateFn 返回值，dispatchFn 返回值，默认的 props 传入值

4. 然后再传入 HomePage 作为参数执行 WrapWithConnect。再返回一个 Connect 的函数。
最后的返回值与 HomePage 类似，只是已经修改了传入的 props 属性。

5. 组件调用。
通过 this.props 就可以获取对应的 state 和 action 。
