# 开发介绍
### 技术偏好
**只是个人偏好**，不是劝说你也要那么做

##### 去 jsx

当元素比较简单时，jsx 还不难看，甚至好看

jsx:
``` jsx
import React from 'react'

function Hello({ username }) {
  return <div>
    <span>hello, </span>
    <span>{username}</span>
  </div>
}
```

同样的功能用 js 写:
``` js
import { createElement } from 'react'

function Hello({ username }) {
  return createElement(
    'div', // 第一个参数是标签名
    null, // 第二个参数是属性
    createElement('span', null, 'hello, '), // 第三个和之后的参数都是子元素
    createElement('span', null, username)
  )
}
```

----------------  

元素稍微复杂一点，jsx 就不好看了

jsx:
``` jsx
import React from 'react'

function Hello({ username, className }) {
  return <div className = {className}>hello, {username}</div>
}
```

js:
``` js
import { createElement } from 'react'

function Hello({ username, className }) {
  return createElement('div', { className }, 'hello, ' + username)
}
```

----------------  

如果有函数，，，

jsx:
``` jsx
import React from 'react'

function Hello({ username }) {
  return <div
    className = {className}
    onClick = {() => {
      alert('hello, ' + username)
    }}
  >hello, {username}</div>
}
```

js:
``` js
import { createElement } from 'react'

function Hello({ username, className }) {
  return createElement(
    'div',
    {
      className,
      onClick() {
        alert('hello, ' + username)
      }
    },
    'hello, ' + username
  )
}
```

----------------  

jsx 下限比较高，但上限极低  
而且浏览器不识别这种语法，需要使用打包工具翻译成 js  
而**使用打包工具，就大大增加了学习成本**  
所以，即使 **createElement 也不是很好用**  
这个项目还是用了 createElement 这种写法  

##### 空值
对于一个需要加载的数据：
+ ```undefined```：未加载
+ ```null```：加载中
+ 其他：已加载

##### 三元表达式
基本用法：
``` js
const a = true
const b = a ? 1 : 2
```
当 a 为 true 时，b 的最终值为 1，否则为 2  
但是，当 b 的值比较长时，比如 b 的值有可能是一个元素  

``` js
const a = true
const b = a?
  <div>
    hello, I'm a
  </div>
  : <div>
    hello, I'm not a
  </div>
```

### 规范
##### git 提交信息
[参考这篇文章](https://zhuanlan.zhihu.com/p/67804026)
